import { canvasToBlob } from "@/lib/files/convert/image-decode";

const BEST_QUALITY = 0.95;
const LOWEST_QUALITY = 0.05;
const SEARCH_STEPS = 9;

const encode = (canvas: HTMLCanvasElement, quality: number) => canvasToBlob(canvas, "image/jpeg", quality);

export async function largestJpegUnder(canvas: HTMLCanvasElement, maxBytes: number) {
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
