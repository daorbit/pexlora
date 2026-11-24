import { PREVIEW_SHEET_MAX_BYTES, PREVIEW_TEXT_MAX_BYTES } from "@/config/limits";
import { detectFormat } from "@/lib/files/detect";
import { isPdfBlob } from "@/lib/files/pdf/is-pdf";

export type PreviewKind = "pdf" | "image" | "video" | "audio" | "zip" | "text" | "sheet";

const SHEET_FORMATS = ["xlsx", "xls", "ods", "csv"];

const TEXT_FILE = /\.(txt|json|md|log|xml|html?|css|m?js|ts|ya?ml|ini|srt|vtt)$/i;

const UNRENDERABLE_IMAGES = ["image/heic", "image/heif", "image/tiff"];

export function previewType(blob: Blob, name: string) {
  return blob.type || detectFormat({ name, type: "" })?.mimeTypes[0] || "";
}

export function previewKind(blob: Blob, name: string): PreviewKind | null {
  if (isPdfBlob(blob, name)) return "pdf";
  const type = previewType(blob, name);
  if (type === "application/zip" || /\.zip$/i.test(name)) return "zip";
  const format = detectFormat({ name, type });
  if (format && SHEET_FORMATS.includes(format.id)) return blob.size <= PREVIEW_SHEET_MAX_BYTES ? "sheet" : null;
  if (type.startsWith("text/plain") || TEXT_FILE.test(name)) return blob.size <= PREVIEW_TEXT_MAX_BYTES ? "text" : null;
  if (type.startsWith("image/")) return UNRENDERABLE_IMAGES.includes(type) ? null : "image";
  if (type.startsWith("video/")) return "video";
  if (type.startsWith("audio/")) return "audio";
  return null;
}
