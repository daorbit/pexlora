import { readBytes } from "@/lib/files/bytes";
import {
  EBML_IDS as IDS,
  childElements,
  elementBytes,
  elementDate,
  elementFloat,
  elementText,
  elementUint,
  readElementAt,
  voidElement,
  type EbmlElement,
} from "@/lib/files/containers/ebml";
import { binaryLabel, createReport, type ReportBuilder } from "@/lib/metadata/report";
import type { MetadataGroupId, ReportDetails } from "@/lib/metadata/types";
import { UnreadableFileError, type FileProcessor } from "@/lib/files/processors/types";

type Located = EbmlElement & { end: number };

const TARGETS = new Set<number>([IDS.info, IDS.tracks, IDS.tags, IDS.attachments]);
const LARGE_ATTACHMENTS = 64 * 1024 * 1024;
const DEFAULT_TIMESTAMP_SCALE = 1_000_000;

const TAG_GROUPS: [RegExp, MetadataGroupId][] = [
  [/^(encoder|encoded_by|_statistics_writing_app)$/i, "software"],
  [/date|creation_time/i, "dates"],
  [/location/i, "gps"],
];

const unreadable = () => new UnreadableFileError("This video couldn't be read. It may be incomplete or damaged.");

async function readSeekHead(file: Blob, seekHead: Located, segmentStart: number) {
  const bytes = await readBytes(file, seekHead.dataStart, seekHead.end);
  return childElements(bytes, seekHead, seekHead.dataStart)
    .filter((seek) => seek.id === IDS.seek)
    .flatMap((seek) => {
      const children = childElements(bytes, seek, seekHead.dataStart);
      const id = children.find((child) => child.id === IDS.seekId);
      const position = children.find((child) => child.id === IDS.seekPosition);
      if (!id || !position || !TARGETS.has(elementUint(bytes, id, seekHead.dataStart))) return [];
      return [segmentStart + elementUint(bytes, position, seekHead.dataStart)];
    });
}

async function locateTargets(file: Blob) {
  const header = await readElementAt(file, 0);
  if (!header || header.id !== IDS.header || header.end === null) throw unreadable();

  let segment = await readElementAt(file, header.end);
  while (segment && segment.id === IDS.void && segment.end !== null) segment = await readElementAt(file, segment.end);
  if (!segment || segment.id !== IDS.segment) throw unreadable();

  const segmentEnd = segment.end ?? file.size;
  const found = new Map<number, Located>();
  const seekTargets: number[] = [];
  let offset = segment.dataStart;

  while (offset < segmentEnd) {
    const element = await readElementAt(file, offset);
    if (!element || element.id === IDS.cluster || element.end === null) break;
    const located = { ...element, end: element.end };
    if (element.id === IDS.seekHead) seekTargets.push(...(await readSeekHead(file, located, segment.dataStart)));
    if (TARGETS.has(element.id)) found.set(element.start, located);
    offset = element.end;
  }

  for (const position of seekTargets) {
    if (found.has(position) || position >= file.size) continue;
    const element = await readElementAt(file, position);
    if (element && TARGETS.has(element.id) && element.end !== null && element.end <= file.size) {
      found.set(position, { ...element, end: element.end });
    }
  }

  return [...found.values()].sort((a, b) => a.start - b.start);
}

function tagGroup(name: string) {
  return TAG_GROUPS.find(([pattern]) => pattern.test(name))?.[1] ?? "tags";
}

function parseInfo(bytes: Uint8Array, info: Located, report: ReportBuilder, details: ReportDetails) {
  const children = childElements(bytes, info, info.start);
  let scale = DEFAULT_TIMESTAMP_SCALE;
  let duration = 0;
  for (const child of children) {
    if (child.id === IDS.title) report.entry("document", "Title", elementText(bytes, child, info.start));
    if (child.id === IDS.muxingApp) report.entry("software", "Muxing app", elementText(bytes, child, info.start));
    if (child.id === IDS.writingApp) report.entry("software", "Writing app", elementText(bytes, child, info.start));
    if (child.id === IDS.dateUtc) report.entry("dates", "Created", elementDate(bytes, child, info.start));
    if (child.id === IDS.timestampScale) scale = elementUint(bytes, child, info.start) || scale;
    if (child.id === IDS.duration) duration = elementFloat(bytes, child, info.start);
  }
  if (duration) details.duration = (duration * scale) / 1e9;
}

