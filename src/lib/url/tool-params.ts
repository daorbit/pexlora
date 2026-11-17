import { COMPRESS_TARGET_KB_RANGE, FORM_PHOTO_KB_RANGE, MAX_RESIZE_DIMENSION, RESIZE_PERCENT_RANGE } from "@/config/limits";
import type { WorkspaceToolSlug } from "@/config/tools";
import { FORMAT_EXTENSIONS, OUTPUT_FORMATS, type OutputFormat } from "@/lib/image/formats";
import {
  CROP_ANCHORS,
  CROP_RATIOS,
  isCompressionLevel,
  isOneOf,
  isRotateAngle,
  PAGE_NUMBER_POSITIONS,
  PAGE_NUMBER_STYLES,
  PASSPORT_COPIES,
  PASSPORT_OUTPUTS,
  PASSPORT_SIZES,
  PRINT_SHEETS,
  WATERMARK_LAYOUTS,
  WATERMARK_OPACITIES,
  SVG_OUTPUT_FORMATS,
  SVG_SIZES,
  TRACE_COLORS,
  TRACE_DETAILS,
  type CompressOptions,
  type ToolOptions,
} from "@/lib/image/options";
import type { ParamUpdates } from "@/lib/url/search-params";

const formatByExtension = Object.fromEntries(
  OUTPUT_FORMATS.map((format) => [FORMAT_EXTENSIONS[format], format]),
) as Record<string, OutputFormat>;

function readInt(params: URLSearchParams, key: string, min: number, max: number) {
  const value = Number(params.get(key));
  return Number.isInteger(value) && value >= min && value <= max ? value : null;
}

function readResizeMode(params: URLSearchParams, fallback: ToolOptions["resize"]["mode"]) {
  const mode = params.get("mode");
  if (mode === "size") return "dimensions";
  if (mode === "percent") return "percent";
  return fallback;
}

function readKeepAspect(params: URLSearchParams, fallback: boolean) {
  const ratio = params.get("ratio");
  if (ratio === "free") return false;
  if (ratio === "keep") return true;
  return fallback;
}

function readOneOf<T extends string>(params: URLSearchParams, key: string, values: readonly T[], fallback: T) {
  const value = params.get(key);
  return isOneOf(values, value) ? value : fallback;
}

function readCompressOptions(params: URLSearchParams, base: CompressOptions): CompressOptions {
  const level = params.get("level");
  const targetKb = readInt(params, "target", COMPRESS_TARGET_KB_RANGE.min, COMPRESS_TARGET_KB_RANGE.max);
  const fallback = params.get("fallback");
  const mode = targetKb !== null ? "target" : isCompressionLevel(level) ? "level" : base.mode;

  return {
    mode,
    level: isCompressionLevel(level) ? level : base.level,
    targetKb: targetKb ?? base.targetKb,
    allowFormatChange: fallback === null ? base.allowFormatChange : fallback === "jpg",
  };
}

