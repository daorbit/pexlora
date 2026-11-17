import { compressInBrowser } from "@/lib/files/raster/compress";
import { resizeInBrowser } from "@/lib/files/raster/resize";
import type { RasterJob } from "@/lib/files/raster/types";

export function runRasterJob(job: RasterJob, bitmap: ImageBitmap) {
  return job.kind === "compress"
    ? compressInBrowser(bitmap, job.format, job.options)
    : resizeInBrowser(bitmap, job.format, job.options);
}
