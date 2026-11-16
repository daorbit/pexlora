import { view, writeAscii } from "@/lib/files/bytes";
import type { Chunk } from "@/lib/image/chunks";

export const VP8X_FLAGS = { icc: 0x20, alpha: 0x10, exif: 0x08, xmp: 0x04, animation: 0x02 } as const;

type Canvas = { width: number; height: number; alpha: boolean };

const VP8L_SIGNATURE = 0x2f;

function readCanvas(bytes: Uint8Array, chunk: Chunk): Canvas {
  const data = view(bytes);
  const payload = chunk.start + 8;

  if (chunk.type === "VP8L") {
    if (bytes[payload] !== VP8L_SIGNATURE) throw new Error("Invalid VP8L header");
    const bits = data.getUint32(payload + 1, true);
    return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1, alpha: Boolean((bits >>> 28) & 1) };
  }

  if (chunk.type === "VP8 ") {
    if (bytes[payload + 3] !== 0x9d || bytes[payload + 4] !== 0x01 || bytes[payload + 5] !== 0x2a) {
      throw new Error("Invalid VP8 header");
    }
    return {
      width: data.getUint16(payload + 6, true) & 0x3fff,
      height: data.getUint16(payload + 8, true) & 0x3fff,
      alpha: false,
    };
  }

  throw new Error(`Unexpected WebP image chunk ${chunk.type}`);
}

function readUint24(bytes: Uint8Array, offset: number) {
  return bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16);
}

export function webpSize(bytes: Uint8Array, first: Chunk) {
  if (first.type === "VP8X") {
    return { width: readUint24(bytes, first.start + 12) + 1, height: readUint24(bytes, first.start + 15) + 1 };
  }
  const { width, height } = readCanvas(bytes, first);
  return { width, height };
}

function writeUint24(bytes: Uint8Array, offset: number, value: number) {
  bytes[offset] = value & 0xff;
  bytes[offset + 1] = (value >> 8) & 0xff;
  bytes[offset + 2] = (value >> 16) & 0xff;
}

export function createVp8x(bytes: Uint8Array, imageChunk: Chunk) {
  const { width, height, alpha } = readCanvas(bytes, imageChunk);
  const header = new Uint8Array(18);
  writeAscii(header, 0, "VP8X");
  view(header).setUint32(4, 10, true);
  header[8] = alpha ? VP8X_FLAGS.alpha : 0;
  writeUint24(header, 12, width - 1);
  writeUint24(header, 15, height - 1);
  return header;
}
