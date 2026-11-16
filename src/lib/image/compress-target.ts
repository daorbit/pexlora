import "server-only";
import { decode, encode, sourceInfo, type DecodedImage } from "@/lib/image/encode";
import type { OutputFormat } from "@/lib/image/formats";

const QUALITY = { min: 20, max: 95 } as const;
const QUALITY_PASSES = 6;
const RESCALED_QUALITY_PASSES = 3;
const SCALE_PASSES = 5;
const MIN_SCALE = 0.25;
const MAX_SCALE_STEP = 0.9;
const SCALE_MARGIN = 0.95;
const PALETTE_EFFORT = 3;
const TIME_BUDGET_MS = 20_000;

const QUALITY_TOLERANCE = 2;

type Attempt = { data: Buffer; format: OutputFormat; width: number; height: number };
type Probe = { quality: number; size: number | null };
type EncodeAt = (quality: number) => Promise<Attempt>;

export type TargetResult = {
  buffer: Buffer;
  format: OutputFormat;
  width: number;
  height: number;
  targetMet: boolean;
};

const hasQualityRange = (format: OutputFormat) => format !== "png";

function encoderFor(source: DecodedImage, format: OutputFormat, scale = 1): EncodeAt {
  const resizedWidth = Math.max(1, Math.round(source.info.width * scale));
  return async (quality) => {
    const { data, info } = await encode(source, {
      format,
      quality,
      speed: "smallest",
      palette: true,
      paletteEffort: PALETTE_EFFORT,
      transform: scale < 1 ? (pipeline) => pipeline.resize({ width: resizedWidth }) : undefined,
    });
    return { data, format, width: info.width, height: info.height };
  };
}

function toResult(attempt: Attempt, targetMet: boolean): TargetResult {
  const { data, ...rest } = attempt;
  return { buffer: data, ...rest, targetMet };
}

const smaller = (a: Attempt | null, b: Attempt) => (a && a.data.length <= b.data.length ? a : b);

function nextQuality(low: Probe, high: Probe, targetBytes: number, bisect: boolean) {
  const midpoint = Math.round((low.quality + high.quality) / 2);
  if (bisect || high.size === null || low.size === null || high.size <= low.size) return midpoint;

  const ratio = Math.log(targetBytes / low.size) / Math.log(high.size / low.size);
  const guess = Math.round(low.quality + ratio * (high.quality - low.quality));
  return Math.min(high.quality - 1, Math.max(low.quality + 1, guess));
}

export async function compressToTarget(buffer: Buffer, targetBytes: number, allowFormatChange: boolean) {
  const deadline = Date.now() + TIME_BUDGET_MS;
  const timeLeft = () => Date.now() < deadline;
  const fits = (attempt: Attempt) => attempt.data.length <= targetBytes;

  async function highestFittingQuality(encodeAt: EncodeAt, floor: Attempt, ceiling: Probe, passes: number) {
    let best = floor;
    let low: Probe = { quality: QUALITY.min, size: floor.data.length };
    let high = ceiling;
    let bisect = false;
    let lastFit: boolean | null = null;

    for (let pass = 0; pass < passes && high.quality - low.quality > QUALITY_TOLERANCE && timeLeft(); pass += 1) {
      const quality = nextQuality(low, high, targetBytes, bisect);
      const attempt = await encodeAt(quality);
      const fit = fits(attempt);
      if (fit) {
        best = attempt;
        low = { quality, size: attempt.data.length };
      } else {
        high = { quality, size: attempt.data.length };
      }
      bisect = fit === lastFit;
      lastFit = fit;
    }

    return best;
  }

  const [{ format: sourceFormat }, decoded] = await Promise.all([sourceInfo(buffer), decode(buffer)]);
  const formats: OutputFormat[] = allowFormatChange && sourceFormat === "png" ? ["png", "jpeg"] : [sourceFormat];
  let smallest: Attempt | null = null;

  for (const format of formats) {
    const encodeAt = encoderFor(decoded, format);
    const top = await encodeAt(QUALITY.max);
    if (fits(top)) return toResult(top, true);
    smallest = smaller(smallest, top);
    if (!hasQualityRange(format)) continue;

    const floor = await encodeAt(QUALITY.min);
    if (fits(floor)) {
      const ceiling = { quality: QUALITY.max, size: top.data.length };
      return toResult(await highestFittingQuality(encodeAt, floor, ceiling, QUALITY_PASSES), true);
    }
    smallest = smaller(smallest, floor);
  }

  const format = formats[formats.length - 1];
  const quality = hasQualityRange(format) ? QUALITY.min : QUALITY.max;
  let scale = 1;
  let lastSize = smallest!.data.length;

  for (let pass = 0; pass < SCALE_PASSES && scale > MIN_SCALE && timeLeft(); pass += 1) {
    const estimate = scale * Math.sqrt(targetBytes / lastSize) * SCALE_MARGIN;
    scale = Math.max(MIN_SCALE, Math.min(estimate, scale * MAX_SCALE_STEP));

    const encodeAt = encoderFor(decoded, format, scale);
    const floor = await encodeAt(quality);
    if (fits(floor)) {
      const best = hasQualityRange(format)
        ? await highestFittingQuality(encodeAt, floor, { quality: QUALITY.max, size: null }, RESCALED_QUALITY_PASSES)
        : floor;
      return toResult(best, true);
    }

    smallest = smaller(smallest, floor);
    lastSize = floor.data.length;
  }

  return toResult(smallest!, false);
}
