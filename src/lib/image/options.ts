import { DEFAULT_COMPRESS_TARGET_KB } from "@/config/compress-targets";
import {
  COMPRESS_TARGET_KB_RANGE,
  DPI_RANGE,
  MAX_METADATA_TEXT_LENGTH,
  FORM_PHOTO_KB_RANGE,
  MAX_RESIZE_DIMENSION,
  MAX_WATERMARK_LENGTH,
  RESIZE_PERCENT_RANGE,
} from "@/config/limits";
import { parsePageSpec } from "@/lib/files/pdf/page-spec";
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

export const RASTER_FORMATS = ["jpeg", "png"] as const;
export type RasterFormat = (typeof RASTER_FORMATS)[number];

export const ROTATE_ANGLES = ["90", "180", "270"] as const;
export type RotateAngle = (typeof ROTATE_ANGLES)[number];

export const SVG_OUTPUT_FORMATS = ["png", "jpeg", "webp"] as const;
export type SvgOutputFormat = (typeof SVG_OUTPUT_FORMATS)[number];

export const SVG_SIZES = ["1x", "2x", "4x", "512", "1024", "2048"] as const;
export type SvgSize = (typeof SVG_SIZES)[number];

export const TRACE_DETAILS = ["simple", "balanced", "detailed"] as const;
export type TraceDetail = (typeof TRACE_DETAILS)[number];

export const TRACE_COLORS = ["2", "4", "8", "16", "32"] as const;
export type TraceColors = (typeof TRACE_COLORS)[number];

export const CROP_RATIOS = ["1x1", "4x5", "9x16", "16x9", "3x2", "4x3"] as const;
export type CropRatio = (typeof CROP_RATIOS)[number];

export const CROP_ANCHORS = ["start", "center", "end"] as const;
export type CropAnchor = (typeof CROP_ANCHORS)[number];

export const PASSPORT_SIZES = ["35x45", "51x51", "20x25"] as const;
export type PassportSize = (typeof PASSPORT_SIZES)[number];

export const PRINT_SHEETS = ["4x6", "a4"] as const;
export type PrintSheet = (typeof PRINT_SHEETS)[number];

export const PASSPORT_COPIES = ["fill", "2", "4", "6"] as const;
export type PassportCopies = (typeof PASSPORT_COPIES)[number];

export const PASSPORT_OUTPUTS = ["jpeg", "pdf"] as const;
export type PassportOutput = (typeof PASSPORT_OUTPUTS)[number];

export const PAGE_NUMBER_POSITIONS = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"] as const;
export type PageNumberPosition = (typeof PAGE_NUMBER_POSITIONS)[number];

export const PAGE_NUMBER_STYLES = ["number", "page", "page-of", "fraction"] as const;
export type PageNumberStyle = (typeof PAGE_NUMBER_STYLES)[number];

export const WATERMARK_LAYOUTS = ["diagonal", "horizontal", "tiled"] as const;
export type WatermarkLayout = (typeof WATERMARK_LAYOUTS)[number];

export const WATERMARK_OPACITIES = ["light", "medium", "strong"] as const;
export type WatermarkOpacity = (typeof WATERMARK_OPACITIES)[number];

export const WATERMARK_OPACITY_VALUES: Record<WatermarkOpacity, number> = {
  light: 0.15,
  medium: 0.3,
  strong: 0.5,
};

export const DPI_PRESETS = ["72", "96", "150", "200", "300", "600"] as const;
export type DpiPreset = (typeof DPI_PRESETS)[number];

export const IMAGE_ROTATIONS = ["0", "90", "180", "270"] as const;
export type ImageRotation = (typeof IMAGE_ROTATIONS)[number];

export const IMAGE_FLIPS = ["none", "horizontal", "vertical"] as const;
export type ImageFlip = (typeof IMAGE_FLIPS)[number];

export const IMAGE_SHAPES = ["rounded", "circle", "heart", "star", "hexagon", "arch"] as const;
export type ImageShape = (typeof IMAGE_SHAPES)[number];

export const SHAPE_CORNERS = ["small", "medium", "large"] as const;
export type ShapeCorners = (typeof SHAPE_CORNERS)[number];

export const SHAPE_BACKGROUNDS = ["transparent", "white"] as const;
export type ShapeBackground = (typeof SHAPE_BACKGROUNDS)[number];

export const PDF_IMAGE_FORMATS = ["jpeg", "png"] as const;
export type PdfImageFormat = (typeof PDF_IMAGE_FORMATS)[number];

export const PDF_IMAGE_QUALITIES = ["screen", "print"] as const;
export type PdfImageQuality = (typeof PDF_IMAGE_QUALITIES)[number];

export const PALETTE_SIZES = ["5", "8", "12"] as const;
export type PaletteSize = (typeof PALETTE_SIZES)[number];

