import { DEFAULT_COMPRESS_TARGET_KB } from "@/config/compress-targets";
import {
  COMPRESS_TARGET_KB_RANGE,
  MAX_METADATA_TEXT_LENGTH,
  MAX_RESIZE_DIMENSION,
  RESIZE_PERCENT_RANGE,
} from "@/config/limits";
import { DEFAULT_OUTPUT_FORMAT, type OutputFormat } from "@/lib/image/formats";

export const COMPRESSION_LEVELS = ["light", "balanced", "strong"] as const;
export type CompressionLevel = (typeof COMPRESSION_LEVELS)[number];

export const COMPRESSION_QUALITY: Record<CompressionLevel, number> = {
  light: 82,
  balanced: 68,
  strong: 50,
};

export const COMPRESS_MODES = ["level", "target"] as const;
export type CompressMode = (typeof COMPRESS_MODES)[number];

export const RESIZE_MODES = ["percent", "dimensions"] as const;
export type ResizeMode = (typeof RESIZE_MODES)[number];

export type ConvertOptions = { format: OutputFormat };
export type CompressOptions = {
  mode: CompressMode;
  level: CompressionLevel;
  targetKb: number | null;
  allowFormatChange: boolean;
};
export type ResizeOptions = {
  mode: ResizeMode;
  percent: number;
  width: number | null;
  height: number | null;
  keepAspect: boolean;
};

export const METADATA_FIELDS = ["author", "copyright", "description", "keywords"] as const;
export type MetadataField = (typeof METADATA_FIELDS)[number];
export type MetadataFields = Record<MetadataField, string>;

export type ToolOptions = {
  convert: ConvertOptions;
  compress: CompressOptions;
  resize: ResizeOptions;
  metadata: MetadataFields;
};

export const DEFAULT_TOOL_OPTIONS: ToolOptions = {
  convert: { format: DEFAULT_OUTPUT_FORMAT },
  compress: { mode: "level", level: "balanced", targetKb: DEFAULT_COMPRESS_TARGET_KB, allowFormatChange: false },
  resize: { mode: "percent", percent: 50, width: null, height: null, keepAspect: true },
  metadata: { author: "", copyright: "", description: "", keywords: "" },
};

export function getMetadataFieldsError(fields: MetadataFields) {
  const values = METADATA_FIELDS.map((field) => fields[field].trim());
  if (values.every((value) => !value)) return "Fill in at least one field.";
  if (values.some((value) => value.length > MAX_METADATA_TEXT_LENGTH)) {
    return `Keep each field under ${MAX_METADATA_TEXT_LENGTH} characters.`;
  }
  return null;
}

export function splitKeywords(keywords: string) {
  return keywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

export function isCompressionLevel(value: unknown): value is CompressionLevel {
  return COMPRESSION_LEVELS.includes(value as CompressionLevel);
}

export function isCompressMode(value: unknown): value is CompressMode {
  return COMPRESS_MODES.includes(value as CompressMode);
}

export function isResizeMode(value: unknown): value is ResizeMode {
  return RESIZE_MODES.includes(value as ResizeMode);
}

function inRange(value: number | null, min: number, max: number) {
  return value !== null && Number.isInteger(value) && value >= min && value <= max;
}

export function getCompressTargetError(targetKb: number | null) {
  const { min, max } = COMPRESS_TARGET_KB_RANGE;
  return inRange(targetKb, min, max) ? null : `Enter a target size between ${min} and ${max} KB.`;
}

export function getCompressError(options: CompressOptions) {
  return options.mode === "target" ? getCompressTargetError(options.targetKb) : null;
}

export function getResizeError(options: ResizeOptions) {
  if (options.mode === "percent") {
    const { min, max } = RESIZE_PERCENT_RANGE;
    return inRange(options.percent, min, max) ? null : `Pick a scale between ${min}% and ${max}%.`;
  }

  const sizes = [options.width, options.height].filter((value) => value !== null);
  if (!sizes.length) return "Enter a width or a height.";
  if (!options.keepAspect && sizes.length < 2) return "Enter both width and height, or keep the aspect ratio.";
  if (!sizes.every((value) => inRange(value, 1, MAX_RESIZE_DIMENSION))) {
    return `Width and height must be between 1 and ${MAX_RESIZE_DIMENSION} px.`;
  }
  return null;
}
