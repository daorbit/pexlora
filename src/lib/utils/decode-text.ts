function hasBom(bytes: Uint8Array, ...marker: number[]) {
  return marker.every((byte, index) => bytes[index] === byte);
}

export function decodeText(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  if (hasBom(bytes, 0xff, 0xfe)) return new TextDecoder("utf-16le").decode(bytes.subarray(2));
  if (hasBom(bytes, 0xfe, 0xff)) return new TextDecoder("utf-16be").decode(bytes.subarray(2));
  const body = hasBom(bytes, 0xef, 0xbb, 0xbf) ? bytes.subarray(3) : bytes;
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(body);
  } catch {
    return new TextDecoder("windows-1252").decode(body);
  }
}

export const UTF8_BOM = "﻿";
