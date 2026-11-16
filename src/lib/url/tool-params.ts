import { COMPRESS_TARGET_KB_RANGE, MAX_RESIZE_DIMENSION, RESIZE_PERCENT_RANGE } from "@/config/limits";
import type { WorkspaceToolSlug } from "@/config/tools";
import { FORMAT_EXTENSIONS, OUTPUT_FORMATS, type OutputFormat } from "@/lib/image/formats";
import { isCompressionLevel, type CompressOptions, type ToolOptions } from "@/lib/image/options";
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
