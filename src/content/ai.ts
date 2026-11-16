import { AI_DAILY_LIMITS, AI_TEXT_LIMITS } from "@/config/limits";
import type { FindingLevel, HumanizeTone, TextVerdict } from "@/lib/ai/types";

export const aiCopy = {
  copy: "Copy",
  copied: "Copied",
  fillWithAi: "Fill with AI",
  fillHint: "Add an image first, then let AI write the description and keywords.",
  explain: "Explain with AI",
  explaining: "Reading the tags…",
  explanationTitle: "What this file reveals",
  advice: "Before you share",
  levels: { high: "High risk", medium: "Medium", low: "Low" } satisfies Record<FindingLevel, string>,
  insights: {
    altText: "Alt text",
    description: "Description",
    keywords: "Keywords",
    fileName: "SEO file name",
  },
  limitNote: `AI tools are free for ${AI_DAILY_LIMITS.anonymous} requests a day, or ${AI_DAILY_LIMITS.user} with a free account.`,
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
  outputEmpty: "Your humanized text will appear here.",
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
  humanize: "Humanize Text",
  humanizing: "Rewriting…",
  tone: "Tone",
  tones: {
    natural: "Natural",
    casual: "Casual",
    professional: "Professional",
    simple: "Simple",
  } satisfies Record<HumanizeTone, string>,
  output: "Rewritten text",
  personalTip:
    "Make it yours: add a real example, a number or your own opinion. Detectors and readers both notice generic writing, and only you can add what you actually know.",
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
  toHumanizer: "Humanize This Text",
  toDetector: "Check with AI Detector",
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
        "We combine an AI model's judgement with writing statistics: how much sentence length varies, how wide the vocabulary is and how often typical AI phrases appear. The result is a likelihood score from 0 to 100.",
    },
    {
      question: "Is the result 100% accurate?",
      answer:
        "No detector is. Short texts, edited AI drafts and very formal human writing can all be misjudged. Treat the score as a hint and look at the highlighted phrases yourself.",
    },
    {
      question: "Is my text stored?",
      answer: "No. Your text is sent to the AI model to be analysed and is not saved by Pexlora.",
    },
  ],
  "ai-humanizer": [
    {
      question: "What does the AI humanizer change?",
      answer:
        "It varies sentence rhythm, removes filler and clichés such as \"delve\" and \"moreover\", and uses plainer words in the tone you pick. Facts, names and numbers are kept.",
    },
    {
      question: "Will the result pass AI detectors?",
      answer:
        "We don't promise that. The goal is clearer, more natural writing. Always read the result, add your own knowledge and follow your school's or employer's rules on AI use.",
    },
    {
      question: "Is my text stored?",
      answer: "No. Your text is sent to the AI model to be rewritten and is not saved by Pexlora.",
    },
  ],
};
