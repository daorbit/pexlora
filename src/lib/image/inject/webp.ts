import { ascii } from "@/lib/files/bytes";
import { buildWebp, sliceChunks, webpChunks } from "@/lib/image/chunks";
import { createVp8x, VP8X_FLAGS } from "@/lib/image/webp-canvas";

const METADATA_FLAGS: Record<string, number> = { EXIF: VP8X_FLAGS.exif, "XMP ": VP8X_FLAGS.xmp };

export function insertWebpChunks(target: Uint8Array, chunks: Uint8Array[]) {
  const [first, ...rest] = [...webpChunks(target)];
  if (!first) throw new Error("WebP has no chunks");

  const hasHeader = first.type === "VP8X";
  const header = hasHeader ? target.slice(first.start, first.end) : createVp8x(target, first);
  header[8] |= chunks.reduce((flags, chunk) => flags | (METADATA_FLAGS[ascii(chunk, 0, 4)] ?? 0), 0);

  const body = sliceChunks(target, hasHeader ? rest : [first, ...rest]);
  return buildWebp([header, ...body, ...chunks]);
}

export function injectWebp(target: Uint8Array, carrier: Uint8Array) {
  const carried = [...webpChunks(carrier)].filter((chunk) => chunk.type in METADATA_FLAGS);
  return insertWebpChunks(target, sliceChunks(carrier, carried));
}
