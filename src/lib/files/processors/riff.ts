import { ascii, decodeText, fixedText, readBytes, view, writeAscii } from "@/lib/files/bytes";
import { parseId3 } from "@/lib/files/tags/id3";
import { readXmlFields } from "@/lib/files/xml";
import { addXmp } from "@/lib/files/xmp";
import { binaryLabel, createReport, type ReportBuilder } from "@/lib/metadata/report";
import type { MetadataGroupId } from "@/lib/metadata/types";
import { UnreadableFileError, type FileProcessor } from "@/lib/files/processors/types";

const KEPT_CHUNKS = new Set(["fmt ", "fact", "data", "cue ", "smpl", "inst"]);
const PADDING_CHUNKS = new Set(["JUNK", "junk", "PAD ", "FLLR", "free"]);

const INFO_FIELDS: Record<string, { label: string; group: MetadataGroupId }> = {
  INAM: { label: "Title", group: "tags" },
  IART: { label: "Artist", group: "tags" },
  IPRD: { label: "Album", group: "tags" },
  IGNR: { label: "Genre", group: "tags" },
  ICMT: { label: "Comment", group: "tags" },
  ICOP: { label: "Copyright", group: "tags" },
  IKEY: { label: "Keywords", group: "tags" },
  ISBJ: { label: "Subject", group: "tags" },
  ITRK: { label: "Track", group: "tags" },
  IPRT: { label: "Track", group: "tags" },
  ICRD: { label: "Creation date", group: "dates" },
  IENG: { label: "Engineer", group: "people" },
  ITCH: { label: "Technician", group: "people" },
  ISFT: { label: "Software", group: "software" },
  ISRC: { label: "Source", group: "tags" },
};

const BEXT_FIELDS = [
  { label: "Description", start: 0, length: 256, group: "tags" },
  { label: "Originator", start: 256, length: 32, group: "people" },
  { label: "Originator reference", start: 288, length: 32, group: "tags" },
  { label: "Origination date", start: 320, length: 10, group: "dates" },
  { label: "Origination time", start: 330, length: 8, group: "dates" },
] as const;

type Chunk = { id: string; start: number; bodyStart: number; size: number; end: number };

async function readChunks(file: Blob) {
  const header = await readBytes(file, 0, 12);
  const signature = ascii(header, 0, 4);
  if (signature === "RF64") throw new UnreadableFileError("RF64 WAV files aren't supported yet.");
  if (signature !== "RIFF" || ascii(header, 8, 4) !== "WAVE") {
    throw new UnreadableFileError("This WAV file couldn't be read. It may be damaged.");
  }

  const chunks: Chunk[] = [];
  let offset = 12;
  while (offset + 8 <= file.size) {
    const head = await readBytes(file, offset, offset + 8);
    const id = ascii(head, 0, 4);
    const size = view(head).getUint32(4, true);
    const bodyStart = offset + 8;
    const isOpenData = id === "data" && (size === 0xffffffff || size === 0);
    const end = isOpenData ? file.size : Math.min(file.size, bodyStart + size + (size % 2));
    chunks.push({ id, start: offset, bodyStart, size: isOpenData ? file.size - bodyStart : size, end });
    if (end <= offset) break;
    offset = end;
  }
  return chunks;
}

function parseInfoList(body: Uint8Array, report: ReportBuilder) {
  const data = view(body);
  let offset = 4;
  while (offset + 8 <= body.length) {
    const id = ascii(body, offset, 4);
    const size = data.getUint32(offset + 4, true);
    const field = INFO_FIELDS[id] ?? { label: id, group: "tags" as const };
    report.entry(field.group, field.label, fixedText(body.subarray(offset + 8, offset + 8 + size)));
    offset += 8 + size + (size % 2);
  }
}

function parseBext(body: Uint8Array, report: ReportBuilder) {
  BEXT_FIELDS.forEach(({ label, start, length, group }) =>
    report.entry(group, label, fixedText(body.subarray(start, start + length))),
  );
  if (body.length > 602) report.entry("software", "Coding history", fixedText(body.subarray(602)));
}

async function parseChunk(file: Blob, chunk: Chunk, report: ReportBuilder) {
  if (KEPT_CHUNKS.has(chunk.id) || PADDING_CHUNKS.has(chunk.id)) return;
  const body = await readBytes(file, chunk.bodyStart, chunk.bodyStart + chunk.size);

  if (chunk.id === "LIST" && ascii(body, 0, 4) === "INFO") return parseInfoList(body, report);
  if (chunk.id === "bext") return parseBext(body, report);
  if (chunk.id === "_PMX") return addXmp(report, decodeText(body));
  if (chunk.id === "iXML") {
    return readXmlFields(decodeText(body)).forEach(({ key, value }) => report.entry("tags", `iXML ${key}`, value));
  }
  if (chunk.id.toLowerCase() === "id3 ") return parseId3(body, report);
  const label = chunk.id === "LIST" ? `LIST ${ascii(body, 0, 4)}` : chunk.id.trim();
  report.entry("tags", label, binaryLabel(chunk.size));
}

async function duration(file: Blob, chunks: Chunk[]) {
  const format = chunks.find((chunk) => chunk.id === "fmt ");
  const data = chunks.find((chunk) => chunk.id === "data");
  if (!format || !data) return undefined;
  const byteRate = view(await readBytes(file, format.bodyStart, format.bodyStart + 12)).getUint32(8, true);
  return byteRate ? data.size / byteRate : undefined;
}

export const riffProcessor: FileProcessor = {
  async inspect(file, format) {
    const chunks = await readChunks(file);
    const report = createReport();
    for (const chunk of chunks) await parseChunk(file, chunk, report);
    return report.build({ format: format.label, duration: await duration(file, chunks) });
  },

  async clean(file, format) {
    const kept = (await readChunks(file)).filter((chunk) => KEPT_CHUNKS.has(chunk.id));
    const length = kept.reduce((total, chunk) => total + chunk.end - chunk.start, 4);
    const header = new Uint8Array(12);
    writeAscii(header, 0, "RIFF");
    view(header).setUint32(4, length, true);
    writeAscii(header, 8, "WAVE");
    return new Blob([header, ...kept.map((chunk) => file.slice(chunk.start, chunk.end))], {
      type: format.mimeTypes[0],
    });
  },
};
