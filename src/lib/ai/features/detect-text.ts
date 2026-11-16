import "server-only";
import { generateJson } from "@/lib/ai/cloudflare";
import { findAiPhrases, heuristicScore, textStats } from "@/lib/ai/text-stats";
import type { AiTextReport, TextVerdict } from "@/lib/ai/types";

const schema = {
  type: "object",
  properties: {
    score: { type: "number" },
    summary: { type: "string" },
    signals: { type: "array", items: { type: "string" } },
    phrases: { type: "array", items: { type: "string" } },
  },
  required: ["score", "summary", "signals", "phrases"],
};

type ModelVerdict = { score: number; summary: string; signals: string[]; phrases: string[] };

function verdictFor(score: number): TextVerdict {
  if (score >= 65) return "likely-ai";
  if (score >= 35) return "mixed";
  return "likely-human";
}

export async function detectAiText(text: string): Promise<AiTextReport> {
  const stats = textStats(text);
  const knownPhrases = findAiPhrases(text);

  const model = await generateJson<ModelVerdict>(
    [
      {
        role: "system",
        content:
          "You estimate whether text was written by an AI language model. Look at uniform sentence rhythm, generic or hedging wording, list-like structure, overused AI phrases, lack of personal detail and perfect but bland grammar. score: 0 (clearly human) to 100 (clearly AI). summary: 2 sentences. signals: 3 to 5 short observations. phrases: up to 6 exact quotes copied from the text that sound most machine-written.",
      },
      { role: "user", content: text },
    ],
    schema,
    600,
  );

  const modelScore = Math.max(0, Math.min(100, Number(model.score) || 0));
  const score = Math.round(modelScore * 0.7 + heuristicScore(stats, knownPhrases.length) * 0.3);
  const quoted = (Array.isArray(model.phrases) ? model.phrases : [])
    .map((phrase) => String(phrase).trim())
    .filter((phrase) => phrase.length > 3 && text.includes(phrase));

  return {
    score,
    verdict: verdictFor(score),
    summary: String(model.summary ?? "").trim(),
    signals: (Array.isArray(model.signals) ? model.signals : []).map(String).slice(0, 5),
    phrases: [...new Set([...quoted, ...knownPhrases])].slice(0, 8),
    stats,
  };
}
