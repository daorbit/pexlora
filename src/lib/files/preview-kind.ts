import { detectFormat } from "@/lib/files/detect";
import { isPdfBlob } from "@/lib/files/pdf/is-pdf";

export type PreviewKind = "pdf" | "image" | "video" | "audio" | "zip";

const UNRENDERABLE_IMAGES = ["image/heic", "image/heif", "image/tiff"];

export function previewType(blob: Blob, name: string) {
  return blob.type || detectFormat({ name, type: "" })?.mimeTypes[0] || "";
}

export function previewKind(blob: Blob, name: string): PreviewKind | null {
  if (isPdfBlob(blob, name)) return "pdf";
  const type = previewType(blob, name);
  if (type === "application/zip" || /\.zip$/i.test(name)) return "zip";
  if (type.startsWith("image/")) return UNRENDERABLE_IMAGES.includes(type) ? null : "image";
  if (type.startsWith("video/")) return "video";
  if (type.startsWith("audio/")) return "audio";
  return null;
}
