import { DEFAULT_QUALITY } from "@/lib/image/formats";
import type { ShapeOptions } from "@/lib/image/options";
import { shapeFrame, shapePath } from "@/lib/image/shape-path";
import { encodeCanvas, LOSSLESS_QUALITY, OPAQUE_BACKGROUND } from "@/lib/files/raster/encoders";
import { createSurface } from "@/lib/files/raster/surface";
import type { BrowserFormat, RasterResult } from "@/lib/files/raster/types";

export function shapeFormat({ background }: ShapeOptions): BrowserFormat {
  return background === "white" ? "jpeg" : "png";
}

export async function shapeInBrowser(bitmap: ImageBitmap, options: ShapeOptions): Promise<RasterResult> {
  const format = shapeFormat(options);
  const frame = shapeFrame(options.shape, bitmap);
  const { canvas, context } = createSurface(frame.width, frame.height);

  const background = OPAQUE_BACKGROUND[format];
  if (background) {
    context.fillStyle = background;
    context.fillRect(0, 0, frame.width, frame.height);
  }
  context.clip(new Path2D(shapePath(options, frame)));
  context.drawImage(bitmap, frame.x, frame.y, frame.width, frame.height, 0, 0, frame.width, frame.height);

  const buffer = await encodeCanvas(canvas, format, format === "png" ? LOSSLESS_QUALITY : DEFAULT_QUALITY);
  return { buffer, format, width: frame.width, height: frame.height, targetMet: null };
}
