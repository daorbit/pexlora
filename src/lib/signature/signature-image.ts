import { SIGNATURE_IMAGE } from "@/config/limits";
import { decodeImage } from "@/lib/files/convert/image-decode";
import { UnreadableFileError } from "@/lib/files/processors/types";
import type { SignInk } from "@/lib/image/options";

const TYPED_FONT = "'Segoe Script', 'Brush Script MT', 'Snell Roundhand', 'Apple Chancery', cursive";

function context2d(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new UnreadableFileError("Your browser couldn't prepare the signature.");
  return context;
}

function blankCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return { canvas, context: context2d(canvas) };
}

export function trimSignature(source: HTMLCanvasElement) {
  const { width, height } = source;
  const pixels = context2d(source).getImageData(0, 0, width, height).data;
  let top = height;
  let left = width;
  let right = -1;
  let bottom = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (pixels[(y * width + x) * 4 + 3] === 0) continue;
      if (x < left) left = x;
      if (x > right) right = x;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
    }
  }
  if (right < 0) return null;
  const pad = SIGNATURE_IMAGE.trimPadding;
  const box = {
    x: Math.max(0, left - pad),
    y: Math.max(0, top - pad),
    width: Math.min(width, right + pad + 1) - Math.max(0, left - pad),
    height: Math.min(height, bottom + pad + 1) - Math.max(0, top - pad),
  };
  const { canvas, context } = blankCanvas(box.width, box.height);
  context.drawImage(source, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height);
  return canvas.toDataURL("image/png");
}

export function typedSignature(text: string, ink: SignInk) {
  const value = text.trim();
  if (!value) return null;
  const size = SIGNATURE_IMAGE.typedSize;
  const font = `${size}px ${TYPED_FONT}`;
  const measure = blankCanvas(1, 1).context;
  measure.font = font;
  const { canvas, context } = blankCanvas(Math.ceil(measure.measureText(value).width + size), Math.ceil(size * 1.8));
  context.font = font;
  context.fillStyle = SIGNATURE_IMAGE.inks[ink];
  context.textBaseline = "middle";
  context.fillText(value, size / 2, canvas.height / 2);
  return trimSignature(canvas);
}

export async function uploadedSignature(file: File) {
  const bitmap = await decodeImage(file);
  try {
    const { canvas, context } = blankCanvas(bitmap.width, bitmap.height);
    context.drawImage(bitmap, 0, 0);
    const image = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = image.data;
    for (let index = 0; index < data.length; index += 4) {
      const lightest = Math.min(data[index], data[index + 1], data[index + 2]);
      if (lightest > SIGNATURE_IMAGE.whiteCutoff) data[index + 3] = 0;
    }
    context.putImageData(image, 0, 0);
    return trimSignature(canvas);
  } finally {
    bitmap.close();
  }
}
