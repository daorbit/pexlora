import { ascii, decodeText, readBytes, view } from "@/lib/files/bytes";
import { binaryLabel, type ReportBuilder } from "@/lib/metadata/report";
import type { MetadataGroupId } from "@/lib/metadata/types";

const FRAME_LABELS: Record<string, string> = {
  TIT1: "Grouping",
  TIT2: "Title",
  TIT3: "Subtitle",
  TPE1: "Artist",
  TPE2: "Album artist",
  TPE3: "Conductor",
  TPE4: "Remixed by",
  TALB: "Album",
  TCOM: "Composer",
  TEXT: "Lyricist",
  TCON: "Genre",
  TRCK: "Track",
  TPOS: "Disc",
  TYER: "Year",
  TDAT: "Date",
  TDRC: "Recording date",
  TDRL: "Release date",
  TDOR: "Original release date",
  TDEN: "Encoding date",
  TDTG: "Tagging date",
  TENC: "Encoded by",
  TSSE: "Encoder settings",
  TCOP: "Copyright",
  TPUB: "Publisher",
  TOWN: "Owner",
  TBPM: "BPM",
  TKEY: "Key",
  TLAN: "Language",
  TSRC: "ISRC",
  TCMP: "Compilation",
  COMM: "Comment",
  USLT: "Lyrics",
  APIC: "Cover art",
  PIC: "Cover art",
  GEOB: "Embedded object",
  PRIV: "Private data",
  WOAR: "Artist website",
  WCOM: "Purchase link",
  WOAS: "Source website",
  WXXX: "Link",
};

const FRAME_ALIASES: Record<string, string> = {
  TT1: "TIT1",
  TT2: "TIT2",
  TT3: "TIT3",
  TP1: "TPE1",
  TP2: "TPE2",
  TAL: "TALB",
  TCM: "TCOM",
  TCO: "TCON",
  TRK: "TRCK",
  TYE: "TYER",
  TEN: "TENC",
  TSS: "TSSE",
  TCR: "TCOP",
  TPB: "TPUB",
  COM: "COMM",
  ULT: "USLT",
  TXX: "TXXX",
  WXX: "WXXX",
  GEO: "GEOB",
};

const DATE_FRAMES = new Set(["TYER", "TDAT", "TDRC", "TDRL", "TDOR", "TDEN", "TDTG"]);
const SOFTWARE_FRAMES = new Set(["TENC", "TSSE"]);
const ATTACHMENT_FRAMES = new Set(["APIC", "PIC", "GEOB"]);

function syncsafe(bytes: Uint8Array, offset: number) {
  return (
    ((bytes[offset] & 0x7f) << 21) |
    ((bytes[offset + 1] & 0x7f) << 14) |
    ((bytes[offset + 2] & 0x7f) << 7) |
    (bytes[offset + 3] & 0x7f)
  );
}

export function id3TagLength(header: Uint8Array) {
  if (header.length < 10 || ascii(header, 0, 3) !== "ID3") return 0;
  const hasFooter = (header[5] & 0x10) !== 0;
  return 10 + syncsafe(header, 6) + (hasFooter ? 10 : 0);
}

export async function readLeadingId3(file: Blob) {
  const tags: Uint8Array[] = [];
  let start = 0;
  while (start + 10 <= file.size) {
    const length = id3TagLength(await readBytes(file, start, start + 10));
    if (!length || start + length > file.size) break;
    tags.push(await readBytes(file, start, start + length));
    start += length;
  }
  return { start, tags };
}

function removeUnsync(bytes: Uint8Array) {
  const output: number[] = [];
  for (let index = 0; index < bytes.length; index += 1) {
    output.push(bytes[index]);
    if (bytes[index] === 0xff && bytes[index + 1] === 0x00) index += 1;
  }
  return Uint8Array.from(output);
}

function encodingName(encoding: number, data: Uint8Array) {
  if (encoding === 1) return data[0] === 0xfe && data[1] === 0xff ? "utf-16be" : "utf-16le";
  if (encoding === 2) return "utf-16be";
  if (encoding === 3) return "utf-8";
  return "latin1";
}