function parseTracks(bytes: Uint8Array, tracks: Located, report: ReportBuilder, details: ReportDetails) {
  for (const entry of childElements(bytes, tracks, tracks.start).filter((child) => child.id === IDS.trackEntry)) {
    for (const child of childElements(bytes, entry, tracks.start)) {
      if (child.id === IDS.trackName) report.entry("tags", "Track name", elementText(bytes, child, tracks.start));
      if (child.id === IDS.video && !details.width) {
        const video = childElements(bytes, child, tracks.start);
        const width = video.find((item) => item.id === IDS.pixelWidth);
        const height = video.find((item) => item.id === IDS.pixelHeight);
        if (width && height) {
          details.width = elementUint(bytes, width, tracks.start);
          details.height = elementUint(bytes, height, tracks.start);
        }
      }
    }
  }
}

function parseSimpleTag(bytes: Uint8Array, simpleTag: EbmlElement, base: number, report: ReportBuilder) {
  const children = childElements(bytes, simpleTag, base);
  const name = children.find((child) => child.id === IDS.tagName);
  const text = children.find((child) => child.id === IDS.tagString);
  const binary = children.find((child) => child.id === IDS.tagBinary);
  if (name) {
    const key = elementText(bytes, name, base);
    const value = text ? elementText(bytes, text, base) : binary ? binaryLabel(elementBytes(bytes, binary, base).length) : "";
    report.entry(tagGroup(key), key, value);
  }
  children.filter((child) => child.id === IDS.simpleTag).forEach((child) => parseSimpleTag(bytes, child, base, report));
}

function parseTags(bytes: Uint8Array, tags: Located, report: ReportBuilder) {
  for (const tag of childElements(bytes, tags, tags.start).filter((child) => child.id === IDS.tag)) {
    childElements(bytes, tag, tags.start)
      .filter((child) => child.id === IDS.simpleTag)
      .forEach((child) => parseSimpleTag(bytes, child, tags.start, report));
  }
}

function parseAttachments(bytes: Uint8Array, attachments: Located, report: ReportBuilder) {
  for (const file of childElements(bytes, attachments, attachments.start).filter((child) => child.id === IDS.attachedFile)) {
    const children = childElements(bytes, file, attachments.start);
    const name = children.find((child) => child.id === IDS.fileName);
    const mime = children.find((child) => child.id === IDS.fileMimeType);
    const data = children.find((child) => child.id === IDS.fileData);
    const size = data ? (data.end ?? data.dataStart) - data.dataStart : 0;
    report.entry(
      "attachments",
      name ? elementText(bytes, name, attachments.start) : "Attached file",
      `${mime ? elementText(bytes, mime, attachments.start) : "file"} · ${binaryLabel(size)}`,
    );
  }
}

function scrub(bytes: Uint8Array, parent: EbmlElement, base: number) {
  for (const child of childElements(bytes, parent, base)) {
    const start = child.start - base;
    const end = (child.end ?? bytes.length + base) - base;
    if (child.id === IDS.title || child.id === IDS.dateUtc || child.id === IDS.trackName) {
      bytes.set(voidElement(end - start), start);
    } else if (child.id === IDS.muxingApp || child.id === IDS.writingApp) {
      bytes.fill(0, child.dataStart - base, end);
    } else if (child.id === IDS.trackEntry) {
      scrub(bytes, child, base);
    }
  }
}

export const ebmlProcessor: FileProcessor = {
  async inspect(file, format) {
    const report = createReport();
    const details: ReportDetails = { format: format.label };

    for (const element of await locateTargets(file)) {
      if (element.id === IDS.attachments && element.end - element.start > LARGE_ATTACHMENTS) {
        report.entry("attachments", "Attachments", binaryLabel(element.end - element.start));
        continue;
      }
      const bytes = await readBytes(file, element.start, element.end);
      if (element.id === IDS.info) parseInfo(bytes, element, report, details);
      if (element.id === IDS.tracks) parseTracks(bytes, element, report, details);
      if (element.id === IDS.tags) parseTags(bytes, element, report);
      if (element.id === IDS.attachments) parseAttachments(bytes, element, report);
    }

    return report.build(details);
  },

  async clean(file, format) {
    const patches: { start: number; bytes: Uint8Array }[] = [];

    for (const element of await locateTargets(file)) {
      if (element.id === IDS.tags || element.id === IDS.attachments) {
        patches.push({ start: element.start, bytes: voidElement(element.end - element.start) });
        continue;
      }
      const bytes = await readBytes(file, element.start, element.end);
      scrub(bytes, element, element.start);
      patches.push({ start: element.start, bytes });
    }

    const parts: BlobPart[] = [];
    let cursor = 0;
    for (const patch of patches) {
      parts.push(file.slice(cursor, patch.start), patch.bytes as BlobPart);
      cursor = patch.start + patch.bytes.length;
    }
    parts.push(file.slice(cursor));
    return new Blob(parts, { type: format.mimeTypes[0] });
  },
};
