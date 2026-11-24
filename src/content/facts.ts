import { AI_NAME } from "@/config/brand";
import { company } from "@/config/company";
import { conversions } from "@/config/conversions";
import {
  AI_DAILY_LIMITS,
  AI_TEXT_LIMITS,
  DAILY_LIMITS,
  FILE_SIZE_LIMITS_MB,
  MAX_FILES_PER_BATCH,
  SERVER_IMAGE_SIZE_MB,
  SESSION_RETENTION_HOURS,
} from "@/config/limits";
import { siteConfig } from "@/config/site";
import { textTools } from "@/config/text-tools";
import { workspaceTools } from "@/config/tools";
import { utilityTools } from "@/config/utility-tools";
import { formatMegabytes } from "@/lib/utils/format-bytes";

export type FactIcon =
  | "price"
  | "tools"
  | "formats"
  | "metadata"
  | "privacy"
  | "size"
  | "batch"
  | "saved"
  | "text"
  | "limits"
  | "maker";

export type FactStat = { label: string; value: string };

export type FactRow = {
  label: string;
  value: string;
  icon?: FactIcon;
  highlight?: string;
  chips?: string[];
  chipsOnly?: boolean;
  removed?: boolean;
  stats?: FactStat[];
  wide?: boolean;
  featured?: boolean;
};