export type ConvertOptions = { format: OutputFormat };
export type DpiOptions = { dpi: number | null };
export type RotateImageOptions = { angle: ImageRotation; flip: ImageFlip };
export type ShapeOptions = { shape: ImageShape; corners: ShapeCorners; background: ShapeBackground };
export type PaletteOptions = { size: PaletteSize };
export type CropOptions = { ratio: CropRatio; anchor: CropAnchor };
export type PassportOptions = { size: PassportSize; sheet: PrintSheet; copies: PassportCopies; output: PassportOutput };
export type PageNumberOptions = { position: PageNumberPosition; style: PageNumberStyle; skipFirst: boolean };
export type WatermarkOptions = { text: string; layout: WatermarkLayout; opacity: WatermarkOpacity };
export type OrganizeOptions = { pages: string };
export type PdfImageOptions = { pages: string; format: PdfImageFormat; quality: PdfImageQuality };
export type HeicOptions = { format: RasterFormat };
export type RotateOptions = { angle: RotateAngle };
export type SvgRasterOptions = { format: SvgOutputFormat; size: SvgSize };
export type TraceOptions = { detail: TraceDetail; colors: TraceColors };
export type FormPhotoOptions = { width: number | null; height: number | null; minKb: number | null; maxKb: number | null };
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
  heic: HeicOptions;
  rotate: RotateOptions;
  form: FormPhotoOptions;
  svg: SvgRasterOptions;
  trace: TraceOptions;
  crop: CropOptions;
  passport: PassportOptions;
  pageNumbers: PageNumberOptions;
  watermark: WatermarkOptions;
  organize: OrganizeOptions;
  pdfImage: PdfImageOptions;
  dpi: DpiOptions;
  rotateImage: RotateImageOptions;
  shape: ShapeOptions;
  palette: PaletteOptions;
};

export const DEFAULT_TOOL_OPTIONS: ToolOptions = {
  convert: { format: DEFAULT_OUTPUT_FORMAT },
  compress: { mode: "level", level: "balanced", targetKb: DEFAULT_COMPRESS_TARGET_KB, allowFormatChange: false },
  resize: { mode: "percent", percent: 50, width: null, height: null, keepAspect: true },
  metadata: { author: "", copyright: "", description: "", keywords: "" },
  heic: { format: "jpeg" },
  rotate: { angle: "90" },
  form: { width: null, height: null, minKb: null, maxKb: 50 },
  svg: { format: "png", size: "2x" },
  trace: { detail: "balanced", colors: "8" },
  crop: { ratio: "1x1", anchor: "center" },
  passport: { size: "35x45", sheet: "4x6", copies: "fill", output: "jpeg" },
  pageNumbers: { position: "bottom-center", style: "number", skipFirst: false },
  watermark: { text: "Confidential", layout: "diagonal", opacity: "medium" },
  organize: { pages: "" },
  pdfImage: { pages: "", format: "jpeg", quality: "screen" },
  dpi: { dpi: 300 },
  rotateImage: { angle: "90", flip: "none" },
  shape: { shape: "circle", corners: "medium", background: "transparent" },
  palette: { size: "8" },
};

export function getRotateImageError({ angle, flip }: RotateImageOptions) {
  return angle === "0" && flip === "none" ? "Pick a rotation or a flip." : null;
}

export function getDpiError({ dpi }: DpiOptions) {
  if (dpi === null || dpi < DPI_RANGE.min || dpi > DPI_RANGE.max) return `Enter a DPI between ${DPI_RANGE.min} and ${DPI_RANGE.max}.`;
  return null;
}

export function isOneOf<T extends string>(values: readonly T[], value: unknown): value is T {
  return values.includes(value as T);
}

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

export function isRotateAngle(value: unknown): value is RotateAngle {
  return ROTATE_ANGLES.includes(value as RotateAngle);
}

const WATERMARK_CHARACTERS = /^[\x20-\x7E -ÿ]+$/;

export function getWatermarkError({ text }: WatermarkOptions) {
  const value = text.trim();
  if (!value) return "Type the watermark text.";
  if (value.length > MAX_WATERMARK_LENGTH) return `Keep the watermark under ${MAX_WATERMARK_LENGTH} characters.`;
  if (!WATERMARK_CHARACTERS.test(value)) return "Use English letters, numbers and common symbols. Other scripts aren't supported yet.";
  return null;
}

export function getPdfImageError({ pages }: PdfImageOptions) {
  return getOrganizeError({ pages });
}

export function getOrganizeError({ pages }: OrganizeOptions) {
  return parsePageSpec(pages) ? null : "Use page numbers and ranges like 1-3, 5, 8.";
}

export function getFormPhotoError({ width, height, minKb, maxKb }: FormPhotoOptions) {
  if (!maxKb) return "Set the largest file size the form accepts.";
  if (maxKb < FORM_PHOTO_KB_RANGE.min || maxKb > FORM_PHOTO_KB_RANGE.max) {
    return `Pick a size between ${FORM_PHOTO_KB_RANGE.min} and ${FORM_PHOTO_KB_RANGE.max} KB.`;
  }
  if (minKb !== null && minKb >= maxKb) return "The smallest size must be below the largest size.";
  if ([width, height].some((side) => side !== null && (side < 1 || side > MAX_RESIZE_DIMENSION))) {
    return `Width and height must be between 1 and ${MAX_RESIZE_DIMENSION} pixels.`;
  }
  return null;
}
