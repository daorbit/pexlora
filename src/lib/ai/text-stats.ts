import type { TextStats } from "@/lib/ai/types";

const AI_PHRASES = [
  "delve",
  "tapestry",
  "testament to",
  "in today's fast-paced",
  "in today's digital",
  "it's important to note",
  "it is important to note",
  "navigate the complexities",
  "ever-evolving",
  "landscape of",
  "unlock the",
  "embark on",
  "a myriad of",
  "seamlessly",
  "furthermore",
  "moreover",
  "in conclusion",
  "plays a crucial role",
  "foster",
  "elevate your",
  "harness the power",
  "game-changer",
];

export function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function splitSentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => countWords(sentence) > 0);
}

export function textStats(text: string): TextStats {
  const sentences = splitSentences(text);
  const lengths = sentences.map(countWords);
  const words = countWords(text);
  const mean = lengths.reduce((sum, length) => sum + length, 0) / Math.max(lengths.length, 1);
  const variance = lengths.reduce((sum, length) => sum + (length - mean) ** 2, 0) / Math.max(lengths.length, 1);
  const tokens = text.toLowerCase().match(/[a-z']+/g) ?? [];

  return {
    words,
    sentences: sentences.length,
    averageSentenceLength: Math.round(mean * 10) / 10,
    variation: mean ? Math.round((Math.sqrt(variance) / mean) * 100) / 100 : 0,
    vocabulary: tokens.length ? Math.round((new Set(tokens).size / tokens.length) * 100) / 100 : 0,
  };
}

export function findAiPhrases(text: string) {
  const lower = text.toLowerCase();
  return AI_PHRASES.filter((phrase) => lower.includes(phrase));
}

export function heuristicScore(stats: TextStats, phraseCount: number) {
  const uniformity = Math.max(0, Math.min(1, (0.6 - stats.variation) / 0.4));
  const phrases = Math.min(1, phraseCount / 4);
  return Math.round((uniformity * 0.6 + phrases * 0.4) * 100);
}
