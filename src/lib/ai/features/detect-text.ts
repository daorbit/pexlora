import "server-only";
import { generateJson } from "@/lib/ai/cloudflare";
import { humanScore } from "@/lib/ai/human-score";
import { sentenceLevel } from "@/lib/ai/sentence-level";
import { splitSentences, textStats } from "@/lib/ai/text-stats";
import type { AiTextReport } from "@/lib/ai/types";
import { verdictFor } from "@/lib/ai/verdict";

const schema = {
  type: "object",
  properties: {
    score: { type: "number" },
    summary: { type: "string" },
    signals: { type: "array", items: { type: "string" } },
    phrases: { type: "array", items: { type: "string" } },
    aiSentences: { type: "array", items: { type: "number" } },
  },
  required: ["score", "summary", "signals", "phrases", "aiSentences"],
};

type ModelVerdict = { score: number; summary: string; signals: string[]; phrases: string[]; aiSentences: number[] };

const MODEL_WEIGHT = 0.7;

const SYSTEM_PROMPT = [
  "You estimate whether text was written by an AI language model. The sentences are numbered like [1].",
  "Look at uniform sentence rhythm, generic or hedging wording, list-like structure, overused AI phrases, transition-word openers, lack of personal detail or concrete specifics, and perfect but bland grammar.",
  "score: 0 (clearly human) to 100 (clearly AI).",
  "summary: 2 plain sentences that explain the verdict to a non-expert.",
  "signals: 3 to 5 short, specific observations about this text (not generic advice).",
  "phrases: up to 6 exact quotes copied from the text (without the [n] numbers) that sound most machine-written.",
  "aiSentences: the numbers of the sentences that most likely came from an AI model. Empty if none.",
].join("\n");

const strings = (value: unknown) => (Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean) : []);

export async function detectAiText(text: string): Promise<AiTextReport> {
  const sentences = splitSentences(text);
  const pattern = humanScore(text);
  const numbered = sentences.map((sentence, index) => `[${index + 1}] ${sentence}`).join("\n");

  const model = await generateJson<ModelVerdict>(
    [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: numbered },
    ],
    schema,
    700,
  );

  const modelScore = Math.round(Math.max(0, Math.min(100, Number(model.score) || 0)));
  const patternScore = 100 - pattern.score;
  const score = Math.round(modelScore * MODEL_WEIGHT + patternScore * (1 - MODEL_WEIGHT));
  const flagged = new Set(
    (Array.isArray(model.aiSentences) ? model.aiSentences : []).map(Number).filter(Number.isInteger),
  );
  const quoted = strings(model.phrases).filter((phrase) => phrase.length > 3 && text.includes(phrase));

  return {
    score,
    modelScore,
    patternScore,
    verdict: verdictFor(score),
    summary: String(model.summary ?? "").trim(),
    signals: strings(model.signals).slice(0, 5),
    phrases: [...new Set([...quoted, ...pattern.phrases])].slice(0, 8),
    stats: textStats(text),
    sentences: sentences.map((sentence, index) => ({ text: sentence, level: sentenceLevel(sentence, flagged.has(index + 1)) })),
  };
}
