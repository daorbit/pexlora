import { BROWSER_MAX_PIXELS, MAX_RESIZE_DIMENSION } from "@/config/limits";
import { DEFAULT_QUALITY } from "@/lib/image/formats";
import type { SvgRasterOptions, SvgSize as SvgSizeOption } from "@/lib/image/options";
import { UnreadableFileError } from "@/lib/files/processors/types";
import { encodeCanvas, LOSSLESS_QUALITY, OPAQUE_BACKGROUND } from "@/lib/files/raster/encoders";
import { intrinsicSize, parseSvg, sizedSvg, type SvgSize } from "@/lib/files/vector/svg-document";

const SCALE_FACTORS: Partial<Record<SvgSizeOption, number>> = { "1x": 1, "2x": 2, "4x": 4 };

function targetSize(natural: SvgSize, size: SvgSizeOption): SvgSize {
  const factor = SCALE_FACTORS[size];
  const scale = factor ?? Number(size) / Math.max(natural.width, natural.height);
  const limit = Math.min(scale, MAX_RESIZE_DIMENSION / natural.width, MAX_RESIZE_DIMENSION / natural.height);
  const pixelLimit = Math.sqrt(BROWSER_MAX_PIXELS / (natural.width * natural.height));
  const finalScale = Math.min(limit, pixelLimit);
  return {
    width: Math.max(1, Math.round(natural.width * finalScale)),
    height: Math.max(1, Math.round(natural.height * finalScale)),
  };
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new UnreadableFileError("This SVG couldn't be drawn. It may use features browsers don't support."));
    image.src = url;
  });
}

export async function rasterizeSvg(file: File, { format, size }: SvgRasterOptions) {
  const root = parseSvg(await file.text());
  const natural = intrinsicSize(root);
  const target = targetSize(natural, size);
  const url = URL.createObjectURL(new Blob([sizedSvg(root, natural, target)], { type: "image/svg+xml" }));

  try {
    const image = await loadImage(url);
    const canvas = new OffscreenCanvas(target.width, target.height);
    const context = canvas.getContext("2d");
    if (!context) throw new UnreadableFileError("Your browser couldn't prepare this image.");
    const background = OPAQUE_BACKGROUND[format];
    if (background) {
      context.fillStyle = background;
      context.fillRect(0, 0, target.width, target.height);
    }
    context.drawImage(image, 0, 0, target.width, target.height);
    const buffer = await encodeCanvas(canvas, format, format === "png" ? LOSSLESS_QUALITY : DEFAULT_QUALITY);
    return { buffer, ...target };
  } finally {
    URL.revokeObjectURL(url);
  }
}
