import { DAILY_LIMITS, FILE_SIZE_LIMITS_MB, MAX_FILES_PER_BATCH, MAX_RESIZE_DIMENSION } from "@/config/limits";
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
  "compress-image": {
    title: "Picking a level",
    tips: [
      "Balanced is a good default for websites",
      "Light keeps every detail for print or editing",
      "Strong is best for thumbnails and email",
      "The file format stays the same",
      "Metadata is removed from every compressed file",
    ],
  },
  "resize-image": {
    title: "Resizing tips",
    tips: [
      "Percentage keeps the shape of every image",
      "Fill in only width or height to scale the other side",
      "Untick aspect ratio to stretch to an exact size",
      `Images go up to ${MAX_RESIZE_DIMENSION} px on each side`,
      "Metadata is removed from every resized file",
    ],
  },
  "edit-metadata": {
    title: "How it works",
    tips: [
      "Fill in only the fields you need",
      "The same details go into every image in the batch",
      "Separate keywords with commas",
      "Existing tags, GPS and AI credits are removed",
      "Use View Metadata to check the result",
    ],
  },
  "view-metadata": {
    title: "Reading the report",
    tips: [
      "AI-related tags are flagged and listed first",
      "Groups show where each tag lives: XMP, EXIF, GPS, authors",
      "PDF, Office, audio and video are read on your device",
      "Inspecting doesn't count towards your daily limit",
      "Use Remove Metadata to strip what you find",
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
