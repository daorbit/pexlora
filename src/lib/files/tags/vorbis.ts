import { decodeText, view } from "@/lib/files/bytes";
import { binaryLabel, type ReportBuilder } from "@/lib/metadata/report";
import type { MetadataGroupId } from "@/lib/metadata/types";

const GROUPS: Record<string, MetadataGroupId> = {
  DATE: "dates",
  ENCODER: "software",
  ENCODED_BY: "software",
  ENCODEDBY: "software",
  LOCATION: "gps",
  METADATA_BLOCK_PICTURE: "attachments",
  COVERART: "attachments",
};

export function parseVorbisComment(block: Uint8Array, report: ReportBuilder) {
  const data = view(block);
  const vendorLength = data.getUint32(0, true);
  report.entry("software", "Encoder", decodeText(block.subarray(4, 4 + vendorLength)));

  let offset = 4 + vendorLength;
  const count = data.getUint32(offset, true);
  offset += 4;

  for (let index = 0; index < count && offset + 4 <= block.length; index += 1) {
    const length = data.getUint32(offset, true);
    const comment = decodeText(block.subarray(offset + 4, offset + 4 + length));
    offset += 4 + length;
    const separator = comment.indexOf("=");
    if (separator <= 0) continue;
    const key = comment.slice(0, separator);
    const group = GROUPS[key.toUpperCase()] ?? "tags";
    const value = group === "attachments" ? binaryLabel(length, "image") : comment.slice(separator + 1);
    report.entry(group, key, value);
  }
}
