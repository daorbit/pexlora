import { buildWebp, webpChunks } from "@/lib/image/chunks";
import { VP8X_FLAGS } from "@/lib/image/webp-canvas";

const KEPT_CHUNKS = new Set(["VP8X", "VP8 ", "VP8L", "ALPH", "ICCP", "ANIM", "ANMF"]);

export function stripWebp(bytes: Uint8Array) {
  const parts: Uint8Array[] = [];

  for (const chunk of webpChunks(bytes)) {
    if (chunk.type === "VP8X") {
      const header = bytes.slice(chunk.start, chunk.end);
      header[8] &= ~(VP8X_FLAGS.exif | VP8X_FLAGS.xmp);
      parts.push(header);
    } else if (KEPT_CHUNKS.has(chunk.type)) {
      parts.push(bytes.subarray(chunk.start, chunk.end));
    }
  }

  return buildWebp(parts);
}
