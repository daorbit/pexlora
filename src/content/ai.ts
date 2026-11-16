import { AI_NAME } from "@/config/brand";
import { AI_DAILY_LIMITS, AI_TEXT_LIMITS } from "@/config/limits";
import type { FindingLevel, TextVerdict } from "@/lib/ai/types";

export const aiCopy = {
  copy: "Copy",
  copied: "Copied",
  fillWithAi: `Fill with ${AI_NAME}`,
  fillHint: `Add an image first, then let ${AI_NAME} write the description and keywords.`,
  explain: `Explain with ${AI_NAME}`,
  altTextReady: (count: number) => `Alt text ready for ${count} ${count === 1 ? "image" : "images"}.`,
  explainHint: "See in plain words what these tags reveal",
  explaining: "Reading the tags…",
  explanationTitle: `${AI_NAME}: what this file reveals`,
  advice: "Before you share",
  levels: { high: "High risk", medium: "Medium", low: "Low" } satisfies Record<FindingLevel, string>,
  insights: {
    altText: "Alt text",
    description: "Description",
    keywords: "Keywords",
    fileName: "SEO file name",
  },
  limitNote: `${AI_NAME} tools are free for ${AI_DAILY_LIMITS.anonymous} requests a day, or ${AI_DAILY_LIMITS.user} with a free account.`,
};

export const textToolCopy = {
  placeholder: "Paste or type your text here…",
  inputLabel: "Your text",
  paste: "Paste Text",
  pasteFailed: "Couldn't read your clipboard. Press Ctrl+V in the box instead.",
  orType: "or start typing",
  shortcut: "Ctrl + Enter",
  download: "Download",
  share: "Share",
  shared: "Copied to share",
  tryAgain: "Try Again",
  resultEmpty: "Your AI score will appear here.",
  resultLabel: "Result",
  shareResult: (score: number) => `This text scored ${score}% AI likelihood on Pexlora's AI Text Detector.`,
  sample: "Try a Sample",
  clear: "Clear",
  words: (count: number) => `${count} ${count === 1 ? "word" : "words"}`,
  minimum: `Add at least ${AI_TEXT_LIMITS.minWords} words.`,
  maxCharacters: AI_TEXT_LIMITS.maxCharacters,
  detect: "Check Text",
  detecting: "Checking…",
  verdicts: {
    "likely-ai": "Likely AI-written",
    mixed: "Mixed or edited",
    "likely-human": "Likely human-written",
  } satisfies Record<TextVerdict, string>,
  scoreLabel: "AI likelihood",
  signals: "Why we think so",
  highlighted: "Phrases that sound machine-written",
  stats: {
    sentences: "Sentences",
    averageSentenceLength: "Avg. sentence",
    variation: "Rhythm variation",
    vocabulary: "Vocabulary range",
  },
  disclaimer:
    "AI detection is an estimate, not proof. No detector is fully reliable, so never use this score alone to judge someone's work.",
  sampleText:
    "In today's fast-paced digital landscape, it is important to note that effective communication plays a crucial role in the success of any organization. Moreover, by leveraging innovative strategies and fostering a culture of collaboration, teams can unlock their full potential and navigate the complexities of the modern workplace. Furthermore, embracing continuous learning allows individuals to elevate their skills and remain competitive. In conclusion, organizations that prioritize these elements will be well-positioned to thrive in an ever-evolving environment.",
};

export const aiToolFaqs = {
  "ai-text-detector": [
    {
      question: "How does the AI text detector work?",
      answer:
        `We combine ${AI_NAME}'s judgement with writing statistics: how much sentence length varies, how wide the vocabulary is and how often typical AI phrases appear. The result is a likelihood score from 0 to 100.`,
    },
    {
      question: "Is the result 100% accurate?",
      answer:
        "No detector is. Short texts, edited AI drafts and very formal human writing can all be misjudged. Treat the score as a hint and look at the highlighted phrases yourself.",
    },
    {
      question: "Is my text stored?",
      answer: `No. Your text is sent to ${AI_NAME} to be analysed and is not saved by Pexlora.`,
    },
  ],
};
