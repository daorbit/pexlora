import "server-only";
import { decode, encode, sourceInfo, type DecodedImage } from "@/lib/image/encode";
import type { OutputFormat } from "@/lib/image/formats";
import { searchTarget } from "@/lib/image/target-search";

const PALETTE_EFFORT = 3;
const TIME_BUDGET_MS = 20_000;

type Attempt = { data: Buffer; size: number; format: OutputFormat; width: number; height: number };

export type TargetResult = {
  buffer: Buffer;
  format: OutputFormat;
  width: number;
  height: number;
  targetMet: boolean;
};

const hasQualityRange = (format: OutputFormat) => format !== "png";

function encoderFor(source: DecodedImage) {
  return (format: OutputFormat, scale: number) => {
    const resizedWidth = Math.max(1, Math.round(source.info.width * scale));
    return async (quality: number): Promise<Attempt> => {
      const { data, info } = await encode(source, {
        format,
        quality,
        speed: "smallest",
        palette: true,
        paletteEffort: PALETTE_EFFORT,
        transform: scale < 1 ? (pipeline) => pipeline.resize({ width: resizedWidth }) : undefined,
      });
      return { data, size: data.length, format, width: info.width, height: info.height };
    };
  };
}

export async function compressToTarget(buffer: Buffer, targetBytes: number, allowFormatChange: boolean): Promise<TargetResult> {
  const [{ format: sourceFormat }, decoded] = await Promise.all([sourceInfo(buffer), decode(buffer)]);
  const formats: OutputFormat[] = allowFormatChange && sourceFormat === "png" ? ["png", "jpeg"] : [sourceFormat];

  const { attempt, met } = await searchTarget({
    targetBytes,
    formats,
    hasQualityRange,
    encoder: encoderFor(decoded),
    timeBudgetMs: TIME_BUDGET_MS,
  });

  return { buffer: attempt.data, format: attempt.format, width: attempt.width, height: attempt.height, targetMet: met };
}
