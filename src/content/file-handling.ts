import { AI_NAME } from "@/config/brand";
import { SERVER_IMAGE_SIZE_MB, SESSION_RETENTION_HOURS } from "@/config/limits";
import { siteConfig } from "@/config/site";
import type { WorkspaceToolSlug } from "@/config/tools";

const { name } = siteConfig;

export type HandlingPath = "device" | "mixed" | "server" | "ai";

export const fileHandlingCopy = {
  metaTitle: "How Your Files Are Handled",
  description: `Where every ${name} tool processes your files: in your browser, in memory on our server, or with ${AI_NAME}. What is kept, what is not, tool by tool.`,
  eyebrow: "Privacy by design",
  title: "Where your files go,",
  highlight: "tool by tool.",
  lead: `A file can take one of three paths in ${name}. Most tools never upload anything. This page lists every tool and the path it takes, so you can decide before you drop a file.`,
  pathsTitle: "Three paths a file can take",
  paths: {
    device: {
      title: "On your device",
      kept: "Never uploaded",
      body: "The tool runs inside your browser tab. The file is read and written on your phone or computer and never reaches our server.",
      steps: ["Your file", "Your browser", "Result"],
    },
    server: {
      title: "Through our server",
      kept: "Not saved",
      body: "The file is sent over HTTPS to our server in Mumbai, processed in memory and sent back. Our code doesn't write it to disk or a database.",
      steps: ["Your file", "Our server, in memory", "Result"],
    },
    ai: {
      title: AI_NAME,
      kept: "Not stored by us",
      body: `${AI_NAME} sends the image or text to Cloudflare Workers AI to get an answer. We keep the answer only in your browser.`,
      steps: ["Your image or text", "Cloudflare Workers AI", "Answer"],
    },
  },
  toolsTitle: "Every tool, and where it runs",
  toolsLead: "Grouped by the path each tool takes. A few tools depend on the file type, and they say so.",
  groups: {
    device: "Runs on your device",
    mixed: "Depends on the file",
    server: "Runs on our server, in memory",
    ai: `Uses ${AI_NAME}`,
  } satisfies Record<HandlingPath, string>,
  mixedNotes: {
    "remove-metadata": "JPG, PNG, WebP, HEIC, PDF, Office, audio and video run in your browser. AVIF, GIF and TIFF go through our server.",
    "view-metadata": "JPG, PNG, WebP, HEIC, PDF, Office, audio and video run in your browser. AVIF, GIF and TIFF go through our server.",
    "compress-image": `Runs in your browser. If your browser can't handle the image, files up to ${SERVER_IMAGE_SIZE_MB} MB go through our server.`,
    "resize-image": `Runs in your browser. If your browser can't handle the image, files up to ${SERVER_IMAGE_SIZE_MB} MB go through our server.`,
  } satisfies Partial<Record<WorkspaceToolSlug, string>>,
  extrasTitle: "Importing and saving",
  extras: [
    "Google Drive and Dropbox files are downloaded straight into your browser. Saving to Google Drive uploads from your browser to your Drive.",
    "Adding a file from a link tries your browser first. If the site blocks that, our server fetches the file for you without keeping a copy.",
    `Results stay in this browser for ${SESSION_RETENTION_HOURS} hours so you can come back to them. Clear All removes them at once.`,
  ],
  neverTitle: "What we don't do",
  never: [
    "Save your files to disk or a database",
    "Sell or share your files with anyone",
    "Use your files to train AI models",
    "Ask for an account before you can use a tool",
  ],
  linksTitle: "The full details",
  links: { security: "Security and data", privacy: "Privacy policy" },
};
