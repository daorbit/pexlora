import { decodeText, readBytes, view } from "@/lib/files/bytes";

export const EBML_IDS = {
  header: 0x1a45dfa3,
  segment: 0x18538067,
  seekHead: 0x114d9b74,
  seek: 0x4dbb,
  seekId: 0x53ab,
  seekPosition: 0x53ac,
  info: 0x1549a966,
  title: 0x7ba9,
  muxingApp: 0x4d80,
  writingApp: 0x5741,
  dateUtc: 0x4461,
  duration: 0x4489,
  timestampScale: 0x2ad7b1,
  tracks: 0x1654ae6b,
  trackEntry: 0xae,
  trackName: 0x536e,
  video: 0xe0,
  pixelWidth: 0xb0,
  pixelHeight: 0xba,
  cluster: 0x1f43b675,
  tags: 0x1254c367,
  tag: 0x7373,
  simpleTag: 0x67c8,
  tagName: 0x45a3,
  tagString: 0x4487,
  tagBinary: 0x4485,
  attachments: 0x1941a469,
  attachedFile: 0x61a7,
  fileName: 0x466e,
  fileMimeType: 0x4660,
  fileData: 0x465c,
  void: 0xec,
} as const;

export type EbmlElement = {
  id: number;
  start: number;
  dataStart: number;
  end: number | null;
};

const MAX_HEADER = 12;

function vintLength(first: number) {
  for (let index = 0; index < 8; index += 1) if (first & (0x80 >> index)) return index + 1;
  return 0;
}

export function readElement(bytes: Uint8Array, offset: number, base = 0): EbmlElement | null {
  const idLength = vintLength(bytes[offset]);
  if (!idLength || idLength > 4 || offset + idLength >= bytes.length) return null;
  let id = 0;
  for (let index = 0; index < idLength; index += 1) id = id * 256 + bytes[offset + index];

  const sizeOffset = offset + idLength;
  const sizeLength = vintLength(bytes[sizeOffset]);
  if (!sizeLength || sizeOffset + sizeLength > bytes.length) return null;
  let size = bytes[sizeOffset] & (0xff >> sizeLength);
  let unknown = size === 0xff >> sizeLength;
  for (let index = 1; index < sizeLength; index += 1) {
    const byte = bytes[sizeOffset + index];
    size = size * 256 + byte;
    unknown &&= byte === 0xff;
  }

  const dataStart = base + sizeOffset + sizeLength;
  return { id, start: base + offset, dataStart, end: unknown ? null : dataStart + size };
}

export async function readElementAt(file: Blob, offset: number) {
  return readElement(await readBytes(file, offset, offset + MAX_HEADER), 0, offset);
}

export function childElements(bytes: Uint8Array, parent: { dataStart: number; end: number | null }, base = 0) {
  const elements: EbmlElement[] = [];
  const limit = parent.end === null ? bytes.length + base : parent.end;
  let offset = parent.dataStart;
  while (offset < limit) {
    const element = readElement(bytes, offset - base, base);
    if (!element) break;
    const end = element.end === null ? limit : Math.min(element.end, limit);
    elements.push({ ...element, end });
    offset = end;
  }
  return elements;
}

export function elementBytes(bytes: Uint8Array, element: EbmlElement, base = 0) {
  return bytes.subarray(element.dataStart - base, (element.end ?? bytes.length + base) - base);
}

export function elementText(bytes: Uint8Array, element: EbmlElement, base = 0) {
  return decodeText(elementBytes(bytes, element, base));
}

export function elementUint(bytes: Uint8Array, element: EbmlElement, base = 0) {
  return elementBytes(bytes, element, base).reduce((value, byte) => value * 256 + byte, 0);
}

export function elementFloat(bytes: Uint8Array, element: EbmlElement, base = 0) {
  const data = elementBytes(bytes, element, base);
  if (data.length === 4) return view(data).getFloat32(0);
  if (data.length === 8) return view(data).getFloat64(0);
  return 0;
}

export function elementDate(bytes: Uint8Array, element: EbmlElement, base = 0) {
  const data = elementBytes(bytes, element, base);
  if (data.length !== 8) return null;
  const nanoseconds = view(data).getBigInt64(0);
  return new Date(Date.UTC(2001, 0, 1) + Number(nanoseconds / BigInt(1_000_000))).toISOString();
}

export function voidElement(length: number) {
  const output = new Uint8Array(length);
  output[0] = EBML_IDS.void;
  const sizeLength = Math.min(8, length - 1);
  let value = length - 1 - sizeLength;
  for (let index = sizeLength; index >= 1; index -= 1) {
    output[index] = value % 256;
    value = Math.floor(value / 256);
  }
  output[1] |= 0x80 >> (sizeLength - 1);
  return output;
}
