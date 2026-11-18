import type { TextVerdict } from "@/lib/ai/types";

export function verdictFor(score: number): TextVerdict {
  if (score >= 65) return "likely-ai";
  if (score >= 35) return "mixed";
  return "likely-human";
}
