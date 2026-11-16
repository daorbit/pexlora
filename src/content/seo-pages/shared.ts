import { fileKinds, formatsOfKinds, type FileKind } from "@/config/file-formats";
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

export const imageQualityAnswer =
  "No. For JPG, PNG and WebP, Pexlora cuts the metadata out of the file and leaves the image data untouched, so the pixels stay identical. Photos saved with a rotation flag, and AVIF, TIFF and GIF files, are re-encoded at high quality instead, and TIFF and GIF come back as PNG.";

export const faqs = {
  onDevice: {
    question: "Is my file uploaded?",
    answer:
      "No. The file is read and cleaned inside your browser, and the clean copy is built on your device. Only a counter for your daily limit is sent to our server.",
  },
  imagePrivacy: {
    question: "Are my images stored?",
    answer:
      "Pexlora doesn't save them. Images are sent over HTTPS to our server, processed in memory and returned to you. Our code doesn't write them to disk or to a database.",
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
  verify: {
    question: "How do I know the metadata is gone?",
    answer:
      "After cleaning, Pexlora reads the clean copy again and shows how many tags are left, normally zero. You can also drop the clean file into the EXIF Viewer to check it yourself.",
  },
  imageQuality: {
    question: "Will removing metadata lower the quality?",
    answer:
      imageQualityAnswer,
  },
  inPlaceQuality: {
    question: "Will removing metadata lower the quality?",
    answer: "No. Documents, audio and video are edited in place without re-encoding, so the content stays exactly the same.",
  },
  mixedPrivacy: {
    question: "Are my files uploaded or stored?",
    answer:
      "PDF, Office, audio and video files are cleaned in your browser and aren't uploaded. Images are sent over HTTPS to our server, processed in memory and not saved by Pexlora.",
  },
  desktopAlternative: {
    question: "Can I remove metadata without a website?",
    answer:
      "Yes. On a computer, the free command-line tool ExifTool removes everything with exiftool -all= file.jpg. Pexlora does the same with nothing to install, and shows you what was in the file first.",
  },
} satisfies Record<string, SeoFaq>;

export const supportedFormatsFaq = (kinds: FileKind[]): SeoFaq => ({
  question: "Which files are supported?",
  answer: `${extensions(kinds)}. Size limits: ${kinds.map((kind) => `${fileKinds[kind].label} up to ${sizeLimit(kind)}`).join(", ")}.`,
});

export const trustLine = (kinds: FileKind[]) =>
  kinds.includes("image") ? "Free, no sign-up." : "Free, no sign-up, processed in your browser.";

export const howToSteps = {
  "remove-metadata": [
    { title: "Drop your files", body: `Add up to ${MAX_FILES_PER_BATCH} files at once, or tap to choose them.` },
    { title: "See what's inside", body: "Every field is read first. AI tags show in orange and location in red." },
    { title: "Download the clean copy", body: "The copy is checked again, so you can see nothing is left." },
  ],
  "view-metadata": [
    { title: "Drop a file", body: "Photos, PDFs, Office files, audio and video all work." },
    { title: "Read the report", body: "Fields are grouped by EXIF, XMP, IPTC, GPS and C2PA, with AI tags first." },
    { title: "Clean it if you want", body: "Open Remove Metadata to strip everything you found." },
  ],
};
