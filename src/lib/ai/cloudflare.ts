import "server-only";
import { ApiError } from "@/lib/api/errors";
import { AI_MODELS } from "@/lib/ai/models";
import { env } from "@/lib/env";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string | ({ type: "text"; text: string } | { type: "image_url"; image_url: { url: string } })[];
};

type CloudflareEnvelope = {
  success: boolean;
  errors?: { message: string; code: number }[];
  result?: {
    response?: unknown;
    choices?: { message?: { content?: string | null } }[];
  };
};

const BUSY_MESSAGE = "Our AI is busy right now. Please try again in a minute.";

async function runModel(model: string, body: Record<string, unknown>) {
  const { accountId, apiToken } = env.cloudflareAi;
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch((error) => {
    console.error("Workers AI unreachable", error);
    throw new ApiError(BUSY_MESSAGE, 503);
  });

  const data = (await response.json().catch(() => null)) as CloudflareEnvelope | null;
  if (!response.ok || !data?.success) {
    console.error("Workers AI request failed", response.status, data?.errors);
    throw new ApiError(BUSY_MESSAGE, response.status === 429 ? 429 : 503);
  }

  return data.result ?? {};
}

function outputOf(result: CloudflareEnvelope["result"] & object) {
  if (result.response !== undefined) return result.response;
  return result.choices?.[0]?.message?.content ?? "";
}

function parseJson<T>(value: unknown): T {
  if (typeof value !== "string") return value as T;
  const match = value.match(/\{[\s\S]*\}/);
  try {
    return JSON.parse(match ? match[0] : value) as T;
  } catch {
    throw new ApiError("The AI returned an unexpected answer. Please try again.", 502);
  }
}

export async function generateText(messages: ChatMessage[], maxTokens = 600) {
  const output = outputOf(await runModel(AI_MODELS.text, { messages, max_tokens: maxTokens }));
  return String(output).trim();
}

export async function generateJson<T>(messages: ChatMessage[], schema: Record<string, unknown>, maxTokens = 600) {
  const result = await runModel(AI_MODELS.text, {
    messages,
    max_tokens: maxTokens,
    response_format: { type: "json_schema", json_schema: schema },
  });
  return parseJson<T>(outputOf(result));
}

export async function describeImage(dataUrl: string, prompt: string, maxTokens = 300) {
  const output = outputOf(
    await runModel(AI_MODELS.vision, {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
      max_tokens: maxTokens,
    }),
  );
  return String(output).trim();
}
