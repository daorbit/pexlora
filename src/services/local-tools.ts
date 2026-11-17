import { MAX_IMAGE_SIZE } from "@/config/limits";
import { localToolsCopy, optionsCopy } from "@/content/workspace";
import { FORMAT_EXTENSIONS, FORMAT_MIME_TYPES } from "@/lib/image/formats";
import type {
  CompressOptions,
  CropOptions,
  FormPhotoOptions,
  OrganizeOptions,
  PageNumberOptions,
  PassportOptions,
  RasterFormat,
  ResizeOptions,
  RotateAngle,
  SvgRasterOptions,
  TraceOptions,
  WatermarkOptions,
} from "@/lib/image/options";
import { makePassportSheet } from "@/lib/files/convert/passport-sheet";
import { addPageNumbers, addWatermark } from "@/lib/files/pdf/pdf-stamp";
import { rasterizeSvg } from "@/lib/files/vector/svg-rasterize";
import { traceImage } from "@/lib/files/vector/trace-image";
import { detectFormat } from "@/lib/files/detect";
import { makeFormPhoto } from "@/lib/files/convert/form-photo";
import { convertImage, type RasterType } from "@/lib/files/convert/image-decode";
import { processInBrowser } from "@/lib/files/raster/browser-raster";
import {
  BrowserRasterUnavailableError,
  type BrowserFormat,
  type RasterJob,
  type RasterResult,
} from "@/lib/files/raster/types";
import { compressImage, resizeImage } from "@/services/image-api";
import { pdfToImages } from "@/lib/files/pdf/pdf-render";
import {
  imagesToPdf,
  jpegToPdfPage,
  mergePdfs,
  organizePdf,
  rotatePdf,
  splitPdf,
  type NamedBlob,
} from "@/lib/files/pdf/pdf-tools";
import { UnreadableFileError } from "@/lib/files/processors/types";
import type { ProcessedFile } from "@/lib/metadata/types";
import { createZip } from "@/lib/utils/download";
import { baseName, withExtension } from "@/lib/utils/file-name";
import { consumeQuota } from "@/services/usage-api";

const COMBINED_PDF_NAME = "combined.pdf";
const SVG_MIME_TYPE = "image/svg+xml";

async function guard<T>(task: () => Promise<T>) {
  try {
    return await task();
  } catch (error) {
    if (error instanceof UnreadableFileError) throw error;
    console.error(error);
    throw new UnreadableFileError("This file couldn't be processed. It may be damaged.");
  }
}

async function finish(blob: Blob, name: string, extra: Partial<ProcessedFile> = {}): Promise<ProcessedFile> {
  return { blob, name, leftoverTags: null, ...extra, quotaRemaining: await consumeQuota() };
}

async function bundle(parts: NamedBlob[], source: File, suffix: string) {
  if (parts.length === 1) return finish(parts[0].blob, parts[0].name);
  return finish(await createZip(parts), withExtension(source.name, "zip", suffix));
}

export async function convertHeicFile(file: File, format: RasterFormat) {
  const blob = await guard(() => convertImage(file, FORMAT_MIME_TYPES[format] as RasterType));
  return finish(blob, withExtension(file.name, FORMAT_EXTENSIONS[format]));
}

export async function rotatePdfFile(file: File, angle: RotateAngle) {
  const blob = await guard(() => rotatePdf(file, Number(angle)));
  return finish(blob, withExtension(file.name, "pdf", "-rotated"));
}

export async function splitPdfFile(file: File) {
  return bundle(await guard(() => splitPdf(file)), file, "-pages");
}

export async function pdfToJpgFile(file: File) {
  return bundle(await guard(() => pdfToImages(file)), file, "-images");
}

function combinedName(files: File[]) {
  return files.length === 1 ? withExtension(files[0].name, "pdf") : COMBINED_PDF_NAME;
}

export async function mergePdfFiles(files: File[]) {
  const blob = await guard(() => mergePdfs(files));
  return finish(blob, files.length === 1 ? `${baseName(files[0].name)}-merged.pdf` : combinedName(files));
}

export async function imagesToPdfFile(files: File[]) {
  const blob = await guard(() => imagesToPdf(files));
  return finish(blob, combinedName(files));
}

const BROWSER_FORMATS: Partial<Record<string, BrowserFormat>> = { jpeg: "jpeg", png: "png", webp: "webp", heic: "jpeg" };

