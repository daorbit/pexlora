import type { OutputFormat } from "@/lib/image/formats";
import type { CompressOptions, MetadataFields, ResizeOptions } from "@/lib/image/options";
import type { ImageDimensions, MetadataReport, ProcessedFile } from "@/lib/metadata/types";
import { apiRequest } from "@/services/api-client";

function post(path: string, file: File, fields: Record<string, string> = {}) {
  const body = new FormData();
  body.append("file", file);
  Object.entries(fields).forEach(([key, value]) => body.append(key, value));
  return apiRequest(path, { method: "POST", body });
}

function numberHeader(response: Response, name: string) {
  const value = response.headers.get(name);
  return value === null ? null : Number(value);
}

function dimensionHeaders(response: Response): ImageDimensions | null {
  const width = numberHeader(response, "X-Image-Width");
  const height = numberHeader(response, "X-Image-Height");
  return width !== null && height !== null ? { width, height } : null;
}

async function toProcessedFile(response: Response, fallbackName: string): Promise<ProcessedFile> {
  const encodedName = response.headers.get("X-File-Name");
  return {
    blob: await response.blob(),
    name: encodedName ? decodeURIComponent(encodedName) : fallbackName,
    leftoverTags: numberHeader(response, "X-Leftover-Tags"),
    quotaRemaining: numberHeader(response, "X-Quota-Remaining"),
    dimensions: dimensionHeaders(response),
    uploaded: true,
  };
}

export async function inspectImage(file: File): Promise<MetadataReport> {
  const response = await post("/api/images/inspect", file);
  return response.json();
}

export async function cleanImage(file: File) {
  return toProcessedFile(await post("/api/images/clean", file), file.name);
}

export async function convertImage(file: File, format: OutputFormat) {
  return toProcessedFile(await post("/api/images/convert", file, { format }), file.name);
}

export async function compressImage(file: File, options: CompressOptions) {
  if (options.mode === "level") {
    return toProcessedFile(await post("/api/images/compress", file, { level: options.level }), file.name);
  }

  const targetKb = options.targetKb ?? 0;
  const response = await post("/api/images/compress", file, {
    targetKb: String(targetKb),
    allowFormatChange: String(options.allowFormatChange),
  });
  const processed = await toProcessedFile(response, file.name);
  return { ...processed, target: { bytes: targetKb * 1024, met: response.headers.get("X-Target-Met") === "true" } };
}

export async function editImageMetadata(file: File, fields: MetadataFields) {
  return toProcessedFile(await post("/api/images/edit-metadata", file, fields), file.name);
}

export async function resizeImage(file: File, options: ResizeOptions) {
  const response = await post("/api/images/resize", file, {
    mode: options.mode,
    percent: String(options.percent),
    width: options.width === null ? "" : String(options.width),
    height: options.height === null ? "" : String(options.height),
    keepAspect: String(options.keepAspect),
  });
  return toProcessedFile(response, file.name);
}
