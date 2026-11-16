import { ascii, concatBytes, view, writeAscii } from "@/lib/files/bytes";

export type Chunk = { type: string; start: number; end: number };
export type JpegSegment = { marker: number; start: number; end: number };

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPEG_SOI = 0xd8;
const JPEG_EOI = 0xd9;
const JPEG_SOS = 0xda;

export function* pngChunks(bytes: Uint8Array): Generator<Chunk> {
  if (!PNG_SIGNATURE.every((byte, index) => bytes[index] === byte)) throw new Error("Not a PNG");
  const data = view(bytes);
  let offset = PNG_SIGNATURE.length;

  while (offset + 8 <= bytes.length) {
    const end = offset + 12 + data.getUint32(offset);
    if (end > bytes.length) throw new Error("Truncated PNG chunk");
    yield { type: ascii(bytes, offset + 4, 4), start: offset, end };
    offset = end;
  }
}

export function* webpChunks(bytes: Uint8Array): Generator<Chunk> {
  if (ascii(bytes, 0, 4) !== "RIFF" || ascii(bytes, 8, 4) !== "WEBP") throw new Error("Not a WebP");
  const data = view(bytes);
  const riffEnd = Math.min(bytes.length, 8 + data.getUint32(4, true));
  let offset = 12;

  while (offset + 8 <= riffEnd) {
    const size = data.getUint32(offset + 4, true);
    const end = offset + 8 + size + (size % 2);
    if (end > riffEnd) throw new Error("Truncated WebP chunk");
    yield { type: ascii(bytes, offset, 4), start: offset, end };
    offset = end;
  }
}

export function* jpegHeaderSegments(bytes: Uint8Array): Generator<JpegSegment> {
  if (bytes[0] !== 0xff || bytes[1] !== JPEG_SOI) throw new Error("Not a JPEG");
  const data = view(bytes);
  let offset = 2;

  while (offset + 4 <= bytes.length && bytes[offset] === 0xff) {
    const marker = bytes[offset + 1];
    if (marker === JPEG_SOS || marker === JPEG_EOI) return;
    const end = offset + 2 + data.getUint16(offset + 2);
    if (end > bytes.length) throw new Error("Truncated JPEG segment");
    yield { marker, start: offset, end };
    offset = end;
  }
}

export function sliceChunks(bytes: Uint8Array, chunks: Iterable<{ start: number; end: number }>) {
  return Array.from(chunks, (chunk) => bytes.subarray(chunk.start, chunk.end));
}

export function buildWebp(chunks: Uint8Array[]) {
  const header = new Uint8Array(12);
  writeAscii(header, 0, "RIFF");
  view(header).setUint32(4, 4 + chunks.reduce((total, chunk) => total + chunk.length, 0), true);
  writeAscii(header, 8, "WEBP");
  return concatBytes([header, ...chunks]);
}
