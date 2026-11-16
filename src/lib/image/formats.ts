import { formatsOfKind } from "@/config/file-formats";

export const OUTPUT_FORMATS =["jpeg", "png", "webp", "avif"] as const;
export type OutputFormat = (typeof OUTPUT_FORMATS)[number];

export const FORMAT_LABELS: Record<OutputFormat, string> = {
  jpeg: "JPG",
  png: "PNG",
  webp: "WebP",
  avif: "AVIF",
};

export const FORMAT_EXTENSIONS: Record<OutputFormat, string> = {
  jpeg: "jpg",
  png: "png",
  webp: "webp",
  avif: "avif",
};

export const FORMAT_MIME_TYPES: Record<OutputFormat, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
};

const imageFormats = formatsOfKind("image");

export const INPUT_FORMAT_LABELS = imageFormats.map((format) => format.label);

export const ACCEPTED_MIME_TYPES = imageFormats.flatMap((format) => format.mimeTypes);

export const DEFAULT_OUTPUT_FORMAT: OutputFormat = "webp";
export const DEFAULT_QUALITY = 90;

export function isOutputFormat(value: unknown): value is OutputFormat {
  return OUTPUT_FORMATS.includes(value as OutputFormat);
}

export function toOutputFormat(format: string | undefined): OutputFormat {
  if (format === "jpg") return "jpeg";
  if (format === "heif") return "avif";
  return isOutputFormat(format) ? format : "png";
}
