import { drawCovered } from "@/lib/files/convert/canvas-cover";
import { canvasToBlob, decodeImage } from "@/lib/files/convert/image-decode";
import type { FormPhotoOptions } from "@/lib/image/options";

const FREE_MAX_SIDE = 1600;
const BEST_QUALITY = 0.95;
const LOWEST_QUALITY = 0.05;
const SEARCH_STEPS = 9;
const SHRINK_STEP = 0.85;
const MIN_FREE_SIDE = 160;

export type FormPhotoResult = { blob: Blob; width: number; height: number; met: boolean };

type Size = { width: number; height: number };

function targetSize(source: Size, { width, height }: FormPhotoOptions): Size {
  if (width && height) return { width, height };
  if (width) return { width, height: Math.round((source.height * width) / source.width) };
  if (height) return { width: Math.round((source.width * height) / source.height), height };
  const scale = Math.min(1, FREE_MAX_SIDE / Math.max(source.width, source.height));
  return { width: Math.round(source.width * scale), height: Math.round(source.height * scale) };
}

const encode = (canvas: HTMLCanvasElement, quality: number) => canvasToBlob(canvas, "image/jpeg", quality);

async function largestUnder(canvas: HTMLCanvasElement, maxBytes: number) {
  const best = await encode(canvas, BEST_QUALITY);
  if (best.size <= maxBytes) return best;
  let low = LOWEST_QUALITY;
  let high = BEST_QUALITY;
  let fit: Blob | null = null;
  for (let step = 0; step < SEARCH_STEPS; step += 1) {
    const quality = (low + high) / 2;
    const blob = await encode(canvas, quality);
    if (blob.size <= maxBytes) {
      fit = blob;
      low = quality;
    } else {
      high = quality;
    }
  }
  return fit ?? (await encode(canvas, LOWEST_QUALITY));
}

export async function makeFormPhoto(file: File, options: FormPhotoOptions): Promise<FormPhotoResult> {
  const bitmap = await decodeImage(file);
  try {
    const fixedSize = Boolean(options.width || options.height);
    const maxBytes = (options.maxKb ?? Number.POSITIVE_INFINITY) * 1024;
    let size = targetSize(bitmap, options);
    let canvas = drawCovered(bitmap, size);
    let blob = await largestUnder(canvas, maxBytes);

    while (!fixedSize && blob.size > maxBytes && Math.max(size.width, size.height) > MIN_FREE_SIDE) {
      size = { width: Math.round(size.width * SHRINK_STEP), height: Math.round(size.height * SHRINK_STEP) };
      canvas = drawCovered(bitmap, size);
      blob = await largestUnder(canvas, maxBytes);
    }

    return { blob, ...size, met: blob.size <= maxBytes };
  } finally {
    bitmap.close();
  }
}
