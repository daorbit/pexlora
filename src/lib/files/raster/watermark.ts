import { DEFAULT_QUALITY } from "@/lib/image/formats";
import { imageWatermarkLayout, watermarkFont } from "@/lib/image/image-watermark";
import type { ImageWatermarkOptions } from "@/lib/image/options";
import { encodeCanvas, LOSSLESS_QUALITY, OPAQUE_BACKGROUND } from "@/lib/files/raster/encoders";
import { createSurface } from "@/lib/files/raster/surface";
import type { BrowserFormat, RasterResult } from "@/lib/files/raster/types";

export async function watermarkInBrowser(
  bitmap: ImageBitmap,
  format: BrowserFormat,
  options: ImageWatermarkOptions,
): Promise<RasterResult> {
  const { width, height } = bitmap;
  const { canvas, context } = createSurface(width, height);
  const background = OPAQUE_BACKGROUND[format];
  if (background) {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
  }
  context.drawImage(bitmap, 0, 0);

  const text = options.text.trim();
  const layout = imageWatermarkLayout(width, height, options);
  context.font = watermarkFont(layout.fontSize);
  context.textBaseline = "middle";
  context.globalAlpha = layout.alpha;
  context.fillStyle = layout.fill;
  context.strokeStyle = layout.stroke;
  context.lineWidth = layout.strokeWidth;
  context.lineJoin = "round";

  for (const mark of layout.marks) {
    context.save();
    context.translate(mark.x, mark.y);
    context.rotate((mark.angle * Math.PI) / 180);
    context.textAlign = mark.anchor === "end" ? "right" : "center";
    context.strokeText(text, 0, 0);
    context.fillText(text, 0, 0);
    context.restore();
  }

  const buffer = await encodeCanvas(canvas, format, format === "png" ? LOSSLESS_QUALITY : DEFAULT_QUALITY);
  return { buffer, format, width, height, targetMet: null };
}
