import { BROWSER_COMPRESS_TIME_BUDGET_MS } from "@/config/limits";
import { COMPRESSION_QUALITY, type CompressOptions } from "@/lib/image/options";
import { searchTarget } from "@/lib/image/target-search";
import { encodeCanvas, OPAQUE_BACKGROUND } from "@/lib/files/raster/encoders";
import { drawScaled } from "@/lib/files/raster/surface";
import type { BrowserFormat, RasterResult } from "@/lib/files/raster/types";

type Attempt = { buffer: ArrayBuffer; size: number; format: BrowserFormat; width: number; height: number };

function surfaceFor(bitmap: ImageBitmap) {
  const cache = new Map<string, OffscreenCanvas>();
  return (format: BrowserFormat, scale: number) => {
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const background = OPAQUE_BACKGROUND[format];
    const key = `${width}x${height}:${background ?? "alpha"}`;
    const cached = cache.get(key);
    if (cached) return cached;
    const canvas = drawScaled(bitmap, width, height, background);
    cache.set(key, canvas);
    return canvas;
  };
}

function toResult({ buffer, format, width, height }: Attempt, targetMet: boolean | null): RasterResult {
  return { buffer, format, width, height, targetMet };
}

export async function compressInBrowser(bitmap: ImageBitmap, format: BrowserFormat, options: CompressOptions) {
  const surface = surfaceFor(bitmap);

  const encoder = (outputFormat: BrowserFormat, scale: number) => {
    const canvas = surface(outputFormat, scale);
    return async (quality: number): Promise<Attempt> => {
      const buffer = await encodeCanvas(canvas, outputFormat, quality);
      return { buffer, size: buffer.byteLength, format: outputFormat, width: canvas.width, height: canvas.height };
    };
  };

  if (options.mode === "level") {
    return toResult(await encoder(format, 1)(COMPRESSION_QUALITY[options.level]), null);
  }

  const formats: BrowserFormat[] = options.allowFormatChange && format === "png" ? ["png", "jpeg"] : [format];
  const { attempt, met } = await searchTarget({
    targetBytes: (options.targetKb ?? 0) * 1024,
    formats,
    hasQualityRange: () => true,
    encoder,
    timeBudgetMs: BROWSER_COMPRESS_TIME_BUDGET_MS,
  });
  return toResult(attempt, met);
}
