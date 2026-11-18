import type { FindingLevel, TextVerdict } from "@/lib/ai/types";

export const verdictStyles: Record<TextVerdict, { stroke: string; text: string; badge: "warning" | "neutral" | "success" }> = {
  "likely-ai": { stroke: "stroke-warning", text: "text-warning", badge: "warning" },
  mixed: { stroke: "stroke-secondary", text: "text-secondary", badge: "neutral" },
  "likely-human": { stroke: "stroke-success", text: "text-success", badge: "success" },
};

export const sentenceStyles: Record<FindingLevel, { mark: string; dot: string }> = {
  high: { mark: "bg-warning-soft text-foreground underline decoration-warning decoration-2 underline-offset-4", dot: "bg-warning" },
  medium: { mark: "bg-transparent text-foreground underline decoration-warning/70 decoration-dotted decoration-2 underline-offset-4", dot: "bg-warning/45" },
  low: { mark: "", dot: "bg-success" },
};
