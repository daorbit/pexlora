import type { CompressOptions, CropOptions, ResizeOptions } from "@/lib/image/options";

export type BrowserFormat = "jpeg" | "png" | "webp";

export type RasterJob =
  | { kind: "compress"; format: BrowserFormat; options: CompressOptions }
  | { kind: "resize"; format: BrowserFormat; options: ResizeOptions }
  | { kind: "crop"; format: BrowserFormat; options: CropOptions };

export type RasterRequest = { job: RasterJob; bitmap: ImageBitmap };

export type RasterResult = {
  buffer: ArrayBuffer;
  format: BrowserFormat;
  width: number;
  height: number;
  targetMet: boolean | null;
};

export type RasterReply = { ok: true; result: RasterResult } | { ok: false; error: string };

export class BrowserRasterUnavailableError extends Error {}
