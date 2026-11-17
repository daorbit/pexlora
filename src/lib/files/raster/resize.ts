import { MAX_RESIZE_DIMENSION } from "@/config/limits";
import { DEFAULT_QUALITY } from "@/lib/image/formats";
import type { ResizeOptions } from "@/lib/image/options";
import { encodeCanvas, LOSSLESS_QUALITY, OPAQUE_BACKGROUND } from "@/lib/files/raster/encoders";
import { drawScaled } from "@/lib/files/raster/surface";
import type { BrowserFormat, RasterResult } from "@/lib/files/raster/types";

type Size = { width: number; height: number };

const atLeastOne = (value: number) => Math.max(1, Math.round(value));

export function resizedSize(options: ResizeOptions, source: Size): Size {
  if (options.mode === "percent") {
    const scale = Math.min(options.percent / 100, MAX_RESIZE_DIMENSION / source.width, MAX_RESIZE_DIMENSION / source.height);
    return { width: atLeastOne(source.width * scale), height: atLeastOne(source.height * scale) };
  }

  if (!options.keepAspect) {
    return { width: options.width ?? source.width, height: options.height ?? source.height };
  }

  const scales = [
    options.width ? options.width / source.width : Number.POSITIVE_INFINITY,
    options.height ? options.height / source.height : Number.POSITIVE_INFINITY,
  ];
  const scale = Math.min(...scales);
  return { width: atLeastOne(source.width * scale), height: atLeastOne(source.height * scale) };
}

export async function resizeInBrowser(bitmap: ImageBitmap, format: BrowserFormat, options: ResizeOptions): Promise<RasterResult> {
  const { width, height } = resizedSize(options, bitmap);
  const canvas = drawScaled(bitmap, width, height, OPAQUE_BACKGROUND[format]);
  const quality = format === "png" ? LOSSLESS_QUALITY : DEFAULT_QUALITY;
  const buffer = await encodeCanvas(canvas, format, quality);
  return { buffer, format, width, height, targetMet: null };
}
