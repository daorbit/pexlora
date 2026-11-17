import { UnreadableFileError } from "@/lib/files/processors/types";

export type PixelSize = { width: number; height: number };

export function createCanvas({ width, height }: PixelSize, background = "#ffffff") {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new UnreadableFileError("Your browser couldn't prepare this image.");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);
  context.imageSmoothingQuality = "high";
  return { canvas, context };
}

export function drawCovered(bitmap: ImageBitmap, size: PixelSize) {
  const { canvas, context } = createCanvas(size);
  const scale = Math.max(size.width / bitmap.width, size.height / bitmap.height);
  const drawWidth = bitmap.width * scale;
  const drawHeight = bitmap.height * scale;
  context.drawImage(bitmap, (size.width - drawWidth) / 2, (size.height - drawHeight) / 2, drawWidth, drawHeight);
  return canvas;
}
