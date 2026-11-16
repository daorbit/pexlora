import { ascii, decodeText, fixedText, readBytes, view } from "@/lib/files/bytes";
import { binaryLabel, type ReportBuilder } from "@/lib/metadata/report";

const ID3V1_LENGTH = 128;
const ID3V1_EXTENDED_LENGTH = 227;
const APE_FOOTER_LENGTH = 32;

const ID3V1_FIELDS = [
  { label: "Title", start: 3, length: 30 },
  { label: "Artist", start: 33, length: 30 },
  { label: "Album", start: 63, length: 30 },
  { label: "Year", start: 93, length: 4 },
  { label: "Comment", start: 97, length: 30 },
];

export type TrailingTags = {
  end: number;
  parse: (report: ReportBuilder) => void;
};

function parseId3v1(tag: Uint8Array, report: ReportBuilder) {
  ID3V1_FIELDS.forEach(({ label, start, length }) =>
    report.entry("tags", `ID3v1 ${label}`, fixedText(tag.subarray(start, start + length))),
  );
}

function parseApe(items: Uint8Array, count: number, report: ReportBuilder) {
  const data = view(items);
  let offset = 0;
  for (let index = 0; index < count && offset + 8 < items.length; index += 1) {
    const size = data.getUint32(offset, true);
    const flags = data.getUint32(offset + 4, true);
    let keyEnd = offset + 8;
    while (keyEnd < items.length && items[keyEnd] !== 0) keyEnd += 1;
    const key = ascii(items, offset + 8, keyEnd - offset - 8);
    const value = items.subarray(keyEnd + 1, keyEnd + 1 + size);
    const isText = ((flags >> 1) & 3) === 0;
    const group = /cover art/i.test(key) ? "attachments" : "tags";
    report.entry(group, `APE ${key}`, isText ? decodeText(value).split("\0").join(" / ") : binaryLabel(value.length));
    offset = keyEnd + 1 + size;
  }
}

export async function readTrailingTags(file: Blob, minStart: number): Promise<TrailingTags> {
  let end = file.size;
  const parsers: ((report: ReportBuilder) => void)[] = [];

  if (end - minStart >= ID3V1_LENGTH) {
    const tag = await readBytes(file, end - ID3V1_LENGTH, end);
    if (ascii(tag, 0, 3) === "TAG") {
      parsers.push((report) => parseId3v1(tag, report));
      end -= ID3V1_LENGTH;
      if (end - minStart >= ID3V1_EXTENDED_LENGTH) {
        const extended = await readBytes(file, end - ID3V1_EXTENDED_LENGTH, end - ID3V1_EXTENDED_LENGTH + 4);
        if (ascii(extended, 0, 4) === "TAG+") end -= ID3V1_EXTENDED_LENGTH;
      }
    }
  }

  if (end - minStart >= APE_FOOTER_LENGTH) {
    const footer = await readBytes(file, end - APE_FOOTER_LENGTH, end);
    if (ascii(footer, 0, 8) === "APETAGEX") {
      const data = view(footer);
      const tagSize = data.getUint32(12, true);
      const count = data.getUint32(16, true);
      const hasHeader = (data.getUint32(20, true) & 0x80000000) !== 0;
      const itemsStart = end - tagSize;
      const total = tagSize + (hasHeader ? APE_FOOTER_LENGTH : 0);
      if (total <= end - minStart) {
        const items = await readBytes(file, itemsStart, end - APE_FOOTER_LENGTH);
        parsers.push((report) => parseApe(items, count, report));
        end -= total;
      }
    }
  }

  return { end, parse: (report) => parsers.forEach((parse) => parse(report)) };
}
