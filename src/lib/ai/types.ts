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

export type AiTextReport = {
  score: number;
  verdict: TextVerdict;
  summary: string;
  signals: string[];
  phrases: string[];
  stats: TextStats;
};

export type AiResponse<T> = T & { quotaRemaining: number | null };
