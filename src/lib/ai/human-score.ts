import { AI_PHRASES, countWords, splitSentences } from "@/lib/ai/text-stats";

export const HUMAN_SIGNALS = ["rhythm", "phrases", "openers", "short", "contractions", "vocabulary"] as const;
export type HumanSignal = (typeof HUMAN_SIGNALS)[number];

export type HumanScore = {
  score: number;
  signals: Record<HumanSignal, number>;
  phrases: string[];
  readingEase: number;
};

const weights: Record<HumanSignal, number> = {
  rhythm: 0.3,
  phrases: 0.25,
  openers: 0.15,
  short: 0.12,
  contractions: 0.1,
  vocabulary: 0.08,
};

const TRANSITIONS =
  /^(moreover|furthermore|additionally|in addition|however|overall|ultimately|in conclusion|in summary|firstly|secondly|thirdly|lastly|finally|consequently|therefore|thus|notably|importantly|as a result|on the other hand|in today's|by contrast|similarly|subsequently)\b/i;

const CONTRACTION = /\b(?:[a-z]+n['’]t|[a-z]+['’](?:re|ve|ll|d|m)|(?:it|that|there|here|what|who|he|she|let)['’]s)\b/gi;

const clamp = (value: number) => Math.max(0, Math.min(1, value));

function rhythm(lengths: number[]) {
  if (lengths.length < 3) return 0.5;
  const mean = lengths.reduce((sum, length) => sum + length, 0) / lengths.length;
  const variance = lengths.reduce((sum, length) => sum + (length - mean) ** 2, 0) / lengths.length;
  return clamp((Math.sqrt(variance) / mean - 0.2) / 0.4);
}

function openers(sentences: string[]) {
  if (sentences.length < 2) return 0.5;
  const firstWords = sentences.map((sentence) => sentence.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z']/g, ""));
  const transitions = sentences.filter((sentence) => TRANSITIONS.test(sentence)).length / sentences.length;
  const repeats = firstWords.filter((word, index) => index > 0 && word === firstWords[index - 1]).length / sentences.length;
  return clamp(1 - transitions / 0.3 - repeats / 0.3);
}

function vocabulary(tokens: string[]) {
  const window = 50;
  if (tokens.length < window) return clamp((new Set(tokens).size / Math.max(tokens.length, 1) - 0.55) / 0.3);
  let total = 0;
  let count = 0;
  for (let start = 0; start + window <= tokens.length; start += 10) {
    total += new Set(tokens.slice(start, start + window)).size / window;
    count += 1;
  }
  return clamp((total / count - 0.6) / 0.2);
}

function syllables(word: string) {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, "");
  if (cleaned.length <= 3) return 1;
  const groups = cleaned.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").match(/[aeiouy]{1,2}/g);
  return Math.max(1, groups?.length ?? 1);
}

function readingEase(words: string[], sentenceCount: number) {
  if (!words.length || !sentenceCount) return 0;
  const syllableCount = words.reduce((sum, word) => sum + syllables(word), 0);
  const score = 206.835 - 1.015 * (words.length / sentenceCount) - 84.6 * (syllableCount / words.length);
  return Math.round(Math.max(0, Math.min(100, score)));
}

export function humanScore(text: string): HumanScore {
  const sentences = splitSentences(text);
  const lengths = sentences.map(countWords);
  const words = text.match(/[A-Za-z'’]+/g) ?? [];
  const tokens = words.map((word) => word.toLowerCase());
  const lower = text.toLowerCase();
  const phrases = AI_PHRASES.filter((phrase) => lower.includes(phrase));
  const phraseHits = AI_PHRASES.reduce((sum, phrase) => sum + (lower.split(phrase).length - 1), 0);
  const per100 = (phraseHits * 100) / Math.max(words.length, 1);

  const signals: Record<HumanSignal, number> = {
    rhythm: rhythm(lengths),
    phrases: clamp(1 - per100 / 2.5),
    openers: openers(sentences),
    short: clamp(lengths.filter((length) => length <= 8).length / Math.max(lengths.length, 1) / 0.2),
    contractions: clamp((text.match(CONTRACTION)?.length ?? 0) / Math.max(sentences.length, 1) / 0.35),
    vocabulary: vocabulary(tokens),
  };

  const score = HUMAN_SIGNALS.reduce((sum, key) => sum + signals[key] * weights[key], 0);

  return {
    score: Math.round(score * 100),
    signals,
    phrases,
    readingEase: readingEase(words, sentences.length),
  };
}

export type HumanLevel = "human" | "mostly" | "robotic";

export function humanLevel(score: number): HumanLevel {
  if (score >= 70) return "human";
  if (score >= 45) return "mostly";
  return "robotic";
}