function terminatorAt(data: Uint8Array, encoding: number) {
  const wide = encoding === 1 || encoding === 2;
  for (let index = 0; index < data.length; index += wide ? 2 : 1) {
    if (data[index] === 0 && (!wide || data[index + 1] === 0)) return { at: index, width: wide ? 2 : 1 };
  }
  return { at: data.length, width: 0 };
}

function decodeId3(data: Uint8Array, encoding: number) {
  return decodeText(data, encodingName(encoding, data)).split("\0").filter(Boolean).join(" / ");
}

function splitPair(data: Uint8Array, encoding: number) {
  const { at, width } = terminatorAt(data, encoding);
  return [decodeId3(data.subarray(0, at), encoding), decodeId3(data.subarray(at + width), encoding)];
}

function frameGroup(id: string): MetadataGroupId {
  if (DATE_FRAMES.has(id)) return "dates";
  if (SOFTWARE_FRAMES.has(id)) return "software";
  if (ATTACHMENT_FRAMES.has(id)) return "attachments";
  return "tags";
}

function addFrame(report: ReportBuilder, rawId: string, data: Uint8Array) {
  const id = FRAME_ALIASES[rawId] ?? rawId;
  const label = FRAME_LABELS[id] ?? id;
  const group = frameGroup(id);
  const encoding = data[0];

  if (ATTACHMENT_FRAMES.has(id)) return report.entry(group, label, binaryLabel(data.length, id === "GEOB" ? "file" : "image"));
  if (id === "TXXX") {
    const [description, value] = splitPair(data.subarray(1), encoding);
    return report.entry(group, description || "User text", value);
  }
  if (id === "COMM" || id === "USLT") {
    const [description, value] = splitPair(data.subarray(4), encoding);
    return report.entry(group, description ? `${label} (${description})` : label, value);
  }
  if (id === "WXXX") {
    const [description] = splitPair(data.subarray(1), encoding);
    const { at, width } = terminatorAt(data.subarray(1), encoding);
    return report.entry(group, description || label, decodeText(data.subarray(1 + at + width), "latin1"));
  }
  if (id === "PRIV") {
    const { at } = terminatorAt(data, 0);
    return report.entry(group, label, `${decodeText(data.subarray(0, at), "latin1")} ${binaryLabel(data.length - at - 1)}`);
  }
  if (id.startsWith("T")) return report.entry(group, label, decodeId3(data.subarray(1), encoding));
  if (id.startsWith("W")) return report.entry(group, label, decodeText(data, "latin1"));
  report.entry(group, label, binaryLabel(data.length));
}

export function parseId3(tag: Uint8Array, report: ReportBuilder) {
  const major = tag[3];
  const flags = tag[5];
  let body = tag.subarray(10, 10 + syncsafe(tag, 6));
  if (flags & 0x80 && major < 4) body = removeUnsync(body);

  const dataView = view(body);
  let offset = 0;
  if (flags & 0x40 && body.length >= 4) offset = major === 4 ? syncsafe(body, 0) : dataView.getUint32(0) + 4;

  const idLength = major === 2 ? 3 : 4;
  const headerLength = major === 2 ? 6 : 10;

  while (offset + headerLength <= body.length) {
    const id = ascii(body, offset, idLength);
    if (!/^[A-Z0-9]+$/.test(id)) break;
    const size =
      major === 2
        ? (body[offset + 3] << 16) | (body[offset + 4] << 8) | body[offset + 5]
        : major === 4
          ? syncsafe(body, offset + 4)
          : dataView.getUint32(offset + 4);
    const formatFlags = major === 2 ? 0 : body[offset + 9];
    let data = body.subarray(offset + headerLength, offset + headerLength + size);
    offset += headerLength + size;

    if (major === 4 && formatFlags & 0x02) data = removeUnsync(data);
    if (major === 4 && formatFlags & 0x01) data = data.subarray(4);
    if (formatFlags & (major === 4 ? 0x0c : 0xc0)) {
      report.entry("tags", FRAME_LABELS[id] ?? id, binaryLabel(data.length));
      continue;
    }
    if (data.length) addFrame(report, id, data);
  }
}
