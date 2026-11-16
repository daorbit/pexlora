import { z } from "zod";
import { AI_TEXT_LIMITS } from "@/config/limits";
import { countWords } from "@/lib/ai/text-stats";
import { HUMANIZE_TONES } from "@/lib/ai/types";

export const aiTextSchema = z.object({
  text: z
    .string()
    .trim()
    .max(AI_TEXT_LIMITS.maxCharacters, `Keep the text under ${AI_TEXT_LIMITS.maxCharacters} characters.`)
    .refine((text) => countWords(text) >= AI_TEXT_LIMITS.minWords, {
      message: `Add at least ${AI_TEXT_LIMITS.minWords} words for a reliable result.`,
    }),
});

export const humanizeSchema = aiTextSchema.extend({
  tone: z.enum(HUMANIZE_TONES).default("natural"),
});

export const metadataReportSchema = z.object({
  report: z.object({
    format: z.string(),
    totalTags: z.number(),
    aiTags: z.number(),
    width: z.number().optional(),
    height: z.number().optional(),
    duration: z.number().optional(),
    groups: z
      .array(
        z.object({
          id: z.string(),
          label: z.string(),
          entries: z.array(z.object({ key: z.string(), value: z.string(), ai: z.boolean() })).max(500),
        }),
      )
      .max(30),
  }),
});
