import { decodeText, isPrintable, view } from "@/lib/files/bytes";
import { childBoxes, metaChildOffset, type Box } from "@/lib/files/containers/bmff";
import { addXmp } from "@/lib/files/xmp";
import { binaryLabel, type ReportBuilder } from "@/lib/metadata/report";
import type { MetadataGroupId } from "@/lib/metadata/types";

const ITEM_LABELS: Record<string, string> = {
  "©nam": "Title",
  "©ART": "Artist",
  "©alb": "Album",
  "©day": "Date",
  "©too": "Encoder",
  "©swr": "Software",
  "©enc": "Encoded by",
  "©mak": "Make",
  "©mod": "Model",
  "©cmt": "Comment",
  "©des": "Description",
  "©inf": "Information",
  "©xyz": "Location",
  "©gen": "Genre",
  "©wrt": "Composer",
  "©cpy": "Copyright",
  "©aut": "Author",
  "©lyr": "Lyrics",
  "©grp": "Grouping",
  aART: "Album artist",
  covr: "Cover art",
  trkn: "Track",
  disk: "Disc",
  tmpo: "BPM",
  cpil: "Compilation",
  desc: "Description",
  ldes: "Long description",
  purd: "Purchase date",
  apID: "Apple account",
  ownr: "Owner",
  titl: "Title",
  auth: "Author",
  dscp: "Description",
  cprt: "Copyright",
  perf: "Performer",
  gnre: "Genre",
  albm: "Album",
  yrrc: "Year",
  loci: "Location",
  kywd: "Keywords",
};

const ITEM_GROUPS: Record<string, MetadataGroupId> = {
  "©xyz": "gps",
  loci: "gps",
  "©day": "dates",
  purd: "dates",
  yrrc: "dates",
  "©too": "software",
  "©swr": "software",
  "©enc": "software",
  "©mak": "device",
  "©mod": "device",
  apID: "people",
  ownr: "people",
  "©aut": "people",
  auth: "people",
  covr: "attachments",
};

const KEY_GROUPS: [RegExp, MetadataGroupId][] = [
  [/location|iso6709/i, "gps"],
  [/make|model|device/i, "device"],
  [/software|version|encoder/i, "software"],
  [/date/i, "dates"],
  [/author|artist|owner/i, "people"],
];

const KEY_PREFIX = /^(com\.apple\.quicktime\.|com\.android\.)/;

function integer(value: Uint8Array, signed: boolean) {
  const data = view(value);
  if (value.length === 1) return signed ? data.getInt8(0) : data.getUint8(0);
  if (value.length === 2) return signed ? data.getInt16(0) : data.getUint16(0);
  if (value.length === 4) return signed ? data.getInt32(0) : data.getUint32(0);
  if (value.length === 8) return Number(signed ? data.getBigInt64(0) : data.getBigUint64(0));
  return null;
}

function dataValue(bytes: Uint8Array, box: Box) {
  const type = view(bytes).getUint32(box.bodyStart) & 0xffffff;
  const value = bytes.subarray(box.bodyStart + 8, box.end);
  if (type === 1) return decodeText(value);
  if (type === 2) return decodeText(value, "utf-16be");
  if (type === 13 || type === 14 || type === 27) return binaryLabel(value.length, "image");
  if (type === 21 || type === 22) return String(integer(value, type === 21) ?? binaryLabel(value.length));
  if (type === 23 && value.length === 4) return String(view(value).getFloat32(0));
  if (type === 24 && value.length === 8) return String(view(value).getFloat64(0));
  return isPrintable(value) ? decodeText(value) : binaryLabel(value.length);
}

function text(payload: Uint8Array) {
  if (payload.length >= 4) {
    const length = view(payload).getUint16(0);
    if (length && 4 + length <= payload.length && isPrintable(payload.subarray(4, 4 + length))) {
      return decodeText(payload.subarray(4, 4 + length));
    }
  }
  for (let skip = 0; skip <= 6 && skip < payload.length; skip += 1) {
    const rest = payload.subarray(skip);
    if (isPrintable(rest.subarray(0, Math.max(0, rest.length - 1)))) return decodeText(rest);
  }
  return binaryLabel(payload.length);
}

function location(payload: Uint8Array) {
  let offset = 6;
  while (offset < payload.length && payload[offset] !== 0) offset += 1;
  offset += 2;
  if (offset + 12 > payload.length) return binaryLabel(payload.length);
  const data = view(payload);
  const longitude = data.getInt32(offset) / 65536;
  const latitude = data.getInt32(offset + 4) / 65536;
  return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
}

function itemGroup(key: string) {
  return ITEM_GROUPS[key] ?? KEY_GROUPS.find(([pattern]) => pattern.test(key))?.[1] ?? "tags";
}

function parseKeys(bytes: Uint8Array, keys: Box) {
  const data = view(bytes);
  const count = data.getUint32(keys.bodyStart + 4);
  const names: string[] = [];
  let offset = keys.bodyStart + 8;
  for (let index = 0; index < count && offset + 8 <= keys.end; index += 1) {
    const size = data.getUint32(offset);
    names.push(decodeText(bytes.subarray(offset + 8, offset + size)));
    offset += Math.max(size, 8);
  }
  return names;
}

function freeformName(bytes: Uint8Array, item: Box) {
  const name = childBoxes(bytes, item).find((child) => child.type === "name");
  return name ? decodeText(bytes.subarray(name.bodyStart + 4, name.end)) : "----";
}

function parseItems(bytes: Uint8Array, list: Box, keys: string[] | null, report: ReportBuilder) {
  for (const item of childBoxes(bytes, list)) {
    const rawKey = keys ? keys[view(bytes).getUint32(item.start + 4) - 1] : item.type === "----" ? freeformName(bytes, item) : item.type;
    if (!rawKey) continue;
    const values = childBoxes(bytes, item)
      .filter((child) => child.type === "data")
      .map((child) => dataValue(bytes, child));
    const key = rawKey.replace(KEY_PREFIX, "");
    report.entry(itemGroup(rawKey), ITEM_LABELS[rawKey] ?? key, values.join(" / "));
  }
}

export function parseMeta(bytes: Uint8Array, meta: Box, report: ReportBuilder) {
  const children = childBoxes(bytes, meta, metaChildOffset(bytes, meta));
  const keys = children.find((child) => child.type === "keys");
  const list = children.find((child) => child.type === "ilst");
  if (list) parseItems(bytes, list, keys ? parseKeys(bytes, keys) : null, report);
}

export function parseUserData(bytes: Uint8Array, userData: Box, report: ReportBuilder) {
  for (const child of childBoxes(bytes, userData)) {
    const payload = bytes.subarray(child.bodyStart, child.end);
    if (child.type === "meta") parseMeta(bytes, child, report);
    else if (child.type === "XMP_") addXmp(report, decodeText(payload));
    else if (child.type !== "free" && payload.length) {
      const value = child.type === "loci" ? location(payload) : text(payload);
      report.entry(itemGroup(child.type), ITEM_LABELS[child.type] ?? child.type, value);
    }
  }
}
