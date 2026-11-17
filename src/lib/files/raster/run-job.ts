import { compressInBrowser } from "@/lib/files/raster/compress";
import { cropInBrowser } from "@/lib/files/raster/crop";
import { resizeInBrowser } from "@/lib/files/raster/resize";
import type { RasterJob } from "@/lib/files/raster/types";

export function runRasterJob(job: RasterJob, bitmap: ImageBitmap) {
  switch (job.kind) {
    case "compress":
      return compressInBrowser(bitmap, job.format, job.options);
    case "resize":
      return resizeInBrowser(bitmap, job.format, job.options);
    case "crop":
      return cropInBrowser(bitmap, job.format, job.options);
  }
}
