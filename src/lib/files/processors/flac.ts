import { ascii, decodeText, readBytes, view, writeAscii } from "@/lib/files/bytes";
import { parseId3, readLeadingId3 } from "@/lib/files/tags/id3";
import { parseVorbisComment } from "@/lib/files/tags/vorbis";
import { binaryLabel, createReport, type ReportBuilder } from "@/lib/metadata/report";
import { UnreadableFileError, type FileProcessor } from "@/lib/files/processors/types";

const BLOCK = { streamInfo: 0, application: 2, seekTable: 3, vorbisComment: 4, cueSheet: 5, picture: 6 };
const KEPT_BLOCKS = new Set([BLOCK.streamInfo, BLOCK.seekTable, BLOCK.cueSheet]);

type Block = { type: number; bodyStart: number; end: number };

async function readStructure(file: Blob) {
  const { start, tags } = await readLeadingId3(file);
  if (ascii(await readBytes(file, start, start + 4), 0, 4) !== "fLaC") {
    throw new UnreadableFileError("This FLAC file couldn't be read. It may be damaged.");
  }

  const blocks: Block[] = [];
  let offset = start + 4;
  let last = false;
  while (!last && offset + 4 <= file.size) {
    const head = await readBytes(file, offset, offset + 4);
    last = (head[0] & 0x80) !== 0;
    const length = (head[1] << 16) | (head[2] << 8) | head[3];
    blocks.push({ type: head[0] & 0x7f, bodyStart: offset + 4, end: offset + 4 + length });
    offset += 4 + length;
  }
  return { tags, blocks, audioStart: offset };
}

function parsePicture(body: Uint8Array, report: ReportBuilder) {
  const data = view(body);
  const mimeLength = data.getUint32(4);
  const mime = ascii(body, 8, mimeLength);
  let offset = 8 + mimeLength;
  const descriptionLength = data.getUint32(offset);
  offset += 4 + descriptionLength;
  const width = data.getUint32(offset);
  const height = data.getUint32(offset + 4);
  const size = data.getUint32(offset + 16);
  report.entry("attachments", "Picture", `${mime} · ${width} × ${height} · ${binaryLabel(size, "image")}`);
}

function streamDuration(body: Uint8Array) {
  const sampleRate = (body[10] << 12) | (body[11] << 4) | (body[12] >> 4);
  const totalSamples = (body[13] & 0x0f) * 2 ** 32 + view(body).getUint32(14);
  return sampleRate && totalSamples ? totalSamples / sampleRate : undefined;
}

export const flacProcessor: FileProcessor = {
  async inspect(file, format) {
    const { tags, blocks } = await readStructure(file);
    const report = createReport();
    tags.forEach((tag) => parseId3(tag, report));
    let duration: number | undefined;

    for (const block of blocks) {
      if (block.type === BLOCK.streamInfo) {
        duration = streamDuration(await readBytes(file, block.bodyStart, block.end));
        continue;
      }
      if (block.type === BLOCK.vorbisComment) {
        parseVorbisComment(await readBytes(file, block.bodyStart, block.end), report);
      } else if (block.type === BLOCK.picture) {
        parsePicture(await readBytes(file, block.bodyStart, block.end), report);
      } else if (block.type === BLOCK.application) {
        const id = decodeText(await readBytes(file, block.bodyStart, block.bodyStart + 4), "latin1");
        report.entry("tags", `Application block ${id}`, binaryLabel(block.end - block.bodyStart));
      }
    }

    return report.build({ format: format.label, duration });
  },

  async clean(file, format) {
    const { blocks, audioStart } = await readStructure(file);
    const kept = blocks.filter((block) => KEPT_BLOCKS.has(block.type));
    const signature = new Uint8Array(4);
    writeAscii(signature, 0, "fLaC");

    const parts = kept.flatMap((block, index) => {
      const length = block.end - block.bodyStart;
      const header = Uint8Array.from([
        (index === kept.length - 1 ? 0x80 : 0) | block.type,
        (length >> 16) & 0xff,
        (length >> 8) & 0xff,
        length & 0xff,
      ]);
      return [header, file.slice(block.bodyStart, block.end)];
    });

    return new Blob([signature, ...parts, file.slice(audioStart)], { type: format.mimeTypes[0] });
  },
};
