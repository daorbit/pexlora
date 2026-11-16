import { concatBytes } from "@/lib/files/bytes";
import { pngChunks, sliceChunks } from "@/lib/image/chunks";

const METADATA_CHUNKS = new Set(["eXIf", "iTXt", "zTXt", "tEXt"]);

export function injectPng(target: Uint8Array, carrier: Uint8Array) {
  const metadata = sliceChunks(
    carrier,
    [...pngChunks(carrier)].filter((chunk) => METADATA_CHUNKS.has(chunk.type)),
  );
  const header = pngChunks(target).next().value;
  if (header?.type !== "IHDR") throw new Error("PNG does not start with IHDR");
  return concatBytes([target.subarray(0, header.end), ...metadata, target.subarray(header.end)]);
}
