import "server-only";
import sharp, { type JpegOptions, type Sharp } from "sharp";
import { toOutputFormat, type OutputFormat } from "@/lib/image/formats";

export type EncodeSpeed = "fast" | "balanced" | "smallest";

export type DecodedImage = {
  data: Buffer;
  info: { width: number; height: number; channels: 1 | 2 | 3 | 4 };
};

export type EncodeSource = Buffer | DecodedImage;

export type EncodeOptions = {
  format: OutputFormat;
  quality: number;
  speed?: EncodeSpeed;
  palette?: boolean;
  paletteEffort?: number;
  transform?: (pipeline: Sharp) => Sharp;
};

type EncoderPreset = { jpeg: JpegOptions; pngLevel: number; webpEffort: number; avifEffort: number };

const SMALLEST_JPEG: JpegOptions = {
  quantisationTable: 3,
  trellisQuantisation: true,
  overshootDeringing: true,
  optimiseCoding: true,
};

const ENCODER_PRESETS: Record<EncodeSpeed, EncoderPreset> = {
  fast: { jpeg: {}, pngLevel: 6, webpEffort: 4, avifEffort: 2 },
  balanced: { jpeg: {}, pngLevel: 9, webpEffort: 4, avifEffort: 2 },
  smallest: { jpeg: SMALLEST_JPEG, pngLevel: 9, webpEffort: 4, avifEffort: 3 },
};

const DEFAULT_PALETTE_EFFORT = 10;
const PALETTE_COMPRESSION_LEVEL = 6;

function pipelineFor(source: EncodeSource) {
  if (Buffer.isBuffer(source)) return sharp(source, { animated: false }).rotate();
  return sharp(source.data, { raw: source.info });
}

export async function decode(buffer: Buffer): Promise<DecodedImage> {
  const { data, info } = await sharp(buffer, { animated: false })
    .rotate()
    .raw({ depth: "uchar" })
    .toBuffer({ resolveWithObject: true });
  return { data, info: { width: info.width, height: info.height, channels: info.channels } };
}

export async function encode(
  source: EncodeSource,
  {
    format,
    quality,
    speed = "balanced",
    palette = false,
    paletteEffort = DEFAULT_PALETTE_EFFORT,
    transform,
  }: EncodeOptions,
) {
  const oriented = pipelineFor(source);
  const pipeline = transform ? transform(oriented) : oriented;
  const preset = ENCODER_PRESETS[speed];

  switch (format) {
    case "jpeg":
      return pipeline
        .flatten({ background: "#ffffff" })
        .jpeg({ quality, ...preset.jpeg })
        .toBuffer({ resolveWithObject: true });
    case "png":
      return pipeline
        .png(
          palette
            ? { palette: true, quality, compressionLevel: PALETTE_COMPRESSION_LEVEL, effort: paletteEffort }
            : { compressionLevel: preset.pngLevel },
        )
        .toBuffer({ resolveWithObject: true });
    case "webp":
      return pipeline.webp({ quality, effort: preset.webpEffort }).toBuffer({ resolveWithObject: true });
    case "avif":
      return pipeline.avif({ quality, effort: preset.avifEffort }).toBuffer({ resolveWithObject: true });
  }
}

export async function sourceInfo(buffer: Buffer) {
  const { format, autoOrient, orientation } = await sharp(buffer).metadata();
  return {
    format: toOutputFormat(format),
    width: autoOrient.width,
    height: autoOrient.height,
    needsRotation: (orientation ?? 1) > 1,
  };
}

export function toBuffer(bytes: Uint8Array) {
  return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}
