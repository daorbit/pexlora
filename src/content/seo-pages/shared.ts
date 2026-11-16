import { formatsOfKinds, type FileKind } from "@/config/file-formats";
import { DAILY_LIMITS, FILE_SIZE_LIMITS_MB, MAX_FILES_PER_BATCH } from "@/config/limits";
import { formatMegabytes } from "@/lib/utils/format-bytes";
import type { SeoFaq } from "@/content/seo-pages/types";

export const extensions = (kinds: FileKind[]) =>
  formatsOfKinds(kinds)
    .map((format) => format.label)
    .join(", ");

export const sizeLimit = (kind: FileKind) => formatMegabytes(FILE_SIZE_LIMITS_MB[kind]);

export const removedList = (items: string[]) => ({
  eyebrow: "What's removed",
  title: "Every hidden field, cleared in one pass.",
  items,
});

export const shownList = (items: string[]) => ({
  eyebrow: "What you'll see",
  title: "Every field, grouped and explained.",
  items,
});

export const faqs = {
  onDevice: {
    question: "Is my file uploaded?",
    answer:
      "No. The file is read and cleaned inside your browser, and the clean copy is built on your device. Only a counter for your daily limit is sent to our server.",
  },
  imagePrivacy: {
    question: "Are my images stored?",
    answer:
      "No. Images are sent over HTTPS, processed in memory and discarded as soon as the clean copy is returned. Nothing is written to disk.",
  },
  free: {
    question: "Is it free?",
    answer: `Yes. You can process ${DAILY_LIMITS.anonymous} files a day without an account, or ${DAILY_LIMITS.user} with a free account.`,
  },
  batch: {
    question: "Can I clean several files at once?",
    answer: `Yes. Add up to ${MAX_FILES_PER_BATCH} files, clean them together and download them one by one or as a zip.`,
  },
  inspectFree: {
    question: "Does viewing metadata count toward my daily limit?",
    answer: "No. Reading metadata is always free. Only cleaned files count.",
  },
  watermarks: {
    question: "Does this remove invisible AI watermarks like SynthID?",
    answer:
      "No. Invisible watermarks are mixed into the pixels, not stored as metadata. Pexlora removes metadata only and doesn't claim to beat AI detectors.",
  },
} satisfies Record<string, SeoFaq>;
