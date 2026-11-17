export const AI_MODELS = {
  text: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  structure: "@cf/meta/llama-3.1-8b-instruct",
  vision: "@cf/meta/llama-3.2-11b-vision-instruct",
} as const;

export type AiModel = (typeof AI_MODELS)[keyof typeof AI_MODELS];

type NeuronRates = { inputPerMillion: number; outputPerMillion: number; fallback: number };

export const MODEL_NEURONS: Record<AiModel, NeuronRates> = {
  [AI_MODELS.text]: { inputPerMillion: 26_668, outputPerMillion: 204_805, fallback: 150 },
  [AI_MODELS.structure]: { inputPerMillion: 25_608, outputPerMillion: 75_147, fallback: 60 },
  [AI_MODELS.vision]: { inputPerMillion: 4_410, outputPerMillion: 61_493, fallback: 60 },
};

export type TokenUsage = { prompt_tokens?: number; completion_tokens?: number };

export function neuronsFor(model: AiModel, usage: TokenUsage | undefined) {
  const rates = MODEL_NEURONS[model];
  if (!usage?.prompt_tokens && !usage?.completion_tokens) return rates.fallback;
  const input = ((usage.prompt_tokens ?? 0) * rates.inputPerMillion) / 1_000_000;
  const output = ((usage.completion_tokens ?? 0) * rates.outputPerMillion) / 1_000_000;
  return Math.ceil(input + output);
}
