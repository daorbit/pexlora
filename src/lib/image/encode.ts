import "server-only";
import sharp, { type Sharp } from "sharp";
import { toOutputFormat, type OutputFormat } from "@/lib/image/formats";

export type EncodeOptions = {
  format: OutputFormat;
  quality: number;
  palette?: boolean;
  paletteEffort?: number;
  transform?: (pipeline: Sharp) => Sharp;
};

const DEFAULT_PALETTE_EFFORT = 10;

export async function encode(
  buffer: Buffer,
  { format, quality, palette = false, paletteEffort = DEFAULT_PALETTE_EFFORT, transform }: EncodeOptions,
) {
  const oriented = sharp(buffer, { animated: false }).rotate();
  const pipeline = transform ? transform(oriented) : oriented;

  switch (format) {
    case "jpeg":
      return pipeline.flatten({ background: "#ffffff" }).jpeg({ quality, mozjpeg: true }).toBuffer({ resolveWithObject: true });
    case "png":
      return pipeline
        .png(palette ? { palette: true, quality, compressionLevel: 9, effort: paletteEffort } : { compressionLevel: 9 })
        .toBuffer({ resolveWithObject: true });
    case "webp":
      return pipeline.webp({ quality, effort: 6 }).toBuffer({ resolveWithObject: true });
    case "avif":
      return pipeline.avif({ quality }).toBuffer({ resolveWithObject: true });
  }
}

export async function sourceInfo(buffer: Buffer) {
  const { format, autoOrient } = await sharp(buffer).metadata();
  return { format: toOutputFormat(format), width: autoOrient.width, height: autoOrient.height };
}
