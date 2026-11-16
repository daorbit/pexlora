import { ascii, concatBytes, view } from "@/lib/files/bytes";

const SOI = 0xd8;
const EOI = 0xd9;
const SOS = 0xda;
const APP0 = 0xe0;
const APP2 = 0xe2;
const APP14 = 0xee;
const STANDALONE = new Set([0x01, 0xd0, 0xd1, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7]);

function isKeptSegment(marker: number, payload: Uint8Array) {
  if (marker === APP0) return ascii(payload, 0, 5) === "JFIF\0" && payload[12] === 0 && payload[13] === 0;
  if (marker === APP2) return ascii(payload, 0, 12) === "ICC_PROFILE\0";
  if (marker === APP14) return ascii(payload, 0, 5) === "Adobe";
  if (marker >= 0xe0 && marker <= 0xef) return false;
  return marker !== 0xfe;
}

function scanEnd(bytes: Uint8Array, from: number) {
  let offset = from;
  while (offset + 1 < bytes.length) {
    if (bytes[offset] === 0xff) {
      const next = bytes[offset + 1];
      if (next !== 0x00 && next !== 0xff && !STANDALONE.has(next)) return offset;
    }
    offset += 1;
  }
  throw new Error("JPEG scan has no end marker");
}

export function stripJpeg(bytes: Uint8Array) {
  if (bytes[0] !== 0xff || bytes[1] !== SOI) throw new Error("Not a JPEG");

  const parts: Uint8Array[] = [bytes.subarray(0, 2)];
  let offset = 2;

  while (offset + 1 < bytes.length) {
    if (bytes[offset] !== 0xff) throw new Error("Invalid JPEG marker");
    const marker = bytes[offset + 1];
    if (marker === 0xff) {
      offset += 1;
      continue;
    }
    if (marker === EOI) {
      parts.push(bytes.subarray(offset, offset + 2));
      return concatBytes(parts);
    }
    if (STANDALONE.has(marker)) {
      parts.push(bytes.subarray(offset, offset + 2));
      offset += 2;
      continue;
    }

    const length = view(bytes).getUint16(offset + 2);
    const end = offset + 2 + length;
    if (end > bytes.length) throw new Error("Truncated JPEG segment");

    if (marker === SOS) {
      const scanStop = scanEnd(bytes, end);
      parts.push(bytes.subarray(offset, scanStop));
      offset = scanStop;
      continue;
    }

    if (isKeptSegment(marker, bytes.subarray(offset + 4, end))) parts.push(bytes.subarray(offset, end));
    offset = end;
  }

  throw new Error("JPEG has no end marker");
}
