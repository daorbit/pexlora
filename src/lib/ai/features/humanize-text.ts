import "server-only";
import { generateText } from "@/lib/ai/cloudflare";
import type { HumanizeTone, HumanizedText } from "@/lib/ai/types";

const toneGuides: Record<HumanizeTone, string> = {
  natural: "a natural, conversational but polished voice",
  casual: "a relaxed, friendly voice, like a message to a colleague",
  professional: "a clear, confident professional voice without corporate jargon",
  simple: "plain, simple English that a 12-year-old could follow",
};

export async function humanizeText(text: string, tone: HumanizeTone): Promise<HumanizedText> {
  const output = await generateText(
    [
      {
        role: "system",
        content: `You rewrite text so it reads like a thoughtful person wrote it, in ${toneGuides[tone]}. Vary sentence length, use contractions where natural, prefer concrete words, and cut filler and clichés such as "delve", "in today's fast-paced world", "it's important to note", "moreover" and "in conclusion". Keep every fact, name, number and the original language. Do not add new claims. Keep roughly the same length and paragraph breaks. Reply with the rewritten text only.`,
      },
      { role: "user", content: text },
    ],
    Math.min(2000, Math.ceil(text.length / 2.5) + 200),
  );

  return { text: output.replace(/^["“]|["”]$/g, "").trim() };
}
