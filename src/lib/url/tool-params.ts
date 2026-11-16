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

function unlessDefault<T>(value: T, fallback: T, encode: (value: T) => string = String) {
  return value === fallback ? null : encode(value);
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
      const mode = params.get("mode") === "size" ? "dimensions" : base.resize.mode;
      return {
        ...base,
        resize: {
          mode,
          percent: readInt(params, "scale", RESIZE_PERCENT_RANGE.min, RESIZE_PERCENT_RANGE.max) ?? base.resize.percent,
          width: readInt(params, "width", 1, MAX_RESIZE_DIMENSION) ?? base.resize.width,
          height: readInt(params, "height", 1, MAX_RESIZE_DIMENSION) ?? base.resize.height,
          keepAspect: params.get("ratio") === "free" ? false : base.resize.keepAspect,
        },
      };
    }
    default:
      return base;
  }
}

export function optionsToParams(tool: WorkspaceToolSlug, options: ToolOptions, base: ToolOptions): ParamUpdates {
  switch (tool) {
    case "convert-format":
      return {
        format: unlessDefault(options.convert.format, base.convert.format, (format) => FORMAT_EXTENSIONS[format]),
        quality: unlessDefault(options.convert.quality, base.convert.quality),
      };
    case "compress-image":
      return { level: unlessDefault(options.compress.level, base.compress.level) };
    case "resize-image": {
      const { resize } = options;
      const bySize = resize.mode === "dimensions";
      return {
        mode: bySize ? "size" : null,
        scale: bySize ? null : unlessDefault(resize.percent, base.resize.percent),
        width: bySize && resize.width !== null ? String(resize.width) : null,
        height: bySize && resize.height !== null ? String(resize.height) : null,
        ratio: bySize && !resize.keepAspect ? "free" : null,
      };
    }
    default:
      return {};
  }
}
