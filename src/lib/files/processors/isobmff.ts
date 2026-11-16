import { containsAscii, decodeText, isPrintable, readBytes, view } from "@/lib/files/bytes";
import {
  childBoxes,
  neutralise,
  readBox,
  readTime,
  rootBox,
  timeFields,
  uuidKind,
  zeroTimes,
  type Box,
} from "@/lib/files/containers/bmff";
import { parseMeta, parseUserData } from "@/lib/files/tags/quicktime";
import { addXmp } from "@/lib/files/xmp";
import { createReport, type ReportBuilder } from "@/lib/metadata/report";
import type { ReportDetails } from "@/lib/metadata/types";
import { UnreadableFileError, type FileProcessor } from "@/lib/files/processors/types";

const MAC_EPOCH_OFFSET = 2082844800;
const PADDING_BOXES = new Set(["free", "skip"]);
const METADATA_BOXES = new Set(["udta", "meta"]);
const CONTAINERS = new Set(["moov", "trak", "mdia"]);
const SMALL_BOX = 64 * 1024;

async function topLevelBoxes(file: Blob) {
  const boxes: Box[] = [];
  let offset = 0;
  while (offset + 8 <= file.size) {
    const head = await readBytes(file, offset, offset + 32);
    const box = readBox(head, 0, file.size - offset, offset);
    if (!box) break;
    boxes.push(box);
    offset = box.end;
  }
  if (!boxes.some((box) => box.type === "moov")) {
    throw new UnreadableFileError("This file couldn't be read. It may be incomplete or damaged.");
  }
  return boxes;
}

async function readWhole(file: Blob, box: Box) {
  const bytes = await readBytes(file, box.start, box.end);
  return { bytes, root: rootBox(bytes)! };
}

function isMetadataUuid(bytes: Uint8Array, box: Box) {
  return uuidKind(bytes, box) !== null || containsAscii(bytes.subarray(box.bodyStart, box.end), "c2pa");
}

function macDate(seconds: number) {
  return seconds > MAC_EPOCH_OFFSET ? new Date((seconds - MAC_EPOCH_OFFSET) * 1000).toISOString() : null;
}

function readMovieHeader(bytes: Uint8Array, box: Box, report: ReportBuilder, details: ReportDetails) {
  const { width, creation, modification, timescale } = timeFields(bytes, box);
  report.entry("dates", "Created", macDate(readTime(bytes, creation, width)));
  report.entry("dates", "Modified", macDate(readTime(bytes, modification, width)));
  const scale = view(bytes).getUint32(timescale);
  const duration = readTime(bytes, timescale + 4, width);
  if (scale && duration) details.duration = duration / scale;
}

function readTrackHeader(bytes: Uint8Array, box: Box, details: ReportDetails) {
  if (details.width) return;
  const data = view(bytes);
  const width = Math.round(data.getUint32(box.end - 8) / 65536);
  const height = Math.round(data.getUint32(box.end - 4) / 65536);
  if (width && height) Object.assign(details, { width, height });
}

function inspectUuid(bytes: Uint8Array, box: Box, report: ReportBuilder) {
  const kind = uuidKind(bytes, box);
  const payload = bytes.subarray(box.bodyStart, box.end);
  if (kind === "xmp") addXmp(report, decodeText(payload));
  else if (kind === "c2pa" || containsAscii(payload, "c2pa")) {
    report.entry("c2pa", "manifest", "Content Credentials manifest embedded", true);
  }
}

function inspectBox(bytes: Uint8Array, box: Box, report: ReportBuilder, details: ReportDetails) {
  if (box.type === "mvhd") return readMovieHeader(bytes, box, report, details);
  if (box.type === "tkhd") return readTrackHeader(bytes, box, details);
  if (box.type === "udta") return parseUserData(bytes, box, report);
  if (box.type === "meta") return parseMeta(bytes, box, report);
  if (box.type === "uuid") return inspectUuid(bytes, box, report);
  if (CONTAINERS.has(box.type)) {
    childBoxes(bytes, box).forEach((child) => inspectBox(bytes, child, report, details));
  }
}

function inspectPadding(bytes: Uint8Array, box: Box, report: ReportBuilder) {
  const payload = bytes.subarray(box.bodyStart, box.end);
  const end = payload.findLastIndex((byte) => byte !== 0);
  const content = payload.subarray(0, end + 1);
  if (content.length && isPrintable(content)) report.entry("software", "Note", decodeText(content));
}

function cleanBox(bytes: Uint8Array, box: Box) {
  for (const child of childBoxes(bytes, box)) {
    if (child.type === "mvhd" || child.type === "tkhd" || child.type === "mdhd") zeroTimes(bytes, child);
    else if (METADATA_BOXES.has(child.type)) neutralise(bytes, child);
    else if (child.type === "uuid" && isMetadataUuid(bytes, child)) neutralise(bytes, child);
    else if (PADDING_BOXES.has(child.type)) bytes.fill(0, child.typeEnd, child.end);
    else if (CONTAINERS.has(child.type)) cleanBox(bytes, child);
  }
}

export const isobmffProcessor: FileProcessor = {
  async inspect(file, format) {
    const report = createReport();
    const details: ReportDetails = { format: format.label };

    for (const box of await topLevelBoxes(file)) {
      const isPadding = PADDING_BOXES.has(box.type);
      if (box.type !== "moov" && box.type !== "uuid" && !METADATA_BOXES.has(box.type) && !isPadding) continue;
      if (isPadding && box.end - box.start > SMALL_BOX) continue;
      const { bytes, root } = await readWhole(file, box);
      if (isPadding) inspectPadding(bytes, root, report);
      else inspectBox(bytes, root, report, details);
    }

    return report.build(details);
  },

  async clean(file, format) {
    const boxes = await topLevelBoxes(file);
    const parts: BlobPart[] = [];

    for (const box of boxes) {
      const isPadding = PADDING_BOXES.has(box.type) && box.end - box.start <= SMALL_BOX;
      const isTarget = box.type === "moov" || box.type === "uuid" || METADATA_BOXES.has(box.type) || isPadding;
      if (!isTarget) {
        parts.push(file.slice(box.start, box.end));
        continue;
      }
      const { bytes, root } = await readWhole(file, box);
      if (box.type === "moov") cleanBox(bytes, root);
      else if (METADATA_BOXES.has(box.type) || (box.type === "uuid" && isMetadataUuid(bytes, root))) neutralise(bytes, root);
      else if (isPadding) bytes.fill(0, root.typeEnd, root.end);
      parts.push(bytes as BlobPart);
    }

    const end = boxes[boxes.length - 1].end;
    if (end < file.size) parts.push(file.slice(end));
    return new Blob(parts, { type: format.mimeTypes[0] });
  },
};
