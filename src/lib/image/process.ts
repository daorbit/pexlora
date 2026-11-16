import "server-only";
import sharp, { type ResizeOptions as SharpResizeOptions, type Sharp } from "sharp";
import { MAX_RESIZE_DIMENSION } from "@/config/limits";
import { DEFAULT_QUALITY, toOutputFormat, type OutputFormat } from "@/lib/image/formats";
import { buildExif, buildXmp } from "@/lib/image/metadata-writer";
import {
  COMPRESSION_QUALITY,
  type CompressionLevel,
  type MetadataFields,
  type ResizeOptions,
} from "@/lib/image/options";

const LOSSLESS_QUALITY = 95;

type EncodeOptions = {
  format: OutputFormat;
  quality: number;
  palette?: boolean;
  transform?: (pipeline: Sharp) => Sharp;
};

async function encode(buffer: Buffer, { format, quality, palette = false, transform }: EncodeOptions) {
  const oriented = sharp(buffer, { animated: false }).rotate();
  const pipeline = transform ? transform(oriented) : oriented;

  switch (format) {
    case "jpeg":
      return pipeline.flatten({ background: "#ffffff" }).jpeg({ quality, mozjpeg: true }).toBuffer({ resolveWithObject: true });
    case "png":
      return pipeline
        .png(palette ? { palette: true, quality, compressionLevel: 9, effort: 10 } : { compressionLevel: 9 })
        .toBuffer({ resolveWithObject: true });
    case "webp":
      return pipeline.webp({ quality, effort: 6 }).toBuffer({ resolveWithObject: true });
    case "avif":
      return pipeline.avif({ quality }).toBuffer({ resolveWithObject: true });
  }
}

async function sourceInfo(buffer: Buffer) {
  const { format, autoOrient } = await sharp(buffer).metadata();
  return { format: toOutputFormat(format), width: autoOrient.width, height: autoOrient.height };
}

export async function stripMetadata(buffer: Buffer) {
  const { format } = await sourceInfo(buffer);
  const { data } = await encode(buffer, { format, quality: LOSSLESS_QUALITY });
  return { buffer: data, format };
}

export async function convertImage(buffer: Buffer, format: OutputFormat, quality: number) {
  const { data } = await encode(buffer, { format, quality });
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
