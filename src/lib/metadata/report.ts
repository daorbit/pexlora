import { isAiTag } from "@/lib/metadata/ai-detection";
import type {
  MetadataEntry,
  MetadataGroup,
  MetadataGroupId,
  MetadataReport,
  ReportDetails,
} from "@/lib/metadata/types";

const GROUP_LABELS: Record<MetadataGroupId, string> = {
  c2pa: "C2PA Content Credentials",
  "png-text": "PNG text chunks",
  xmp: "XMP",
  iptc: "IPTC",
  gps: "GPS location",
  document: "Document properties",
  people: "Authors and reviewers",
  device: "Device",
  tags: "Tags",
  custom: "Custom properties",
  software: "Software",
  dates: "Dates",
  attachments: "Embedded files and pictures",
  exif: "EXIF",
  icc: "Color profile",
};

const GROUP_ORDER = Object.keys(GROUP_LABELS) as MetadataGroupId[];

const MAX_VALUE_LENGTH = 240;

export function stringify(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (value instanceof Uint8Array) return binaryLabel(value.byteLength);
  if (Array.isArray(value)) return value.map(stringify).join(", ");
  if (value && typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function binaryLabel(bytes: number, kind = "binary") {
  return `<${kind}, ${bytes.toLocaleString("en-US")} bytes>`;
}

function truncate(value: string) {
  return value.length > MAX_VALUE_LENGTH ? `${value.slice(0, MAX_VALUE_LENGTH)}…` : value;
}

export function toEntry(key: string, raw: unknown, ai?: boolean): MetadataEntry {
  const value = stringify(raw).trim();
  return { key, value: truncate(value), ai: ai ?? isAiTag(key, value) };
}

export function createReport() {
  const buckets = new Map<MetadataGroupId, MetadataEntry[]>();

  const add = (id: MetadataGroupId, entries: MetadataEntry[]) => {
    const filled = entries.filter((entry) => entry.value !== "");
    if (filled.length) buckets.set(id, [...(buckets.get(id) ?? []), ...filled]);
  };

  return {
    add,
    entry(id: MetadataGroupId, key: string, raw: unknown, ai?: boolean) {
      if (raw === undefined || raw === null) return;
      add(id, [toEntry(key, raw, ai)]);
    },
    build(details: ReportDetails): MetadataReport {
      const groups: MetadataGroup[] = GROUP_ORDER.filter((id) => buckets.has(id)).map((id) => ({
        id,
        label: GROUP_LABELS[id],
        entries: [...buckets.get(id)!].sort((a, b) => Number(b.ai) - Number(a.ai)),
      }));
      const all = groups.flatMap((group) => group.entries);

      return {
        ...details,
        groups,
        totalTags: all.length,
        aiTags: all.filter((entry) => entry.ai).length,
      };
    },
  };
}

export type ReportBuilder = ReturnType<typeof createReport>;

const NON_IDENTIFYING_GROUPS = new Set<MetadataGroupId>(["icc"]);

export function leftoverTagCount(report: MetadataReport) {
  return report.groups
    .filter((group) => !NON_IDENTIFYING_GROUPS.has(group.id))
    .reduce((total, group) => total + group.entries.length, 0);
}
