import { DAILY_LIMITS, FILE_SIZE_LIMITS_MB, MAX_FILES_PER_BATCH } from "@/config/limits";
import type { WorkspaceToolSlug } from "@/config/tools";
import { formatMegabytes } from "@/lib/utils/format-bytes";

export const moduleTips: Record<WorkspaceToolSlug, { title: string; tips: string[] }> = {
  "remove-metadata": {
    title: "What gets removed",
    tips: [
      "C2PA Content Credentials and AI generator tags",
      "EXIF, XMP, IPTC and GPS location in photos and videos",
      "Authors, company and comment names in PDF and Office files",
      "Audio and video are never re-encoded",
      "Every file is re-checked after cleaning",
    ],
  },
  "convert-format": {
    title: "Choosing a format",
    tips: [
      "WebP is a good default for the web",
      "AVIF gives the smallest files for photos",
      "PNG output is lossless, so quality doesn't apply",
      "Metadata is removed from every converted file",
    ],
  },
  "view-metadata": {
    title: "Reading the report",
    tips: [
      "AI-related tags are flagged and listed first",
      "Groups show where each tag lives: XMP, EXIF, GPS, authors",
      "PDF, Office, audio and video are read on your device",
      "Inspecting doesn't count towards your daily limit",
      "Open Cleaner to remove what you find",
    ],
  },
};

export const sharedLimits = [
  { label: "Images", value: formatMegabytes(FILE_SIZE_LIMITS_MB.image) },
  { label: "PDF and Office", value: formatMegabytes(FILE_SIZE_LIMITS_MB.pdf) },
  { label: "Audio", value: formatMegabytes(FILE_SIZE_LIMITS_MB.audio) },
  { label: "Video", value: formatMegabytes(FILE_SIZE_LIMITS_MB.video) },
  { label: "Files per batch", value: String(MAX_FILES_PER_BATCH) },
  { label: "Daily limit", value: `${DAILY_LIMITS.user} files` },
];
