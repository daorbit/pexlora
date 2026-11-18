import "server-only";
import { generateText } from "@/lib/ai/cloudflare";
import { plainWords } from "@/lib/ai/plain-words";
import type { HumanizeStrength, HumanizeTone, HumanizedText } from "@/lib/ai/types";

const toneGuides: Record<HumanizeTone, string> = {
  natural: "a natural, conversational but polished voice, like a smart person explaining it to a colleague",
  casual: "a relaxed, friendly voice, like a message to a friend. Contractions, short punchy lines and the odd question are welcome",
  professional: "a clear, confident professional voice for work email or a report, without corporate jargon or buzzwords",
  academic: "a careful academic voice for essays and papers: precise, measured and formal, no contractions, no slang, but never padded or robotic",
  simple: "plain, simple English that a 12-year-old could follow: short words, short sentences, one idea at a time",
};

const strengthGuides: Record<HumanizeStrength, string> = {
  light:
    "Light edit: keep the structure and most sentences. Swap stock phrases, vary a few sentence lengths and fix stiff wording. Change roughly a third of the text.",
  balanced:
    "Full rewrite: rebuild each paragraph in your own words. Reorder clauses, merge or split sentences, and change most of the wording while keeping the meaning.",
  strong:
    "Deep rewrite: write it fresh as if you had only read the original once and are now explaining it from memory. Restructure sentences and paragraphs freely. Almost no wording should survive.",
};

const temperatures: Record<HumanizeStrength, number> = { light: 0.6, balanced: 0.85, strong: 1 };

const BANNED =
  "delve, tapestry, testament, landscape, realm, crucial, pivotal, vital, paramount, leverage, utilize, foster, unlock, unleash, potential, navigate, complexities, elevate, empower, embrace, seamless, robust, holistic, synergy, innovative, cutting-edge, transformative, ever-evolving, fast-paced, game-changer, well-positioned, thrive, showcase, underscore, moreover, furthermore, additionally, in conclusion, in summary, overall, ultimately, it is important to note, it is worth noting, plays a role, in today's world, when it comes to, a myriad of, a plethora of";

const example = {
  before:
    "In today's fast-paced world, effective time management plays a crucial role in achieving success. Moreover, by leveraging proven strategies, individuals can unlock their full potential and navigate the complexities of daily life.",
  after:
    "Most of us don't have a time problem. We have a priorities problem. Pick the two or three things that actually matter today, do those first, and let the rest wait - it's a simple habit, but it changes how much you get done.",
};

function systemPrompt(tone: HumanizeTone, strength: HumanizeStrength) {
  return [
    `You are a sharp human editor. Rewrite the user's text so it reads like a real person wrote it, in ${toneGuides[tone]}.`,
    strengthGuides[strength],
    "",
    "How real people write, and what you must do:",
    "- Burstiness: mix sentence lengths hard. Put some very short sentences (2 to 7 words) right next to long, flowing ones. Never write three sentences of similar length in a row.",
    "- Start sentences in different ways: a subject, a verb, \"you\", \"but\", \"so\", a short clause. Never start two sentences in a row with the same word or with a transition word.",
    "- Use everyday words and concrete verbs. Say things directly. Cut filler, hedging and throat-clearing.",
    "- Let the text have a point of view in how it frames things (what matters most, what is surprising), without adding new facts.",
    "- A question, a short aside in brackets or a plain dash now and then is fine. No em dashes.",
    "- Avoid tidy summaries and lists of three adjectives. Don't end with a moral or a conclusion sentence unless the original has one.",
    "",
    `Never use these words or phrases, or close variants: ${BANNED}.`,
    "",
    "Hard rules:",
    "- Keep every fact, name, number, date, quote and technical term exactly. Keep the meaning. Never invent facts, examples, statistics, sources or personal stories.",
    "- Keep the original language. Keep the paragraph breaks, headings and list structure. Keep roughly the same length (within 20%).",
    "- Do not copy any run of 6 or more words from the original, except names, quotes and technical terms.",
    "- Reply with the rewritten text only. No title, no preface, no quotes around it, no notes.",
    "",
    "Example of the style (natural tone):",
    `Before: ${example.before}`,
    `After: ${example.after}`,
  ].join("\n");
}

const PREFACE = /^(?:sure|okay|ok|certainly|of course|here(?:'s| is| are))\b[^\n]*:\s*\n+/i;

function clean(output: string) {
  return output
    .replace(PREFACE, "")
    .replace(/^["“]|["”]$/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function humanizeText(
  text: string,
  tone: HumanizeTone,
  strength: HumanizeStrength,
): Promise<HumanizedText> {
  const output = await generateText(
    [
      { role: "system", content: systemPrompt(tone, strength) },
      { role: "user", content: text },
    ],
    Math.min(2200, Math.ceil(text.length / 2.6) + 250),
    { temperature: temperatures[strength], topP: 0.95 },
  );

  return { text: plainWords(clean(output), tone) };
}
