import { AI_PHRASES } from "@/lib/ai/text-stats";
import type { FindingLevel } from "@/lib/ai/types";

const OPENER =
  /^(moreover|furthermore|additionally|in addition|overall|ultimately|in conclusion|in summary|consequently|notably|importantly|in today's|by leveraging|whether you're)\b/i;

export function sentenceLevel(sentence: string, flagged: boolean): FindingLevel {
  if (flagged) return "high";
  const lower = sentence.toLowerCase();
  const phrases = AI_PHRASES.filter((phrase) => lower.includes(phrase)).length;
  if (phrases >= 2 || (phrases === 1 && OPENER.test(sentence))) return "high";
  if (phrases === 1 || OPENER.test(sentence)) return "medium";
  return "low";
}
