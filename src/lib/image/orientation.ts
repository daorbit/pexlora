import { concatBytes, view, writeAscii } from "@/lib/files/bytes";
import { crc32 } from "@/lib/files/crc32";
import { insertJpegSegments } from "@/lib/image/inject/jpeg";
import { insertPngChunks } from "@/lib/image/inject/png";
import { insertWebpChunks } from "@/lib/image/inject/webp";
import { losslessByFormat } from "@/lib/image/lossless";

const ORIENTATION_TAG = 0x0112;
const SHORT = 3;

function orientationTiff(orientation: number) {
  const tiff = new Uint8Array(26);
  const data = view(tiff);
  writeAscii(tiff, 0, "MM");
  data.setUint16(2, 42);
  data.setUint32(4, 8);
  data.setUint16(8, 1);
  data.setUint16(10, ORIENTATION_TAG);
  data.setUint16(12, SHORT);
  data.setUint32(14, 1);
  data.setUint16(18, orientation);
  data.setUint32(22, 0);
  return tiff;
}

function jpegSegment(tiff: Uint8Array) {
  const header = new Uint8Array(10);
  header.set([0xff, 0xe1]);
  view(header).setUint16(2, 2 + 6 + tiff.length);
  writeAscii(header, 4, "Exif\0\0");
  return concatBytes([header, tiff]);
}

function pngChunk(tiff: Uint8Array) {
  const head = new Uint8Array(8);
  view(head).setUint32(0, tiff.length);
  writeAscii(head, 4, "eXIf");
  const crc = new Uint8Array(4);
  view(crc).setUint32(0, crc32(head.subarray(4), tiff));
  return concatBytes([head, tiff, crc]);
}

function webpChunk(tiff: Uint8Array) {
  const head = new Uint8Array(8);
  writeAscii(head, 0, "EXIF");
  view(head).setUint32(4, tiff.length, true);
  return concatBytes([head, tiff, new Uint8Array(tiff.length % 2)]);
}

export const keepOrientation = losslessByFormat<[bytes: Uint8Array, orientation: number]>({
  jpeg: (bytes, orientation) => insertJpegSegments(bytes, [jpegSegment(orientationTiff(orientation))]),
  png: (bytes, orientation) => insertPngChunks(bytes, [pngChunk(orientationTiff(orientation))]),
  webp: (bytes, orientation) => insertWebpChunks(bytes, [webpChunk(orientationTiff(orientation))]),
});
