import { containsAscii, decodeText, indexOfBytes, view } from "@/lib/files/bytes";

export type C2paSummary = {
  generator: string | null;
  sourceType: string | null;
  actions: string[];
  organizations: string[];
};

const encoder = new TextEncoder();
const MAX_TEXT = 300;
const NAME_WINDOW = 160;
const MAX_ORGANIZATIONS = 3;
const ORGANIZATION_OID = new Uint8Array([0x06, 0x03, 0x55, 0x04, 0x0a]);
const DER_STRING_TYPES = new Set([0x0c, 0x13, 0x14, 0x16, 0x1e]);
const ACTIONS = ["created", "opened", "edited", "placed", "cropped", "resized", "color_adjustments", "filtered", "converted", "drawing", "transcoded", "published"];

function cborTextAt(bytes: Uint8Array, offset: number) {
  const head = bytes[offset];
  if (head === undefined || head >> 5 !== 3) return null;
  const info = head & 0x1f;
  let length = info;
  let start = offset + 1;
  if (info === 24) {
    length = bytes[offset + 1];
    start = offset + 2;
  } else if (info === 25) {
    length = view(bytes).getUint16(offset + 1);
    start = offset + 3;
  } else if (info > 25) {
    return null;
  }
  if (start + length > bytes.length) return null;
  return decodeText(bytes.subarray(start, start + Math.min(length, MAX_TEXT))).trim() || null;
}

function textAfterKey(bytes: Uint8Array, key: string, from = 0) {
  const needle = encoder.encode(key);
  const index = indexOfBytes(bytes, needle, from);
  if (index === -1) return null;
  return { value: cborTextAt(bytes, index + needle.length), end: index + needle.length };
}

function readGenerator(bytes: Uint8Array) {
  const info = textAfterKey(bytes, "claim_generator_info");
  if (info) {
    const name = textAfterKey(bytes.subarray(info.end, info.end + NAME_WINDOW), "name");
    if (name?.value) return name.value;
  }
  return textAfterKey(bytes, "claim_generator")?.value ?? null;
}

function readOrganizations(bytes: Uint8Array) {
  const found = new Set<string>();
  let index = indexOfBytes(bytes, ORGANIZATION_OID);
  while (index !== -1 && found.size < MAX_ORGANIZATIONS) {
    const typeAt = index + ORGANIZATION_OID.length;
    const length = bytes[typeAt + 1];
    if (DER_STRING_TYPES.has(bytes[typeAt]) && length && length < 128) {
      const value = decodeText(bytes.subarray(typeAt + 2, typeAt + 2 + length)).trim();
      if (value) found.add(value);
    }
    index = indexOfBytes(bytes, ORGANIZATION_OID, index + 1);
  }
  return [...found];
}

export function hasC2paManifest(bytes: Uint8Array) {
  return containsAscii(bytes, "jumb") && containsAscii(bytes, "c2pa");
}

export function readC2pa(bytes: Uint8Array, known = false): C2paSummary | null {
  if (!known && !hasC2paManifest(bytes)) return null;
  return {
    generator: readGenerator(bytes),
    sourceType: textAfterKey(bytes, "digitalSourceType")?.value ?? null,
    actions: ACTIONS.filter((action) => containsAscii(bytes, `c2pa.${action}`)),
    organizations: readOrganizations(bytes),
  };
}
