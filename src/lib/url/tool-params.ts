import { RESIZE_PERCENT_RANGE, MAX_RESIZE_DIMENSION } from "@/config/limits";
import type { WorkspaceToolSlug } from "@/config/tools";
import { FORMAT_EXTENSIONS, OUTPUT_FORMATS, type OutputFormat } from "@/lib/image/formats";
import { isCompressionLevel, type ToolOptions } from "@/lib/image/options";
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

export function optionsFromParams(tool: WorkspaceToolSlug, params: URLSearchParams, base: ToolOptions): ToolOptions {
  switch (tool) {
    case "convert-format": {
      const format = formatByExtension[params.get("format") ?? ""] ?? base.convert.format;
      const quality = readInt(params, "quality", 40, 100) ?? base.convert.quality;
      return { ...base, convert: { format, quality } };
    }
    case "compress-image": {
      const level = params.get("level");
      return { ...base, compress: { level: isCompressionLevel(level) ? level : base.compress.level } };
    }
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

export function optionsToParams(tool: WorkspaceToolSlug, options: ToolOptions, { formatInRoute = false } = {}): ParamUpdates {
  switch (tool) {
    case "convert-format":
      return {
        format: formatInRoute ? null : FORMAT_EXTENSIONS[options.convert.format],
        quality: String(options.convert.quality),
      };
    case "compress-image":
      return { level: options.compress.level };
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
