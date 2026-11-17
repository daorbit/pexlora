import { revealCopy } from "@/content/workspace";
import type { MetadataEntry, MetadataReport } from "@/lib/metadata/types";

export type RevealKind = "ai" | "camera" | "author" | "date";

export type RevealFact = { kind: RevealKind; value: string };

const patterns: Record<Exclude<RevealKind, "ai">, RegExp> = {
  camera: /^(model|make|lensmodel)$/i,
  author: /^(artist|author|creator|dc:creator|lastmodifiedby|by-line|ownername)$/i,
  date: /^(datetimeoriginal|createdate|datecreated|creationdate|created)$/i,
};

const aiToolKeys = /^(made with|creatortool|software|generator)$/i;

function entries(report: MetadataReport) {
  return report.groups.flatMap((group) => group.entries);
}

function firstValue(list: MetadataEntry[], pattern: RegExp) {
  return list.find((entry) => pattern.test(entry.key) && entry.value.trim())?.value.trim();
}

export function revealFacts(report: MetadataReport): RevealFact[] {
  const list = entries(report);
  const facts: RevealFact[] = [];

  if (report.aiTags > 0) {
    const tool = firstValue(
      list.filter((entry) => entry.ai),
      aiToolKeys,
    );
    facts.push({ kind: "ai", value: tool || revealCopy.aiTags(report.aiTags) });
  }

  for (const kind of ["camera", "author", "date"] as const) {
    const value = firstValue(list, patterns[kind]);
    if (value) facts.push({ kind, value });
  }

  return facts;
}
