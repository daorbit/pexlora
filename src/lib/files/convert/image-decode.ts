import { detectFormat } from "@/lib/files/detect";
import { UnreadableFileError } from "@/lib/files/processors/types";

export type RasterType = "image/jpeg" | "image/png";

const JPEG_QUALITY = 0.92;

async function decodeHeic(file: Blob) {
  const { heicTo } = await import("heic-to/next");
  return heicTo({ blob: file, type: "bitmap" });
}

export async function decodeImage(file: File): Promise<ImageBitmap> {
  try {
    if (detectFormat(file)?.id === "heic") return await decodeHeic(file);
    return await createImageBitmap(file);
  } catch {
    throw new UnreadableFileError("This image couldn't be read in your browser.");
  }
}

export async function bitmapToBlob(bitmap: ImageBitmap, type: RasterType) {
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d");
  if (!context) throw new UnreadableFileError("Your browser couldn't prepare this image.");
  if (type === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.drawImage(bitmap, 0, 0);
  return canvasToBlob(canvas, type);
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: RasterType) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new UnreadableFileError("Your browser couldn't export this image."))),
      type,
      type === "image/jpeg" ? JPEG_QUALITY : undefined,
    );
  });
}

export async function convertImage(file: File, type: RasterType) {
  const bitmap = await decodeImage(file);
  try {
    return await bitmapToBlob(bitmap, type);
  } finally {
    bitmap.close();
  }
}
