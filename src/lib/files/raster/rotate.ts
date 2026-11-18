import { DEFAULT_QUALITY } from "@/lib/image/formats";
import type { RotateImageOptions } from "@/lib/image/options";
import { encodeCanvas, LOSSLESS_QUALITY, OPAQUE_BACKGROUND } from "@/lib/files/raster/encoders";
import { createSurface } from "@/lib/files/raster/surface";
import type { BrowserFormat, RasterResult } from "@/lib/files/raster/types";

export async function rotateInBrowser(bitmap: ImageBitmap, format: BrowserFormat, { angle, flip }: RotateImageOptions): Promise<RasterResult> {
  const degrees = Number(angle);
  const sideways = degrees === 90 || degrees === 270;
  const width = sideways ? bitmap.height : bitmap.width;
  const height = sideways ? bitmap.width : bitmap.height;

  const { canvas, context } = createSurface(width, height);
  const background = OPAQUE_BACKGROUND[format];
  if (background) {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
  }
  context.translate(width / 2, height / 2);
  context.rotate((degrees * Math.PI) / 180);
  context.scale(flip === "horizontal" ? -1 : 1, flip === "vertical" ? -1 : 1);
  context.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);

  const buffer = await encodeCanvas(canvas, format, format === "png" ? LOSSLESS_QUALITY : DEFAULT_QUALITY);
  return { buffer, format, width, height, targetMet: null };
}
