import type { C2paSummary } from "@/lib/metadata/c2pa";
import type { ReportBuilder } from "@/lib/metadata/report";

const SOURCE_TYPES: Record<string, { label: string; ai: boolean }> = {
  trainedAlgorithmicMedia: { label: "Created by generative AI", ai: true },
  compositeWithTrainedAlgorithmicMedia: { label: "Edited with generative AI", ai: true },
  algorithmicMedia: { label: "Created by an algorithm", ai: true },
  compositeSynthetic: { label: "Includes synthetic elements", ai: true },
  digitalCapture: { label: "Captured with a camera", ai: false },
  composite: { label: "Composite of several sources", ai: false },
};

export function addC2paEntries(report: ReportBuilder, summary: C2paSummary | null) {
  if (!summary) return;
  report.entry("c2pa", "Manifest", "Content Credentials embedded (signature not verified here)", true);
  if (summary.generator) report.entry("c2pa", "Made with", summary.generator, true);
  if (summary.sourceType) {
    const code = summary.sourceType.split("/").pop() ?? summary.sourceType;
    const known = SOURCE_TYPES[code];
    report.entry("c2pa", "Source type", known ? `${known.label} (${code})` : code, known?.ai);
  }
  if (summary.actions.length) report.entry("c2pa", "Recorded actions", summary.actions.join(", ").replaceAll("_", " "), true);
  if (summary.organizations.length) report.entry("c2pa", "Certificate organisations", summary.organizations.join(", "), true);
}
