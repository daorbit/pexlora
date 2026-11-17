import { BROWSER_MAX_PIXELS } from "@/config/limits";
import { decodeImage } from "@/lib/files/convert/image-decode";
import { UnreadableFileError } from "@/lib/files/processors/types";
import { resizedSize } from "@/lib/files/raster/resize";
import { BrowserRasterUnavailableError, type RasterJob, type RasterReply, type RasterResult } from "@/lib/files/raster/types";

function supportsBrowserRaster() {
  return typeof Worker !== "undefined" && typeof OffscreenCanvas !== "undefined" && typeof createImageBitmap !== "undefined";
}

function outputPixels(job: RasterJob, bitmap: ImageBitmap) {
  if (job.kind !== "resize") return bitmap.width * bitmap.height;
  const { width, height } = resizedSize(job.options, bitmap);
  return width * height;
}

function runInWorker(job: RasterJob, bitmap: ImageBitmap) {
  const worker = new Worker(new URL("./raster.worker.ts", import.meta.url), { type: "module" });
  return new Promise<RasterResult>((resolve, reject) => {
    worker.onmessage = ({ data }: MessageEvent<RasterReply>) => {
      worker.terminate();
      if (data.ok) resolve(data.result);
      else reject(new UnreadableFileError(data.error));
    };
    worker.onerror = () => {
      worker.terminate();
      reject(new BrowserRasterUnavailableError("The image worker couldn't start."));
    };
    worker.postMessage({ job, bitmap }, [bitmap]);
  });
}

export async function processInBrowser(file: File, job: RasterJob) {
  if (!supportsBrowserRaster()) throw new BrowserRasterUnavailableError("This browser can't process images locally.");

  const bitmap = await decodeImage(file);
  const tooLarge = Math.max(bitmap.width * bitmap.height, outputPixels(job, bitmap)) > BROWSER_MAX_PIXELS;
  if (tooLarge) {
    bitmap.close();
    throw new BrowserRasterUnavailableError("This image is too large to process in the browser.");
  }

  return runInWorker(job, bitmap);
}
