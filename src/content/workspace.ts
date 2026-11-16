import type { FileKind } from "@/config/file-formats";
import type { WorkspaceToolSlug } from "@/config/tools";
import type { OutputFormat } from "@/lib/image/formats";
import type { CompressionLevel, CompressMode, MetadataField, ResizeMode } from "@/lib/image/options";

const onlyImages = (kinds: FileKind[]) => kinds.length === 1 && kinds[0] === "image";

export const dropzoneCopy = {
  dragging: "Release to add",
  paste: "or paste from your clipboard",
  title: (kinds: FileKind[]) => (onlyImages(kinds) ? "Drop images here" : "Drop files here"),
  mobileTitle: (kinds: FileKind[]) => (onlyImages(kinds) ? "Pick images to start" : "Pick files to start"),
  button: (kinds: FileKind[]) => (onlyImages(kinds) ? "Choose Images" : "Choose Files"),
  onDevice: "Documents, audio and video are cleaned on your device and never uploaded.",
  onDeviceShort: "Docs, audio and video stay on your device",
  samples: "No file handy? Try a sample:",
};

export const saveCopy = {
  download: "Download",
  photos: "Save to Photos",
  downloadAll: "Download All",
  photosAll: "Save All to Photos",
};

export const optionsCopy = {
  format: "Convert to",
  formatLabel: "Output format",
  formatHints: {
    jpeg: "Opens everywhere",
    png: "Lossless, transparency",
    webp: "Best for websites",
    avif: "Smallest photos",
  } satisfies Record<OutputFormat, string>,
  conversion: "Conversion",
  fullQuality: "Full quality · metadata removed",
  level: "Level",
  levelLabel: "Compression level",
  levels: {
    light: { label: "Light", hint: "Smaller file, no visible change" },
    balanced: { label: "Balanced", hint: "Much smaller, still sharp" },
    strong: { label: "Strong", hint: "Smallest file, some softening" },
  } satisfies Record<CompressionLevel, { label: string; hint: string }>,
  compressBy: "Compress by",
  compressModes: {
    level: "Level",
    target: "Target Size",
  } satisfies Record<CompressMode, string>,
  compressModeHints: {
    level: "Light, Balanced or Strong",
    target: "Under 100 KB, 50 KB…",
  } satisfies Record<CompressMode, string>,
  target: "Get each file under",
  targetLabel: "Target file size",
  custom: "Custom",
  kilobytes: "KB",
  allowFormatChange: "Allow JPG for PNGs",
  targetHint: "Quality is lowered, then the image is scaled down, until each file fits.",
  resizeBy: "Resize by",
  modes: {
    percent: "Percentage",
    dimensions: "Dimensions",
  } satisfies Record<ResizeMode, string>,
  modeHints: {
    percent: "Scale every image",
    dimensions: "Exact width and height",
  } satisfies Record<ResizeMode, string>,
  scale: "Scale",
  width: "Width",
  height: "Height",
  pixels: "px",
  auto: "Auto",
  keepAspect: "Keep aspect ratio",
  metadataFields: {
    author: { label: "Author", placeholder: "Your name or studio" },
    copyright: { label: "Copyright", placeholder: "© 2026 Your Name" },
    description: { label: "Description", placeholder: "What the image shows" },
    keywords: { label: "Keywords", placeholder: "sunset, beach, travel" },
  } satisfies Record<MetadataField, { label: string; placeholder: string }>,
  metadataNote: "Your details are written to every image. GPS, camera, AI and other existing tags are removed.",
};

export const resultCopy = {
  files: (count: number) => `${count} ${count === 1 ? "file" : "files"}`,
  saved: (amount: string, percent: number) => `Saved ${amount} (${percent}%)`,
  grew: (amount: string) => `${amount} larger in total`,
  targetMet: (target: string) => `Under ${target}`,
  targetMissed: (target: string) => `Over ${target}`,
  targetMissedHint: (target: string, smallest: string) => `Couldn't reach ${target}, smallest is ${smallest}.`,
  tryResize: "Try resizing first",
};

export const queueCopy = {
  addFiles: "Add Files",
  clearAll: "Clear All",
  dropMore: "Drop or paste more files",
  freeLeft: (count: number) => `${count} free ${count === 1 ? "file" : "files"} left today`,
  addToStart: "Add files to start",
};

export const panelNotes: Partial<Record<WorkspaceToolSlug, { title: string; items: string[] }>> = {
  "remove-metadata": {
    title: "What's removed",
    items: ["EXIF, GPS and camera details", "AI tags and C2PA credentials", "Author names in documents"],
  },
  "image-alt-text": {
    title: "What you get",
    items: ["Alt text and a short description", "Keywords for search", "An SEO-friendly file name"],
  },
};

export const reportCopy = {
  empty: "No metadata found. This file is already clean.",
};