function browserFormatOf(file: File) {
  const id = detectFormat(file)?.id;
  return id ? BROWSER_FORMATS[id] : undefined;
}

function canUseServer(file: File) {
  const format = detectFormat(file);
  return Boolean(format && format.serverReadable !== false && file.size <= MAX_IMAGE_SIZE);
}

async function inBrowserOrServer(
  file: File,
  job: RasterJob | null,
  server: (() => Promise<ProcessedFile>) | null,
  describe: (result: RasterResult) => Partial<ProcessedFile>,
) {
  if (!job) {
    if (server) return server();
    throw new UnreadableFileError(localToolsCopy.browserFormatsOnly);
  }
  let result: RasterResult;
  try {
    result = await processInBrowser(file, job);
  } catch (error) {
    if (error instanceof BrowserRasterUnavailableError && server && canUseServer(file)) return server();
    if (error instanceof BrowserRasterUnavailableError) throw new UnreadableFileError(localToolsCopy.tooLargeForBrowser);
    throw error;
  }
  const blob = new Blob([result.buffer], { type: FORMAT_MIME_TYPES[result.format] });
  return finish(blob, withExtension(file.name, FORMAT_EXTENSIONS[result.format]), {
    dimensions: { width: result.width, height: result.height },
    ...describe(result),
  });
}

export function compressImageFile(file: File, options: CompressOptions) {
  const format = browserFormatOf(file);
  return inBrowserOrServer(
    file,
    format ? { kind: "compress", format, options } : null,
    () => compressImage(file, options),
    ({ targetMet }) => ({
      target: options.mode === "target" ? { bytes: (options.targetKb ?? 0) * 1024, met: Boolean(targetMet) } : null,
    }),
  );
}

export function resizeImageFile(file: File, options: ResizeOptions) {
  const format = browserFormatOf(file);
  return inBrowserOrServer(file, format ? { kind: "resize", format, options } : null, () => resizeImage(file, options), () => ({}));
}

export function cropImageFile(file: File, options: CropOptions) {
  const format = browserFormatOf(file);
  return inBrowserOrServer(file, format ? { kind: "crop", format, options } : null, null, () => ({}));
}

export async function passportSheetFile(file: File, options: PassportOptions) {
  const { blob, layout, width, height } = await guard(() => makePassportSheet(file, options));
  const output = options.output === "pdf" ? await guard(() => jpegToPdfPage(blob, layout.sheet)) : blob;
  return finish(output, withExtension(file.name, options.output === "pdf" ? "pdf" : "jpg", "-passport-sheet"), {
    dimensions: { width, height },
  });
}

export async function pageNumbersFile(file: File, options: PageNumberOptions) {
  const blob = await guard(() => addPageNumbers(file, options, optionsCopy.pageNumberLabels[options.style]));
  return finish(blob, withExtension(file.name, "pdf", "-numbered"));
}

export async function watermarkPdfFile(file: File, options: WatermarkOptions) {
  const blob = await guard(() => addWatermark(file, options));
  return finish(blob, withExtension(file.name, "pdf", "-watermarked"));
}

export async function organizePdfFile(file: File, options: OrganizeOptions) {
  const blob = await guard(() => organizePdf(file, options.pages));
  return finish(blob, withExtension(file.name, "pdf", "-organized"));
}

export async function svgToImageFile(file: File, options: SvgRasterOptions) {
  const { buffer, width, height } = await guard(() => rasterizeSvg(file, options));
  const blob = new Blob([buffer], { type: FORMAT_MIME_TYPES[options.format] });
  return finish(blob, withExtension(file.name, FORMAT_EXTENSIONS[options.format]), { dimensions: { width, height } });
}

export async function imageToSvgFile(file: File, options: TraceOptions) {
  const { svg, width, height } = await guard(() => traceImage(file, options));
  return finish(new Blob([svg], { type: SVG_MIME_TYPE }), withExtension(file.name, "svg"), { dimensions: { width, height } });
}

export async function formPhotoFile(file: File, options: FormPhotoOptions) {
  const { blob, width, height, met } = await guard(() => makeFormPhoto(file, options));
  return finish(blob, withExtension(file.name, "jpg", `-${width}x${height}`), {
    dimensions: { width, height },
    target: options.maxKb ? { bytes: options.maxKb * 1024, met } : null,
  });
}
