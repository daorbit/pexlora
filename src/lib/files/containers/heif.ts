import { ascii, decodeText, view, writeAscii } from "@/lib/files/bytes";
import { childBoxes, neutralise, readBox, uuidKind, type Box } from "@/lib/files/containers/bmff";

export type HeifItem = { id: number; type: string; contentType: string; typeOffset: number };
type Extent = { offset: number; length: number };

const METADATA_ITEM_TYPES = new Set(["Exif"]);
const XMP_CONTENT = /xmp|rdf\+xml/i;
const HIDDEN_ITEM_TYPE = "hidn";

function readUint(bytes: Uint8Array, offset: number, size: number) {
  const data = view(bytes);
  if (size === 0) return 0;
  if (size === 2) return data.getUint16(offset);
  if (size === 4) return data.getUint32(offset);
  if (size === 8) return Number(data.getBigUint64(offset));
  throw new Error(`Unsupported field size ${size}`);
}

export function topBoxes(bytes: Uint8Array) {
  const boxes: Box[] = [];
  let offset = 0;
  while (offset + 8 <= bytes.length) {
    const box = readBox(bytes, offset, bytes.length);
    if (!box) break;
    boxes.push(box);
    offset = box.end;
  }
  if (boxes[0]?.type !== "ftyp") throw new Error("Not a HEIF file");
  return boxes;
}

function metaChildren(bytes: Uint8Array, boxes: Box[]) {
  const meta = boxes.find((box) => box.type === "meta");
  if (!meta) throw new Error("HEIF file has no meta box");
  return childBoxes(bytes, meta, 4);
}

function readItems(bytes: Uint8Array, iinf: Box): HeifItem[] {
  const version = bytes[iinf.bodyStart];
  const skip = 4 + (version === 0 ? 2 : 4);
  return childBoxes(bytes, iinf, skip)
    .filter((box) => box.type === "infe" && bytes[box.bodyStart] >= 2)
    .map((infe) => {
      const idSize = bytes[infe.bodyStart] === 2 ? 2 : 4;
      const idOffset = infe.bodyStart + 4;
      const typeOffset = idOffset + idSize + 2;
      const type = ascii(bytes, typeOffset, 4);
      const nameEnd = bytes.indexOf(0, typeOffset + 4);
      const contentStart = nameEnd + 1;
      const contentEnd = bytes.indexOf(0, contentStart);
      const contentType =
        type === "mime" && nameEnd !== -1 && contentEnd > contentStart && contentEnd <= infe.end
          ? decodeText(bytes.subarray(contentStart, contentEnd))
          : "";
      return { id: readUint(bytes, idOffset, idSize), type, contentType, typeOffset };
    });
}

function readLocations(bytes: Uint8Array, iloc: Box, idat: Box | undefined) {
  const version = bytes[iloc.bodyStart];
  let offset = iloc.bodyStart + 4;
  const sizes = (bytes[offset] << 8) | bytes[offset + 1];
  const offsetSize = sizes >> 12;
  const lengthSize = (sizes >> 8) & 0xf;
  const baseOffsetSize = (sizes >> 4) & 0xf;
  const indexSize = version > 0 ? sizes & 0xf : 0;
  offset += 2;

  const countSize = version < 2 ? 2 : 4;
  const itemCount = readUint(bytes, offset, countSize);
  offset += countSize;

  const locations = new Map<number, Extent[]>();
  for (let item = 0; item < itemCount; item += 1) {
    const id = readUint(bytes, offset, countSize);
    offset += countSize;
    const method = version > 0 ? bytes[offset + 1] & 0xf : 0;
    if (version > 0) offset += 2;
    offset += 2;
    const base = readUint(bytes, offset, baseOffsetSize);
    offset += baseOffsetSize;
    const extentCount = readUint(bytes, offset, 2);
    offset += 2;

    const origin = method === 1 ? (idat?.bodyStart ?? 0) : 0;
    const extents: Extent[] = [];
    for (let index = 0; index < extentCount; index += 1) {
      offset += indexSize;
      const extentOffset = readUint(bytes, offset, offsetSize);
      offset += offsetSize;
      const length = readUint(bytes, offset, lengthSize);
      offset += lengthSize;
      if (method <= 1) extents.push({ offset: origin + base + extentOffset, length });
    }
    locations.set(id, extents);
  }
  return locations;
}

function isMetadataItem(item: HeifItem) {
  return METADATA_ITEM_TYPES.has(item.type) || (item.type === "mime" && XMP_CONTENT.test(item.contentType));
}

export function heifSize(bytes: Uint8Array) {
  const children = metaChildren(bytes, topBoxes(bytes));
  const iprp = children.find((box) => box.type === "iprp");
  const ipco = iprp && childBoxes(bytes, iprp).find((box) => box.type === "ipco");
  const ispe = ipco && childBoxes(bytes, ipco).find((box) => box.type === "ispe");
  if (!ispe) return undefined;
  return { width: view(bytes).getUint32(ispe.bodyStart + 4), height: view(bytes).getUint32(ispe.bodyStart + 8) };
}

export function heifHasColorProfile(bytes: Uint8Array) {
  const children = metaChildren(bytes, topBoxes(bytes));
  const iprp = children.find((box) => box.type === "iprp");
  const ipco = iprp && childBoxes(bytes, iprp).find((box) => box.type === "ipco");
  return Boolean(
    ipco &&
      childBoxes(bytes, ipco).some((box) => box.type === "colr" && ["prof", "rICC"].includes(ascii(bytes, box.bodyStart, 4))),
  );
}

export function cleanHeif(source: Uint8Array) {
  const bytes = source.slice();
  const boxes = topBoxes(bytes);
  const children = metaChildren(bytes, boxes);
  const iinf = children.find((box) => box.type === "iinf");
  const iloc = children.find((box) => box.type === "iloc");
  if (!iinf || !iloc) throw new Error("HEIF file has no item tables");

  const locations = readLocations(bytes, iloc, children.find((box) => box.type === "idat"));
  for (const item of readItems(bytes, iinf).filter(isMetadataItem)) {
    for (const extent of locations.get(item.id) ?? []) {
      if (extent.length > 0 && extent.offset + extent.length <= bytes.length) {
        bytes.fill(0, extent.offset, extent.offset + extent.length);
      }
    }
    writeAscii(bytes, item.typeOffset, HIDDEN_ITEM_TYPE);
  }

  boxes.filter((top) => top.type === "uuid" && uuidKind(bytes, top) !== null).forEach((box) => neutralise(bytes, box));

  return bytes;
}
