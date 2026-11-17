import { DEFAULT_QUALITY } from "@/lib/image/formats";
import type { CropAnchor, CropOptions, CropRatio } from "@/lib/image/options";
import { encodeCanvas, LOSSLESS_QUALITY, OPAQUE_BACKGROUND } from "@/lib/files/raster/encoders";
import { createSurface } from "@/lib/files/raster/surface";
import type { BrowserFormat, RasterResult } from "@/lib/files/raster/types";

type Size = { width: number; height: number };

export type CropRect = Size & { x: number; y: number };

const ANCHOR_FACTOR: Record<CropAnchor, number> = { start: 0, center: 0.5, end: 1 };

export function ratioValue(ratio: CropRatio) {
  const [width, height] = ratio.split("x").map(Number);
  return width / height;
}

export function cropRect({ ratio, anchor }: CropOptions, source: Size): CropRect {
  const target = ratioValue(ratio);
  const wider = source.width / source.height > target;
  const width = wider ? Math.max(1, Math.round(source.height * target)) : source.width;
  const height = wider ? source.height : Math.max(1, Math.round(source.width / target));
  const factor = ANCHOR_FACTOR[anchor];
  return {
    x: Math.round((source.width - width) * factor),
    y: Math.round((source.height - height) * factor),
    width,
    height,
  };
}

export async function cropInBrowser(bitmap: ImageBitmap, format: BrowserFormat, options: CropOptions): Promise<RasterResult> {
  const rect = cropRect(options, bitmap);
  const { canvas, context } = createSurface(rect.width, rect.height);
  const background = OPAQUE_BACKGROUND[format];
  if (background) {
    context.fillStyle = background;
    context.fillRect(0, 0, rect.width, rect.height);
  }
  context.drawImage(bitmap, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
  const quality = format === "png" ? LOSSLESS_QUALITY : DEFAULT_QUALITY;
  const buffer = await encodeCanvas(canvas, format, quality);
  return { buffer, format, width: rect.width, height: rect.height, targetMet: null };
}
