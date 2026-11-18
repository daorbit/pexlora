import { compressInBrowser } from "@/lib/files/raster/compress";
import { cropInBrowser } from "@/lib/files/raster/crop";
import { paletteCardInBrowser } from "@/lib/files/raster/palette-card";
import { resizeInBrowser } from "@/lib/files/raster/resize";
import { rotateInBrowser } from "@/lib/files/raster/rotate";
import { shapeInBrowser } from "@/lib/files/raster/shape";
import type { RasterJob } from "@/lib/files/raster/types";

export function runRasterJob(job: RasterJob, bitmap: ImageBitmap) {
  switch (job.kind) {
    case "compress":
      return compressInBrowser(bitmap, job.format, job.options);
    case "resize":
      return resizeInBrowser(bitmap, job.format, job.options);
    case "crop":
      return cropInBrowser(bitmap, job.format, job.options);
    case "rotate":
      return rotateInBrowser(bitmap, job.format, job.options);
    case "shape":
      return shapeInBrowser(bitmap, job.options);
    case "palette":
      return paletteCardInBrowser(bitmap, job.options);
  }
}
