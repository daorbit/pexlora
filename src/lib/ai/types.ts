export type ImageInsights = {
  altText: string;
  description: string;
  keywords: string[];
  fileName: string;
};

export type FindingLevel = "high" | "medium" | "low";

export type MetadataExplanation = {
  summary: string;
  findings: { title: string; detail: string; level: FindingLevel }[];
  advice: string;
};

export type TextVerdict = "likely-ai" | "mixed" | "likely-human";

export type TextStats = {
  words: number;
  sentences: number;
  averageSentenceLength: number;
  variation: number;
  vocabulary: number;
};

export type SentenceFinding = { text: string; level: FindingLevel };

export type AiTextReport = {
  score: number;
  modelScore?: number;
  patternScore?: number;
  verdict: TextVerdict;
  summary: string;
  signals: string[];
  phrases: string[];
  stats: TextStats;
  sentences?: SentenceFinding[];
};

export const HUMANIZE_TONES = ["natural", "casual", "professional", "academic", "simple"] as const;
export type HumanizeTone = (typeof HUMANIZE_TONES)[number];

export const HUMANIZE_STRENGTHS = ["light", "balanced", "strong"] as const;
export type HumanizeStrength = (typeof HUMANIZE_STRENGTHS)[number];

export type HumanizedText = { text: string };

export type AiResponse<T> = T & { quotaRemaining: number | null };
