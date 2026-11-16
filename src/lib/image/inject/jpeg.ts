import { concatBytes } from "@/lib/files/bytes";
import { jpegHeaderSegments, sliceChunks } from "@/lib/image/chunks";

const APP0 = 0xe0;
const APP1 = 0xe1;

export function injectJpeg(target: Uint8Array, carrier: Uint8Array) {
  const metadata = sliceChunks(
    carrier,
    [...jpegHeaderSegments(carrier)].filter((segment) => segment.marker === APP1),
  );
  const first = jpegHeaderSegments(target).next().value;
  const insertAt = first?.marker === APP0 ? first.end : 2;
  return concatBytes([target.subarray(0, insertAt), ...metadata, target.subarray(insertAt)]);
}
