import { ascii, u64be, view, writeAscii } from "@/lib/files/bytes";

export type Box = {
  type: string;
  start: number;
  typeEnd: number;
  bodyStart: number;
  end: number;
};

const XMP_UUID = "be7acfcb97a942e89c71999491e3afac";
const C2PA_UUID = "d8fec3d61b0e483c92975828877ec481";

export function readBox(bytes: Uint8Array, offset: number, limit: number, base = 0): Box | null {
  if (offset + 8 > bytes.length || offset + 8 > limit) return null;
  let size = view(bytes).getUint32(offset);
  const type = ascii(bytes, offset + 4, 4);
  let typeEnd = offset + 8;
  if (size === 1) {
    if (offset + 16 > bytes.length) return null;
    size = u64be(bytes, offset + 8);
    typeEnd = offset + 16;
  } else if (size === 0) {
    size = limit - offset;
  }
  const bodyStart = typeEnd + (type === "uuid" ? 16 : 0);
  if (size < bodyStart - offset || offset + size > limit) return null;
  return { type, start: base + offset, typeEnd: base + typeEnd, bodyStart: base + bodyStart, end: base + offset + size };
}

export function childBoxes(bytes: Uint8Array, parent: Box, skip = 0) {
  const boxes: Box[] = [];
  let offset = parent.bodyStart + skip;
  while (offset < parent.end) {
    const box = readBox(bytes, offset, parent.end);
    if (!box) break;
    boxes.push(box);
    offset = box.end;
  }
  return boxes;
}

export function rootBox(bytes: Uint8Array) {
  return readBox(bytes, 0, bytes.length);
}

export function metaChildOffset(bytes: Uint8Array, meta: Box) {
  return ascii(bytes, meta.bodyStart + 4, 4) === "hdlr" ? 0 : 4;
}

export function uuidOf(bytes: Uint8Array, box: Box) {
  return Array.from(bytes.subarray(box.typeEnd, box.typeEnd + 16), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function uuidKind(bytes: Uint8Array, box: Box): "xmp" | "c2pa" | null {
  const uuid = uuidOf(bytes, box);
  if (uuid === XMP_UUID) return "xmp";
  if (uuid === C2PA_UUID) return "c2pa";
  return null;
}

export function neutralise(bytes: Uint8Array, box: Box) {
  writeAscii(bytes, box.start + 4, "free");
  bytes.fill(0, box.typeEnd, box.end);
}

export function timeFields(bytes: Uint8Array, box: Box) {
  const version = bytes[box.bodyStart];
  const width = version === 1 ? 8 : 4;
  const creation = box.bodyStart + 4;
  return { width, creation, modification: creation + width, timescale: creation + width * 2 };
}

export function readTime(bytes: Uint8Array, offset: number, width: number) {
  return width === 8 ? u64be(bytes, offset) : view(bytes).getUint32(offset);
}

export function zeroTimes(bytes: Uint8Array, box: Box) {
  const { width, creation } = timeFields(bytes, box);
  bytes.fill(0, creation, creation + width * 2);
}
