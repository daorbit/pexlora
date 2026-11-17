import { siteConfig } from "@/config/site";
import type { MetadataReport } from "@/lib/metadata/types";
import { downloadBlob } from "@/lib/utils/download";
import { baseName } from "@/lib/utils/file-name";

export function reportToJson(report: MetadataReport, fileName: string) {
  const { groups, totalTags, aiTags, ...details } = report;
  return JSON.stringify(
    {
      file: fileName,
      ...details,
      totalTags,
      aiTags,
      groups: groups.map(({ id, label, entries }) => ({ id, label, entries })),
      exportedBy: siteConfig.name,
      exportedAt: new Date().toISOString(),
    },
    null,
    2,
  );
}

export function downloadReportJson(report: MetadataReport, fileName: string) {
  const blob = new Blob([reportToJson(report, fileName)], { type: "application/json" });
  downloadBlob(blob, `${baseName(fileName)}-metadata.json`);
}
