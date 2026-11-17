import type { TraceOptions } from "@/lib/image/options";
import { decodeImage } from "@/lib/files/convert/image-decode";
import { UnreadableFileError } from "@/lib/files/processors/types";
import { drawScaled, readPixels } from "@/lib/files/raster/surface";
import { tracerOptions, TRACE_MAX_SIDE } from "@/lib/files/vector/trace-options";

type TraceReply = { ok: true; svg: string } | { ok: false; error: string };

const ROOT_TAG = /^<svg\b[^>]*>/;

function tracingSize(bitmap: ImageBitmap, maxSide: number) {
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  return { width: Math.max(1, Math.round(bitmap.width * scale)), height: Math.max(1, Math.round(bitmap.height * scale)) };
}

function cleanRoot(svg: string, width: number, height: number, outputWidth: number, outputHeight: number) {
  const root = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${outputWidth}" height="${outputHeight}">`;
  return svg.trim().replace(ROOT_TAG, root);
}

function traceInWorker(pixels: ImageData, options: TraceOptions) {
  const worker = new Worker(new URL("./trace.worker.ts", import.meta.url), { type: "module" });
  return new Promise<string>((resolve, reject) => {
    worker.onmessage = ({ data }: MessageEvent<TraceReply>) => {
      worker.terminate();
      if (data.ok) resolve(data.svg);
      else reject(new UnreadableFileError(data.error));
    };
    worker.onerror = () => {
      worker.terminate();
      reject(new UnreadableFileError("Tracing couldn't start in this browser."));
    };
    worker.postMessage({ pixels, options: tracerOptions(options) });
  });
}

export async function traceImage(file: File, options: TraceOptions) {
  if (typeof Worker === "undefined" || typeof OffscreenCanvas === "undefined") {
    throw new UnreadableFileError("This browser can't trace images. Try a recent Chrome, Edge, Firefox or Safari.");
  }

  const bitmap = await decodeImage(file);
  try {
    const size = tracingSize(bitmap, TRACE_MAX_SIDE[options.detail]);
    const pixels = readPixels(drawScaled(bitmap, size.width, size.height, null));
    const svg = await traceInWorker(pixels, options);
    return { svg: cleanRoot(svg, size.width, size.height, bitmap.width, bitmap.height), width: bitmap.width, height: bitmap.height };
  } finally {
    bitmap.close();
  }
}