const { name } = siteConfig;
const toolCount = workspaceTools.length + textTools.length + utilityTools.length;
const size = (kind: keyof typeof FILE_SIZE_LIMITS_MB) => formatMegabytes(FILE_SIZE_LIMITS_MB[kind]);
const list = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}` : (items[0] ?? "");

const priceRow: FactRow = {
  label: "Price",
  icon: "price",
  highlight: "Free",
  value: `Free. ${DAILY_LIMITS.anonymous} files a day without an account, ${DAILY_LIMITS.user} a day with a free account. Pro passes are one-time payments, not subscriptions.`,
};

const savedRow: FactRow = {
  label: "Saved results",
  icon: "saved",
  highlight: `${SESSION_RETENTION_HOURS} hours`,
  value: `Results stay on your device for ${SESSION_RETENTION_HOURS} hours so you can come back to them, then they are removed. Clear All removes them at once.`,
};

export const factsCopy = {
  eyebrow: "At a glance",
  title: `What ${name} is`,
  summary: `${name} is a free online toolkit that removes hidden metadata (EXIF, GPS location, XMP, IPTC, C2PA and AI generator tags) from photos and files, and converts, compresses, resizes and edits images and PDFs. It has ${toolCount} tools and works without an account.`,
  tableCaption: `${name} key facts`,
  updated: "Last updated",
  rows: [
    priceRow,
    {
      label: "Tools",
      icon: "tools",
      highlight: `${toolCount} tools`,
      value: `${toolCount} tools for images, PDFs, Office files, text and ZIPs, plus ${conversions.length} image format conversions such as HEIC to JPG and PNG to WebP.`,
    },
    {
      label: "Batch size",
      value: `Up to ${MAX_FILES_PER_BATCH} files at once on the free plan.`,
      icon: "batch",
      highlight: `${MAX_FILES_PER_BATCH} at once`,
    },
    {
      label: "Metadata removed",
      icon: "metadata",
      wide: true,
      featured: true,
      removed: true,
      chips: ["EXIF", "GPS", "XMP", "IPTC", "PNG text", "C2PA", "AI prompts"],
      value: "EXIF (camera, date, serial number), GPS coordinates, XMP, IPTC (author, copyright), PNG text chunks, C2PA content credentials and AI prompts left by tools like Midjourney or Stable Diffusion. The colour profile is kept so colours don't shift.",
    },
    {
      label: "Where files are processed",
      icon: "privacy",
      highlight: "Browser first",
      value: "In the browser for JPG, PNG, WebP and HEIC cleaning, compressing and resizing, and for every PDF, Office, audio and video tool. AVIF, TIFF and GIF files are processed in memory on our server and not saved by our code.",
    },
    {
      label: "File size limits",
      icon: "size",
      wide: true,
      stats: [
        { label: "Images", value: size("image") },
        { label: "PDF and Office", value: size("pdf") },
        { label: "Audio", value: size("audio") },
        { label: "Video", value: size("video") },
      ],
      value: `Images up to ${size("image")} in the browser (${formatMegabytes(SERVER_IMAGE_SIZE_MB)} when sent to the server), PDFs and Office files up to ${size("pdf")}, audio up to ${size("audio")}, video up to ${size("video")}.`,
    },
    savedRow,
    {
      label: "Limitations",
      icon: "limits",
      wide: true,
      value: "Removes metadata only. It does not remove pixel watermarks such as Google SynthID and does not claim to beat AI detectors.",
    },
    {
      label: "Made by",
      icon: "maker",
      value: `${company.legalName}, ${company.country}.`,
    },
  ] satisfies FactRow[],
};

export const toolFactsCopy = {
  eyebrow: "Quick facts",
  title: (tool: string) => `${tool} at a glance`,
  tableCaption: (tool: string) => `${tool} key facts`,
  summary: (tool: string, description: string) =>
    `${tool} is a free online tool by ${name} that works without an account. ${description}`,
  price: priceRow,
  saved: savedRow,
  formats: (labels: string[]): FactRow => ({
    label: "Formats",
    value: `${list(labels)}.`,
    icon: "formats",
    chips: labels,
    chipsOnly: true,
  }),
  sizeLimit: (groups: { limit: string; labels: string[] }[], single: boolean): FactRow => ({
    label: "File size limit",
    icon: "size",
    highlight: groups[0]?.limit,
    value: single
      ? `Up to ${groups[0].limit} per file.`
      : `Up to ${groups.map((group) => `${group.limit} for ${list(group.labels)}`).join("; ")}.`,
  }),
  processing: (browser: string[], server: string[]): FactRow => ({
    label: "Where files are processed",
    icon: "privacy",
    highlight: !server.length ? "On your device" : !browser.length ? "In memory" : "Browser first",
    value: !server.length
      ? "In your browser. Files never leave your device."
      : !browser.length
        ? "On our server, in memory. Files are not saved by our code and are discarded after the response."
        : `In your browser for ${list(browser)}. ${list(server)} files are processed in memory on our server and not saved by our code.`,
  }),
  aiProcessing: {
    label: "Where files are processed",
    icon: "privacy",
    highlight: "No copy kept",
    value: `The image is sent to Cloudflare Workers AI, where ${AI_NAME} describes it. ${name} doesn't keep a copy.`,
  } satisfies FactRow,
  aiLimit: {
    label: "Price",
    icon: "price",
    highlight: "Free",
    value: `Free. ${AI_DAILY_LIMITS.anonymous} ${AI_NAME} requests a day without an account, ${AI_DAILY_LIMITS.user} with a free account.`,
  } satisfies FactRow,
  batch: { label: "Batch size", value: `Up to ${MAX_FILES_PER_BATCH} files at once.`, icon: "batch", highlight: `${MAX_FILES_PER_BATCH} at once` } satisfies FactRow,
  textInput: {
    label: "Text length",
    icon: "text",
    highlight: `${AI_TEXT_LIMITS.minWords}+ words`,
    value: `At least ${AI_TEXT_LIMITS.minWords} words and up to ${AI_TEXT_LIMITS.maxCharacters.toLocaleString("en-IN")} characters per run.`,
  } satisfies FactRow,
  textProcessing: {
    label: "Where text is processed",
    icon: "privacy",
    highlight: "Not stored",
    value: `The text is sent to Cloudflare Workers AI to run ${AI_NAME}. ${name} doesn't store it on a server; results stay on your device for ${SESSION_RETENTION_HOURS} hours.`,
  } satisfies FactRow,
  aiBudget: {
    label: "Availability",
    icon: "saved",
    highlight: "Resets daily",
    value: `${AI_NAME} shares a daily budget across the whole site. When it runs out, AI tools pause until 00:00 UTC.`,
  } satisfies FactRow,
  utilityPrice: { label: "Price", value: "Free, with no daily limit and no account.", icon: "price", highlight: "Free" } satisfies FactRow,
  utilityProcessing: {
    label: "Where it runs",
    icon: "privacy",
    highlight: "On your device",
    value: "Entirely in your browser. Nothing you paste or add is sent to our server.",
  } satisfies FactRow,
  textLimit: (characters: number): FactRow => ({
    label: "Text length",
    icon: "text",
    highlight: characters.toLocaleString("en-IN"),
    value: `Up to ${characters.toLocaleString("en-IN")} characters at once.`,
  }),
  zipLimit: (megabytes: number): FactRow => ({
    label: "Size limit",
    icon: "size",
    highlight: formatMegabytes(megabytes),
    value: `Up to ${formatMegabytes(megabytes)} of files in one ZIP.`,
  }),
  unzipLimit: (megabytes: number): FactRow => ({
    label: "Size limit",
    icon: "size",
    highlight: formatMegabytes(megabytes),
    value: `ZIPs up to ${formatMegabytes(megabytes)}. Encrypted ZIPs aren't supported.`,
  }),
};
