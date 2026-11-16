import "server-only";
import { generateText } from "@/lib/ai/cloudflare";
import { plainWords } from "@/lib/ai/plain-words";
import type { HumanizeTone, HumanizedText } from "@/lib/ai/types";

const toneGuides: Record<HumanizeTone, string> = {
  natural: "a natural, conversational but polished voice",
  casual: "a relaxed, friendly voice, like a message to a colleague",
  professional: "a clear, confident professional voice without corporate jargon",
  simple: "plain, simple English that a 12-year-old could follow",
};

const BANNED_WORDS =
  "delve, tapestry, testament, landscape, realm, crucial, pivotal, vital, leverage, leveraging, utilize, foster, fostering, unlock, unleash, potential, navigate, complexities, elevate, empower, embrace, embracing, seamless, robust, holistic, synergy, innovative, cutting-edge, ever-evolving, fast-paced, well-positioned, thrive, moreover, furthermore, additionally, in conclusion, overall, ultimately, it is important to note, plays a role, in today's world";

function systemPrompt(tone: HumanizeTone) {
  return [
    `You are an experienced editor. Rewrite the user's text from scratch in your own words so it sounds like a real person explaining it to a colleague, in ${toneGuides[tone]}.`,
    "",
    "How real people write:",
    "- Mix sentence lengths a lot. Use some very short sentences (3 to 7 words) next to longer ones.",
    '- Start sentences in different ways. Use "you", "we" or plain statements.',
    "- Use contractions and everyday words. Say things directly, with concrete verbs.",
    "- A dash, a question or a short aside now and then is fine.",
    "",
    `Never use these words or phrases, or close variants: ${BANNED_WORDS}.`,
    "",
    "Rules:",
    "- Keep every fact, name and number, and keep the meaning. Do not invent new facts, examples or opinions.",
    "- Keep the original language, the paragraph breaks and roughly the same length.",
    "- Do not copy any phrase of 5 or more words from the original.",
    "- Reply with the rewritten text only. No title, no quotes, no notes.",
  ].join("\n");
}

export async function humanizeText(text: string, tone: HumanizeTone): Promise<HumanizedText> {
  const output = await generateText(
    [
      { role: "system", content: systemPrompt(tone) },
      { role: "user", content: text },
    ],
    Math.min(2000, Math.ceil(text.length / 2.5) + 200),
    { temperature: 0.9, topP: 0.95 },
  );

  return { text: plainWords(output.replace(/^["“]|["”]$/g, "").trim()) };
}