export function optionsFromParams(tool: WorkspaceToolSlug, params: URLSearchParams, base: ToolOptions): ToolOptions {
  switch (tool) {
    case "convert-format": {
      const format = formatByExtension[params.get("format") ?? ""] ?? base.convert.format;
      return { ...base, convert: { format } };
    }
    case "compress-image":
      return { ...base, compress: readCompressOptions(params, base.compress) };
    case "heic-to-jpg": {
      const format = params.get("format");
      return { ...base, heic: { format: format === "png" ? "png" : format === "jpg" ? "jpeg" : base.heic.format } };
    }
    case "form-photo":
      return {
        ...base,
        form: {
          width: readInt(params, "w", 1, MAX_RESIZE_DIMENSION) ?? base.form.width,
          height: readInt(params, "h", 1, MAX_RESIZE_DIMENSION) ?? base.form.height,
          minKb: readInt(params, "min", 1, FORM_PHOTO_KB_RANGE.max) ?? base.form.minKb,
          maxKb: readInt(params, "max", FORM_PHOTO_KB_RANGE.min, FORM_PHOTO_KB_RANGE.max) ?? base.form.maxKb,
        },
      };
    case "rotate-pdf": {
      const angle = params.get("angle");
      return { ...base, rotate: { angle: isRotateAngle(angle) ? angle : base.rotate.angle } };
    }
    case "svg-to-image": {
      const format = formatByExtension[params.get("format") ?? ""];
      const size = params.get("size");
      return {
        ...base,
        svg: {
          format: isOneOf(SVG_OUTPUT_FORMATS, format) ? format : base.svg.format,
          size: isOneOf(SVG_SIZES, size) ? size : base.svg.size,
        },
      };
    }
    case "image-to-svg": {
      const detail = params.get("detail");
      const colors = params.get("colors");
      return {
        ...base,
        trace: {
          detail: isOneOf(TRACE_DETAILS, detail) ? detail : base.trace.detail,
          colors: isOneOf(TRACE_COLORS, colors) ? colors : base.trace.colors,
        },
      };
    }
    case "crop-image":
      return {
        ...base,
        crop: {
          ratio: readOneOf(params, "ratio", CROP_RATIOS, base.crop.ratio),
          anchor: readOneOf(params, "keep", CROP_ANCHORS, base.crop.anchor),
        },
      };
    case "passport-photo":
      return {
        ...base,
        passport: {
          size: readOneOf(params, "size", PASSPORT_SIZES, base.passport.size),
          sheet: readOneOf(params, "sheet", PRINT_SHEETS, base.passport.sheet),
          copies: readOneOf(params, "copies", PASSPORT_COPIES, base.passport.copies),
          output: readOneOf(params, "output", PASSPORT_OUTPUTS, base.passport.output),
        },
      };
    case "pdf-page-numbers": {
      const cover = params.get("cover");
      return {
        ...base,
        pageNumbers: {
          position: readOneOf(params, "position", PAGE_NUMBER_POSITIONS, base.pageNumbers.position),
          style: readOneOf(params, "style", PAGE_NUMBER_STYLES, base.pageNumbers.style),
          skipFirst: cover === null ? base.pageNumbers.skipFirst : cover === "skip",
        },
      };
    }
    case "pdf-watermark":
      return {
        ...base,
        watermark: {
          ...base.watermark,
          layout: readOneOf(params, "layout", WATERMARK_LAYOUTS, base.watermark.layout),
          opacity: readOneOf(params, "strength", WATERMARK_OPACITIES, base.watermark.opacity),
        },
      };
    case "resize-image": {
      return {
        ...base,
        resize: {
          mode: readResizeMode(params, base.resize.mode),
          percent: readInt(params, "scale", RESIZE_PERCENT_RANGE.min, RESIZE_PERCENT_RANGE.max) ?? base.resize.percent,
          width: readInt(params, "width", 1, MAX_RESIZE_DIMENSION) ?? base.resize.width,
          height: readInt(params, "height", 1, MAX_RESIZE_DIMENSION) ?? base.resize.height,
          keepAspect: readKeepAspect(params, base.resize.keepAspect),
        },
      };
    }
    default:
      return base;
  }
}

export function optionsToParams(tool: WorkspaceToolSlug, options: ToolOptions): ParamUpdates {
  switch (tool) {
    case "convert-format":
      return { format: FORMAT_EXTENSIONS[options.convert.format] };
    case "heic-to-jpg":
      return { format: FORMAT_EXTENSIONS[options.heic.format] };
    case "rotate-pdf":
      return { angle: options.rotate.angle };
    case "svg-to-image":
      return { format: FORMAT_EXTENSIONS[options.svg.format], size: options.svg.size };
    case "image-to-svg":
      return { detail: options.trace.detail, colors: options.trace.colors };
    case "crop-image":
      return { ratio: options.crop.ratio, keep: options.crop.anchor };
    case "passport-photo": {
      const { size, sheet, copies, output } = options.passport;
      return { size, sheet, copies, output };
    }
    case "pdf-page-numbers": {
      const { position, style, skipFirst } = options.pageNumbers;
      return { position, style, cover: skipFirst ? "skip" : null };
    }
    case "pdf-watermark":
      return { layout: options.watermark.layout, strength: options.watermark.opacity };
    case "form-photo": {
      const { width, height, minKb, maxKb } = options.form;
      const text = (value: number | null) => (value === null ? null : String(value));
      return { w: text(width), h: text(height), min: text(minKb), max: text(maxKb) };
    }
    case "compress-image": {
      const { compress } = options;
      const byTarget = compress.mode === "target";
      return {
        level: byTarget ? null : compress.level,
        target: byTarget && compress.targetKb !== null ? String(compress.targetKb) : null,
        fallback: byTarget && compress.allowFormatChange ? "jpg" : null,
      };
    }
    case "resize-image": {
      const { resize } = options;
      const bySize = resize.mode === "dimensions";
      return {
        mode: bySize ? "size" : "percent",
        scale: bySize ? null : String(resize.percent),
        width: bySize && resize.width !== null ? String(resize.width) : null,
        height: bySize && resize.height !== null ? String(resize.height) : null,
        ratio: bySize ? (resize.keepAspect ? "keep" : "free") : null,
      };
    }
    default:
      return {};
  }
}
