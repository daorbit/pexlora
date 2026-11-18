import { company } from "@/config/company";
import { AI_NAME } from "@/config/brand";
import { DAILY_LIMITS } from "@/config/limits";

export const llmsCopy = {
  factsTitle: "Key facts",
  facts: [
    `Free to use without an account: ${DAILY_LIMITS.anonymous} files a day, ${DAILY_LIMITS.user} with a free account. Pro passes are one-time payments, not subscriptions.`,
    "Most tools run in the browser, so files never leave the device: metadata removal and viewing for JPG, PNG, WebP and HEIC, compress, resize, crop, HEIC to JPG, the SVG tools, the photo and passport tools, every PDF, Office, audio and video tool, and the file converters (Excel and Word to PDF, PDF to Excel, Word and text, CSV to and from Excel).",
    "AVIF, TIFF and GIF files, the remaining image tools, and images too large for the browser to handle upload the file to our server, where it is processed in memory and not saved by our code.",
    `${AI_NAME} features (alt text, metadata explanations, AI text detection) send the content to Cloudflare Workers AI.`,
    "Pexlora removes metadata only. It does not remove pixel watermarks such as SynthID and does not claim to beat AI detectors.",
    `Pexlora is a product of ${company.legalName}.`,
  ],
  tools: "Tools",
  conversions: "Image conversions",
  compressTargets: "Compress an image to an exact size",
  formPresets: "Exam and form photo presets (India)",
  guides: "Guides",
  pages: "More",
  pricing: "Pricing: free and Pro plans, daily limits",
  contact: "Contact",
  blog: "Blog: guides on photo metadata, privacy and file formats",
};
