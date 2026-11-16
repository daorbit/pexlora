import { MAX_RESIZE_DIMENSION, RESIZE_PERCENT_RANGE } from "@/config/limits";
import { DEFAULT_OUTPUT_FORMAT, DEFAULT_QUALITY, type OutputFormat } from "@/lib/image/formats";

export const COMPRESSION_LEVELS = ["light", "balanced", "strong"] as const;
export type CompressionLevel = (typeof COMPRESSION_LEVELS)[number];

export const COMPRESSION_QUALITY: Record<CompressionLevel, number> = {
  light: 82,
  balanced: 68,
  strong: 50,
};

export const RESIZE_MODES = ["percent", "dimensions"] as const;
export type ResizeMode = (typeof RESIZE_MODES)[number];

export type ConvertOptions = { format: OutputFormat; quality: number };
export type CompressOptions = { level: CompressionLevel };
export type ResizeOptions = {
  mode: ResizeMode;
  percent: number;
  width: number | null;
  height: number | null;
  keepAspect: boolean;
};

export type ToolOptions = {
  convert: ConvertOptions;
  compress: CompressOptions;
  resize: ResizeOptions;
};

export const DEFAULT_TOOL_OPTIONS: ToolOptions = {
  convert: { format: DEFAULT_OUTPUT_FORMAT, quality: DEFAULT_QUALITY },
  compress: { level: "balanced" },
  resize: { mode: "percent", percent: 50, width: null, height: null, keepAspect: true },
};

export function isCompressionLevel(value: unknown): value is CompressionLevel {
  return COMPRESSION_LEVELS.includes(value as CompressionLevel);
}

export function isResizeMode(value: unknown): value is ResizeMode {
  return RESIZE_MODES.includes(value as ResizeMode);
}

function inRange(value: number | null, min: number, max: number) {
  return value !== null && Number.isInteger(value) && value >= min && value <= max;
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
