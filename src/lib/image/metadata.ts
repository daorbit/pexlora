import "server-only";
import { openImage } from "@/lib/image/open";
import {
  addC2paMarker,
  addColorProfile,
  addExifSegments,
  readExifSegments,
  readLocation,
} from "@/lib/metadata/exif-report";
import { createReport, toEntry } from "@/lib/metadata/report";
import type { MetadataReport } from "@/lib/metadata/types";

export async function inspectImage(buffer: Buffer): Promise<MetadataReport> {
  const [info, segments] = await Promise.all([openImage(buffer).metadata(), readExifSegments(buffer)]);
  const report = createReport();

  addExifSegments(report, segments);
  report.add(
    "png-text",
    (info.comments ?? []).map((comment) => toEntry(comment.keyword, comment.text)),
  );
  addC2paMarker(report, buffer);
  addColorProfile(report, Boolean(info.hasProfile));

  return report.build({
    format: info.format ?? "unknown",
    width: info.width,
    height: info.height,
    location: readLocation(segments.gps),
  });
}
