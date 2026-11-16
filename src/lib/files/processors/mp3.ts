import { readBytes } from "@/lib/files/bytes";
import { createReport } from "@/lib/metadata/report";
import { parseId3, readLeadingId3 } from "@/lib/files/tags/id3";
import { readTrailingTags } from "@/lib/files/tags/trailing";
import { UnreadableFileError, type FileProcessor } from "@/lib/files/processors/types";

const SYNC_SEARCH_BYTES = 4096;

function isFrameHeader(bytes: Uint8Array, index: number) {
  if (bytes[index] !== 0xff || (bytes[index + 1] & 0xe0) !== 0xe0) return false;
  const version = (bytes[index + 1] >> 3) & 0x03;
  const layer = (bytes[index + 1] >> 1) & 0x03;
  const bitrate = bytes[index + 2] >> 4;
  const sampleRate = (bytes[index + 2] >> 2) & 0x03;
  return version !== 1 && layer !== 0 && bitrate !== 0x0f && sampleRate !== 0x03;
}

async function assertAudioFrames(file: Blob, start: number) {
  const head = await readBytes(file, start, start + SYNC_SEARCH_BYTES);
  for (let index = 0; index < head.length - 3; index += 1) {
    if (isFrameHeader(head, index)) return;
  }
  throw new UnreadableFileError("This MP3 file couldn't be read. It may be damaged.");
}

async function locate(file: Blob) {
  const leading = await readLeadingId3(file);
  await assertAudioFrames(file, leading.start);
  return { ...leading, trailing: await readTrailingTags(file, leading.start) };
}

export const mp3Processor: FileProcessor = {
  async inspect(file, format) {
    const { tags, trailing } = await locate(file);
    const report = createReport();
    tags.forEach((tag) => parseId3(tag, report));
    trailing.parse(report);
    return report.build({ format: format.label });
  },

  async clean(file, format) {
    const { start, trailing } = await locate(file);
    return new Blob([file.slice(start, trailing.end)], { type: format.mimeTypes[0] });
  },
};
