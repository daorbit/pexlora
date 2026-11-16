import "server-only";
import sharp from "sharp";
import { toOutputFormat, type OutputFormat } from "@/lib/image/formats";

const LOSSLESS_QUALITY = 95;

function encode(buffer: Buffer, format: OutputFormat, quality: number) {
  const pipeline = sharp(buffer, { animated: false }).rotate();

  switch (format) {
    case "jpeg":
      return pipeline.flatten({ background: "#ffffff" }).jpeg({ quality, mozjpeg: true }).toBuffer();
    case "png":
      return pipeline.png({ compressionLevel: 9 }).toBuffer();
    case "webp":
      return pipeline.webp({ quality }).toBuffer();
    case "avif":
      return pipeline.avif({ quality }).toBuffer();
  }
}

export async function stripMetadata(buffer: Buffer) {
  const { format } = await sharp(buffer).metadata();
  const outputFormat = toOutputFormat(format);
  const output = await encode(buffer, outputFormat, LOSSLESS_QUALITY);
  return { buffer: output, format: outputFormat };
}

export async function convertImage(buffer: Buffer, format: OutputFormat, quality: number) {
  const output = await encode(buffer, format, quality);
  return { buffer: output, format };
}
