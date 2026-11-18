import { AI_NAME } from "@/config/brand";
import { AI_DAILY_LIMITS, AI_TEXT_LIMITS } from "@/config/limits";
import type { HumanLevel, HumanSignal } from "@/lib/ai/human-score";
import type { FindingLevel, HumanizeStrength, HumanizeTone, TextVerdict } from "@/lib/ai/types";

export const aiCopy = {
  resting: `${AI_NAME} has used today's free capacity. It's back after midnight UTC (5:30 AM IST). Every other tool still works.`,
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
  wordProgress: (words: number, min: number) => `${words} / ${min} words`,
  moreWords: (count: number) => `Add ${count} More ${count === 1 ? "Word" : "Words"}`,
  detectorSteps: [
    "Splitting your text into sentences",
    "Measuring sentence rhythm",
    "Spotting stock AI phrases",
    `Asking ${AI_NAME} for a verdict`,
    "Scoring each sentence",
  ],
  spectrum: [
    { label: "Human", range: "0 to 34" },
    { label: "Mixed", range: "35 to 64" },
    { label: "AI", range: "65 to 100" },
  ],
  breakdownTitle: "How the score is made",
  breakdown: {
    model: `${AI_NAME} judgement`,
    pattern: "Writing patterns",
  },
  breakdownNote: "70% model, 30% patterns",
  signals: "Why we think so",
  sentencesTitle: "Sentence by sentence",
  sentenceSummary: (flagged: number, total: number) =>
    `${flagged} of ${total} ${total === 1 ? "sentence looks" : "sentences look"} AI-written`,
  sentenceLevels: {
    high: "Likely AI",
    medium: "Some AI patterns",
    low: "Reads human",
  } satisfies Record<FindingLevel, string>,
  highlighted: "Phrases that sound machine-written",
  patternsTitle: "Writing signals (higher reads more human)",
  stats: {
    sentences: "Sentences",
    averageSentenceLength: "Avg. sentence",
    variation: "Rhythm variation",
    vocabulary: "Vocabulary range",
  },
  toHumanizer: "Humanize This Text",
  disclaimer:
    "AI detection is an estimate, not proof. No detector is fully reliable, so never use this score alone to judge someone's work.",
  sampleText:
    "In today's fast-paced digital landscape, it is important to note that effective communication plays a crucial role in the success of any organization. Moreover, by leveraging innovative strategies and fostering a culture of collaboration, teams can unlock their full potential and navigate the complexities of the modern workplace. Furthermore, embracing continuous learning allows individuals to elevate their skills and remain competitive. In conclusion, organizations that prioritize these elements will be well-positioned to thrive in an ever-evolving environment.",
};

export const humanizerCopy = {
  run: "Humanize Text",
  running: "Humanizing…",
  again: "Humanize Again",
  tone: "Tone",
  strength: "Strength",
  tones: {
    natural: "Natural",
    casual: "Casual",
    professional: "Professional",
    academic: "Academic",
    simple: "Simple",
  } satisfies Record<HumanizeTone, string>,
  strengths: { light: "Light", balanced: "Balanced", strong: "Strong" } satisfies Record<HumanizeStrength, string>,
  output: "Humanized text",
  outputEmpty: "Your humanized text and its human score will appear here.",
  liveScore: (score: number) => `${score}% human`,
  liveScoreLabel: "Human score of your text",
  steps: ["Reading your text", "Breaking the robotic rhythm", "Swapping stock phrases", "Varying sentence openers", "Polishing the flow"],
  scoreLabel: "Human score",
  before: "Before",
  after: "After",
  points: (delta: number) => `${delta > 0 ? "+" : ""}${delta} points`,
  levels: {
    human: "Reads like a person",
    mostly: "Mostly natural",
    robotic: "Still sounds machine-made",
  } satisfies Record<HumanLevel, string>,
  showChanges: "Highlight Changes",
  signalsTitle: "What changed in the writing",
  signals: {
    rhythm: "Sentence rhythm",
    phrases: "Free of stock phrases",
    openers: "Varied openers",
    short: "Short, punchy lines",
    contractions: "Everyday contractions",
    vocabulary: "Word variety",
  } satisfies Record<HumanSignal, string>,
  removedTitle: "Stock phrases removed",
  stats: {
    changed: "Words changed",
    readingEase: "Reading ease",
    words: "Words",
  },
  toDetector: "Check with AI Detector",
  personalTip:
    "Make it yours: add a real example, a number or your own opinion. Readers notice generic writing, and only you can add what you actually know.",
  disclaimer:
    "The human score is an estimate from writing signals such as rhythm, stock phrases and sentence openers. It is not a guarantee about any AI detector. Follow your school's or employer's rules on AI use.",
  fileName: "humanized-text.txt",
};

export const aiToolRelatedGuides = {
  "ai-text-detector": ["ai-metadata-checker", "ai-image-cleaner", "remove-chatgpt-image-metadata", "remove-c2pa-content-credentials"],
  "ai-humanizer": ["ai-metadata-checker", "ai-image-cleaner", "remove-chatgpt-image-metadata", "remove-c2pa-content-credentials"],
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
  "ai-humanizer": [
    {
      question: "How does the AI humanizer work?",
      answer:
        `${AI_NAME} rewrites your text in the tone and strength you pick. It mixes short and long sentences, varies how sentences start, swaps stock phrases such as "delve", "moreover" and "in today's fast-paced world" for plain words, and adds contractions where the tone allows. Facts, names and numbers are kept.`,
    },
    {
      question: "What does the human score mean?",
      answer:
        "It's an estimate from six writing signals: sentence rhythm, stock phrases, sentence openers, short lines, contractions and word variety. You see the score of your text before and after, and how each signal changed.",
    },
    {
      question: "Will the result pass AI detectors?",
      answer:
        "We don't promise that, and no honest tool can. Detectors disagree with each other and change often. The goal is clearer, more natural writing. Always read the result, add your own knowledge and follow your school's or employer's rules on AI use.",
    },
    {
      question: "What do Light, Balanced and Strong do?",
      answer:
        "Light keeps your structure and fixes stiff wording. Balanced rewrites each paragraph in new words. Strong writes it fresh from the ideas, so almost no original wording survives. Use Humanize Again to take the result one step further.",
    },
    {
      question: "Is my text stored?",
      answer: `No. Your text is sent to ${AI_NAME} to be rewritten and is not saved by Pexlora. The last result stays on your device for 24 hours so you don't lose it on reload.`,
    },
  ],
};
