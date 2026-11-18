import { ascii, concatBytes, view, writeAscii } from "@/lib/files/bytes";
import { crc32 } from "@/lib/files/crc32";
import { jpegHeaderSegments, pngChunks } from "@/lib/image/chunks";
import { insertPngChunks } from "@/lib/image/inject/png";
import { losslessByFormat } from "@/lib/image/lossless";

const APP0 = 0xe0;
const JFIF_LENGTH = 16;
const DOTS_PER_INCH = 1;
const PNG_UNIT_METRE = 1;
const INCHES_PER_METRE = 1 / 0.0254;

function jfifSegment(dpi: number) {
  const segment = new Uint8Array(2 + JFIF_LENGTH);
  const data = view(segment);
  segment.set([0xff, APP0]);
  data.setUint16(2, JFIF_LENGTH);
  writeAscii(segment, 4, "JFIF\0");
  segment.set([1, 2], 9);
  segment[11] = DOTS_PER_INCH;
  data.setUint16(12, dpi);
  data.setUint16(14, dpi);
  return segment;
}

function isJfif(bytes: Uint8Array, start: number, marker: number) {
  return marker === APP0 && ascii(bytes, start + 4, 5) === "JFIF\0";
}

function setJpegDensity(bytes: Uint8Array, dpi: number) {
  const jfif = [...jpegHeaderSegments(bytes)].filter((segment) => isJfif(bytes, segment.start, segment.marker));
  const parts: Uint8Array[] = [bytes.subarray(0, 2), jfifSegment(dpi)];
  let offset = 2;
  for (const segment of jfif) {
    parts.push(bytes.subarray(offset, segment.start));
    offset = segment.end;
  }
  parts.push(bytes.subarray(offset));
  return concatBytes(parts);
}

function physChunk(dpi: number) {
  const pixelsPerMetre = Math.round(dpi * INCHES_PER_METRE);
  const chunk = new Uint8Array(21);
  const data = view(chunk);
  data.setUint32(0, 9);
  writeAscii(chunk, 4, "pHYs");
  data.setUint32(8, pixelsPerMetre);
  data.setUint32(12, pixelsPerMetre);
  chunk[16] = PNG_UNIT_METRE;
  data.setUint32(17, crc32(chunk.subarray(4, 17)));
  return chunk;
}

function setPngDensity(bytes: Uint8Array, dpi: number) {
  const kept = [bytes.subarray(0, 8)];
  for (const chunk of pngChunks(bytes)) {
    if (chunk.type !== "pHYs") kept.push(bytes.subarray(chunk.start, chunk.end));
  }
  return insertPngChunks(concatBytes(kept), [physChunk(dpi)]);
}

export const setDensity = losslessByFormat<[bytes: Uint8Array, dpi: number]>({
  jpeg: setJpegDensity,
  png: setPngDensity,
});
