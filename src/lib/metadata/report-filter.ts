import type { MetadataEntry, MetadataGroup, MetadataGroupId, MetadataReport } from "@/lib/metadata/types";

export const REPORT_FILTERS = ["all", "ai", "sensitive"] as const;
export type ReportFilter = (typeof REPORT_FILTERS)[number];

const SENSITIVE_GROUPS = new Set<MetadataGroupId>(["gps", "people", "device", "dates"]);
const SENSITIVE_KEYS =
  /gps|latitude|longitude|altitude|location|city|state|country|sublocation|address|author|artist|creator|by-?line|owner|copyright|rights|lastmodifiedby|company|manager|email|phone|user|serial|^make$|^model$|lensmodel|lensmake|camera|hostname|computer|date/i;

function isSensitive(group: MetadataGroup, entry: MetadataEntry) {
  return SENSITIVE_GROUPS.has(group.id) || SENSITIVE_KEYS.test(entry.key);
}

function matchesFilter(filter: ReportFilter, group: MetadataGroup, entry: MetadataEntry) {
  if (filter === "ai") return entry.ai;
  if (filter === "sensitive") return isSensitive(group, entry);
  return true;
}

function matchesSearch(query: string, group: MetadataGroup, entry: MetadataEntry) {
  if (!query) return true;
  return [entry.key, entry.value, group.label].some((text) => text.toLowerCase().includes(query));
}

export function filterReport(report: MetadataReport, filter: ReportFilter, search: string): MetadataGroup[] {
  const query = search.trim().toLowerCase();
  return report.groups
    .map((group) => ({
      ...group,
      entries: group.entries.filter((entry) => matchesFilter(filter, group, entry) && matchesSearch(query, group, entry)),
    }))
    .filter((group) => group.entries.length > 0);
}

export function filterCounts(report: MetadataReport): Record<ReportFilter, number> {
  const pairs = report.groups.flatMap((group) => group.entries.map((entry) => ({ group, entry })));
  return {
    all: pairs.length,
    ai: pairs.filter(({ entry }) => entry.ai).length,
    sensitive: pairs.filter(({ group, entry }) => isSensitive(group, entry)).length,
  };
}
