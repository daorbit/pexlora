import "server-only";
import type { ResizeOptions as SharpResizeOptions } from "sharp";
import { MAX_RESIZE_DIMENSION } from "@/config/limits";
import { encode, sourceInfo } from "@/lib/image/encode";
import { CONVERT_QUALITY, DEFAULT_QUALITY, type OutputFormat } from "@/lib/image/formats";
import { buildExif, buildXmp } from "@/lib/image/metadata-writer";
import {
  COMPRESSION_QUALITY,
  type CompressionLevel,
  type MetadataFields,
  type ResizeOptions,
} from "@/lib/image/options";

const LOSSLESS_QUALITY = 95;

export async function stripMetadata(buffer: Buffer) {
  const { format } = await sourceInfo(buffer);
  const { data } = await encode(buffer, { format, quality: LOSSLESS_QUALITY });
  return { buffer: data, format };
}

export async function convertImage(buffer: Buffer, format: OutputFormat) {
  const { data } = await encode(buffer, { format, quality: CONVERT_QUALITY });
  return { buffer: data, format };
}

export async function compressImage(buffer: Buffer, level: CompressionLevel) {
  const { format } = await sourceInfo(buffer);
  const { data } = await encode(buffer, { format, quality: COMPRESSION_QUALITY[level], palette: true });
  return { buffer: data, format };
}

export async function writeMetadata(buffer: Buffer, fields: MetadataFields) {
  const { format } = await sourceInfo(buffer);
  const { data } = await encode(buffer, {
    format,
    quality: LOSSLESS_QUALITY,
    transform: (pipeline) => pipeline.withExif(buildExif(fields)).withXmp(buildXmp(fields)),
  });
  return { buffer: data, format };
}

function resizeTarget(options: ResizeOptions, width: number, height: number): SharpResizeOptions {
  if (options.mode === "percent") {
    const scale = Math.min(options.percent / 100, MAX_RESIZE_DIMENSION / width, MAX_RESIZE_DIMENSION / height);
    return {
      width: Math.max(1, Math.round(width * scale)),
      height: Math.max(1, Math.round(height * scale)),
      fit: "fill",
    };
  }

  return {
    width: options.width ?? undefined,
    height: options.height ?? undefined,
    fit: options.keepAspect ? "inside" : "fill",
  };
}

export async function resizeImage(buffer: Buffer, options: ResizeOptions) {
  const source = await sourceInfo(buffer);
  const target = resizeTarget(options, source.width, source.height);
  const { data, info } = await encode(buffer, {
    format: source.format,
    quality: DEFAULT_QUALITY,
    transform: (pipeline) => pipeline.resize(target),
  });
  return { buffer: data, format: source.format, width: info.width, height: info.height };
}
