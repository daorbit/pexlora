import "server-only";
import { generateJson } from "@/lib/ai/cloudflare";
import { AI_MODELS } from "@/lib/ai/models";
import type { MetadataExplanation } from "@/lib/ai/types";
import type { MetadataReport } from "@/lib/metadata/types";

const MAX_ENTRIES_PER_GROUP = 14;
const MAX_PROMPT_CHARACTERS = 5000;

const schema = {
  type: "object",
  properties: {
    summary: { type: "string" },
    findings: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          detail: { type: "string" },
          level: { type: "string", enum: ["high", "medium", "low"] },
        },
        required: ["title", "detail", "level"],
      },
    },
    advice: { type: "string" },
  },
  required: ["summary", "findings", "advice"],
};

function compactReport(report: MetadataReport) {
  const lines = [`Format: ${report.format}. Total tags: ${report.totalTags}. AI tags: ${report.aiTags}.`];
  for (const group of report.groups) {
    lines.push(`\n[${group.label}]`);
    for (const entry of group.entries.slice(0, MAX_ENTRIES_PER_GROUP)) {
      lines.push(`${entry.ai ? "(AI) " : ""}${entry.key}: ${entry.value.slice(0, 90)}`);
    }
  }
  return lines.join("\n").slice(0, MAX_PROMPT_CHARACTERS);
}

export async function explainMetadata(report: MetadataReport): Promise<MetadataExplanation> {
  const result = await generateJson<MetadataExplanation>(
    [
      {
        role: "system",
        content:
          "You explain file metadata to non-technical people. Be specific about what the tags reveal: location, device, people, software, AI generation, dates. summary: 2 sentences. findings: up to 5 items, ordered by privacy risk, level high for location, personal names or AI generation, medium for device and dates, low for technical data. advice: one sentence on what to do before sharing. Never invent tags that are not listed.",
      },
      { role: "user", content: compactReport(report) },
    ],
    schema,
    700,
    AI_MODELS.structure,
  );

  return {
    summary: String(result.summary ?? "").trim(),
    findings: (Array.isArray(result.findings) ? result.findings : []).slice(0, 5),
    advice: String(result.advice ?? "").trim(),
  };
}
