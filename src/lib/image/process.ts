import "server-only";
import type { ResizeOptions as SharpResizeOptions } from "sharp";
import { MAX_RESIZE_DIMENSION } from "@/config/limits";
import { encode, sourceInfo, toBuffer } from "@/lib/image/encode";
import { CONVERT_QUALITY, DEFAULT_QUALITY, type OutputFormat } from "@/lib/image/formats";
import { injectMetadata } from "@/lib/image/inject";
import { metadataCarrier, withMetadataFields } from "@/lib/image/metadata-writer";
import {
  COMPRESSION_QUALITY,
  type CompressionLevel,
  type MetadataFields,
  type ResizeOptions,
} from "@/lib/image/options";
import { stripLossless } from "@/lib/image/strip";

const LOSSLESS_QUALITY = 95;

async function losslessStrip(buffer: Buffer) {
  const { format, needsRotation } = await sourceInfo(buffer);
  return { format, stripped: needsRotation ? null : stripLossless(format, buffer) };
}

export async function stripMetadata(buffer: Buffer) {
  const { format, stripped } = await losslessStrip(buffer);
  if (stripped) return { buffer: toBuffer(stripped), format };

  const { data } = await encode(buffer, { format, quality: LOSSLESS_QUALITY, speed: "fast" });
  return { buffer: data, format };
}

export async function convertImage(buffer: Buffer, format: OutputFormat) {
  const { data } = await encode(buffer, { format, quality: CONVERT_QUALITY });
  return { buffer: data, format };
}

export async function compressImage(buffer: Buffer, level: CompressionLevel) {
  const { format } = await sourceInfo(buffer);
  const { data } = await encode(buffer, {
    format,
    quality: COMPRESSION_QUALITY[level],
    speed: "smallest",
    palette: true,
  });
  return { buffer: data, format };
}

export async function writeMetadata(buffer: Buffer, fields: MetadataFields) {
  const { format, stripped } = await losslessStrip(buffer);
  const written = stripped && injectMetadata(format, stripped, await metadataCarrier(format, fields));
  if (written) return { buffer: toBuffer(written), format };

  const { data } = await encode(buffer, {
    format,
    quality: LOSSLESS_QUALITY,
    speed: "fast",
    transform: (pipeline) => withMetadataFields(pipeline, fields),
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
