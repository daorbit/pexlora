import { company } from "@/config/company";
import { conversions } from "@/config/conversions";
import {
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

const toolCount = workspaceTools.length + textTools.length + utilityTools.length;
const size = (kind: keyof typeof FILE_SIZE_LIMITS_MB) => formatMegabytes(FILE_SIZE_LIMITS_MB[kind]);

export const factsCopy = {
  eyebrow: "At a glance",
  title: `What ${siteConfig.name} is`,
  summary: `${siteConfig.name} is a free online toolkit that removes hidden metadata (EXIF, GPS location, XMP, IPTC, C2PA and AI generator tags) from photos and files, and converts, compresses, resizes and edits images and PDFs. It has ${toolCount} tools and works without an account.`,
  tableCaption: `${siteConfig.name} key facts`,
  rows: [
    {
      label: "Price",
      value: `Free. ${DAILY_LIMITS.anonymous} files a day without an account, ${DAILY_LIMITS.user} a day with a free account. Pro passes are one-time payments, not subscriptions.`,
    },
    {
      label: "Tools",
      value: `${toolCount} tools for images, PDFs, Office files, text and ZIPs, plus ${conversions.length} image format conversions such as HEIC to JPG and PNG to WebP.`,
    },
    {
      label: "Metadata removed",
      value: "EXIF (camera, date, serial number), GPS coordinates, XMP, IPTC (author, copyright), PNG text chunks, C2PA content credentials and AI prompts left by tools like Midjourney or Stable Diffusion. The colour profile is kept so colours don't shift.",
    },
    {
      label: "Where files are processed",
      value: `In the browser for JPG, PNG, WebP and HEIC cleaning, compressing and resizing, and for every PDF, Office, audio and video tool. AVIF, TIFF and GIF files are processed in memory on our server and not saved by our code.`,
    },
    {
      label: "File size limits",
      value: `Images up to ${size("image")} in the browser (${formatMegabytes(SERVER_IMAGE_SIZE_MB)} when sent to the server), PDFs and Office files up to ${size("pdf")}, audio up to ${size("audio")}, video up to ${size("video")}.`,
    },
    {
      label: "Batch size",
      value: `Up to ${MAX_FILES_PER_BATCH} files at once on the free plan.`,
    },
    {
      label: "Saved results",
      value: `Results stay on your device for ${SESSION_RETENTION_HOURS} hours so you can come back to them, then they are removed. Clear All removes them at once.`,
    },
    {
      label: "Limitations",
      value: "Removes metadata only. It does not remove pixel watermarks such as Google SynthID and does not claim to beat AI detectors.",
    },
    {
      label: "Made by",
      value: `${company.legalName}, ${company.country}.`,
    },
  ],
};
