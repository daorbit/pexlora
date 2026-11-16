import "server-only";
import { encode, sourceInfo } from "@/lib/image/encode";
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

type Attempt = { data: Buffer; format: OutputFormat; width: number; height: number };
type EncodeAt = (quality: number) => Promise<Attempt>;

export type TargetResult = {
  buffer: Buffer;
  format: OutputFormat;
  width: number;
  height: number;
  targetMet: boolean;
};

const hasQualityRange = (format: OutputFormat) => format !== "png";

function encoderFor(buffer: Buffer, format: OutputFormat, width: number, scale = 1): EncodeAt {
  const resizedWidth = Math.max(1, Math.round(width * scale));
  return async (quality) => {
    const { data, info } = await encode(buffer, {
      format,
      quality,
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

export async function compressToTarget(buffer: Buffer, targetBytes: number, allowFormatChange: boolean) {
  const deadline = Date.now() + TIME_BUDGET_MS;
  const timeLeft = () => Date.now() < deadline;
  const fits = (attempt: Attempt) => attempt.data.length <= targetBytes;

  async function highestFittingQuality(encodeAt: EncodeAt, floor: Attempt, passes: number) {
    let best = floor;
    let low = QUALITY.min + 1;
    let high = QUALITY.max - 1;

    for (let pass = 0; pass < passes && low <= high && timeLeft(); pass += 1) {
      const quality = Math.round((low + high) / 2);
      const attempt = await encodeAt(quality);
      if (fits(attempt)) {
        best = attempt;
        low = quality + 1;
      } else {
        high = quality - 1;
      }
    }

    return best;
  }

  const source = await sourceInfo(buffer);
  const formats: OutputFormat[] = allowFormatChange && source.format === "png" ? ["png", "jpeg"] : [source.format];
  let smallest: Attempt | null = null;

  for (const format of formats) {
    const encodeAt = encoderFor(buffer, format, source.width);
    const top = await encodeAt(QUALITY.max);
    if (fits(top)) return toResult(top, true);
    smallest = smaller(smallest, top);
    if (!hasQualityRange(format)) continue;

    const floor = await encodeAt(QUALITY.min);
    if (fits(floor)) return toResult(await highestFittingQuality(encodeAt, floor, QUALITY_PASSES), true);
    smallest = smaller(smallest, floor);
  }

  const format = formats[formats.length - 1];
  const quality = hasQualityRange(format) ? QUALITY.min : QUALITY.max;
  let scale = 1;
  let lastSize = smallest!.data.length;

  for (let pass = 0; pass < SCALE_PASSES && scale > MIN_SCALE && timeLeft(); pass += 1) {
    const estimate = scale * Math.sqrt(targetBytes / lastSize) * SCALE_MARGIN;
    scale = Math.max(MIN_SCALE, Math.min(estimate, scale * MAX_SCALE_STEP));

    const encodeAt = encoderFor(buffer, format, source.width, scale);
    const floor = await encodeAt(quality);
    if (fits(floor)) {
      const best = hasQualityRange(format)
        ? await highestFittingQuality(encodeAt, floor, RESCALED_QUALITY_PASSES)
        : floor;
      return toResult(best, true);
    }

    smallest = smaller(smallest, floor);
    lastSize = floor.data.length;
  }

  return toResult(smallest!, false);
}
