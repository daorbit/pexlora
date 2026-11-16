import { concatBytes } from "@/lib/files/bytes";
import { pngChunks } from "@/lib/image/chunks";

const KEPT_CHUNKS = new Set([
  "IHDR",
  "PLTE",
  "IDAT",
  "IEND",
  "tRNS",
  "cHRM",
  "gAMA",
  "iCCP",
  "sBIT",
  "sRGB",
  "cICP",
  "mDCV",
  "cLLI",
  "bKGD",
  "pHYs",
  "acTL",
  "fcTL",
  "fdAT",
]);

export function stripPng(bytes: Uint8Array) {
  const parts: Uint8Array[] = [bytes.subarray(0, 8)];

  for (const chunk of pngChunks(bytes)) {
    if (KEPT_CHUNKS.has(chunk.type)) parts.push(bytes.subarray(chunk.start, chunk.end));
    if (chunk.type === "IEND") return concatBytes(parts);
  }

  throw new Error("PNG has no IEND chunk");
}
