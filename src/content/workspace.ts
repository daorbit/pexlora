import { AI_NAME } from "@/config/brand";
import { AI_DAILY_LIMITS, DAILY_LIMITS } from "@/config/limits";
import type { FileKind } from "@/config/file-formats";
import type { WorkspaceToolSlug } from "@/config/tools";
import type { OutputFormat } from "@/lib/image/formats";
import type { CompressionLevel, CompressMode, MetadataField, RasterFormat, ResizeMode, RotateAngle } from "@/lib/image/options";

const onlyImages = (kinds: FileKind[]) => kinds.length === 1 && kinds[0] === "image";

export const dropzoneCopy = {
  dragging: "Release to add",
  paste: "or paste from your clipboard",
  browseTitle: (kinds: FileKind[]) => (onlyImages(kinds) ? "Drop images or click to browse" : "Drop files or click to browse"),
  mobileTitle: (kinds: FileKind[]) => (onlyImages(kinds) ? "Tap to add images" : "Tap to add files"),
  button: (kinds: FileKind[]) => (onlyImages(kinds) ? "Choose Images" : "Choose Files"),
  onDevice: "JPG, PNG, WebP and HEIC photos, documents, audio and video are read and cleaned on your device. They aren't uploaded.",
  samples: "No file handy? Try a sample:",
  samplesShort: "Try:",
};

export const signupPromptCopy = {
  ready: (count: number) => (count > 1 ? `Your ${count} files are ready` : "Your file is ready"),
  highlight: `${DAILY_LIMITS.user} files a day`,
  title: "with a free account",
  body: "One click with Google. Your files stay right here.",
  perks: [
    `Up from ${DAILY_LIMITS.anonymous} without an account`,
    `${AI_DAILY_LIMITS.user} ${AI_NAME} requests a day`,
    "Free, no card needed",
  ],
  google: "Google",
  email: "Email",
  skip: "Skip and Download",
  close: "Close",
};

export const saveCopy = {
  download: "Download",
  photos: "Save to Photos",
  downloadAll: "Download All",
  photosAll: "Save All to Photos",
  label(count: number, toPhotos: boolean) {
    if (count > 1) return toPhotos ? this.photosAll : this.downloadAll;
    return toPhotos ? this.photos : this.download;
  },
};

export const optionsCopy = {
  heicHints: {
    jpeg: "Smaller, opens everywhere",
    png: "Lossless, bigger files",
  } satisfies Record<RasterFormat, string>,
  rotate: "Rotate pages",
  rotateLabel: "Rotation",
  rotateAngles: {
    "90": { label: "90° right", hint: "Quarter turn clockwise" },
    "180": { label: "180°", hint: "Upside down" },
    "270": { label: "90° left", hint: "Quarter turn anticlockwise" },
  } satisfies Record<RotateAngle, { label: string; hint: string }>,
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
  tagsLeft: (count: number) => `${count} ${count === 1 ? "tag" : "tags"} left`,
  targetMissed: (target: string) => `Over ${target}`,
  targetMissedHint: (target: string, smallest: string) => `Couldn't reach ${target}, smallest is ${smallest}.`,
  tryResize: "Try resizing first",
};

export const revealCopy = {
  title: "What this file gives away",
  removedTitle: "Removed from this file",
  labels: {
    ai: "Made with",
    camera: "Camera",
    author: "Author",
    date: "Taken",
  },
  aiTags: (count: number) => `${count} AI ${count === 1 ? "tag" : "tags"}`,
  tagsBefore: (count: number) => `${count} ${count === 1 ? "tag" : "tags"}`,
  tagsAfter: (after: number) => `${after} left`,
  onDevice: "Processed on your device",
};

export const queueCopy = {
  addFiles: "Add Files",
  clearAll: "Clear All",
  dropMore: "Drop or paste more files",
  freeLeft: (count: number) => `${count} free ${count === 1 ? "file" : "files"} left today`,
  addToStart: "Add files to start",
};

export const locationCopy = {
  found: "This photo reveals where it was taken",
  removed: "Location removed from the clean copy",
  viewOnMap: "View on Map",
  mapNote: "Opens OpenStreetMap in a new tab",
};

export const compareCopy = {
  toggle: "Compare",
  details: "Details",
  label: "Drag to compare the original and the result",
  before: "Original",
  after: "Result",
};

export const nextStepsCopy = {
  title: "Continue with",
  files: (count: number) => `Send ${count} ${count === 1 ? "file" : "files"} to another tool`,
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
  "merge-pdf": {
    title: "How it works",
    items: ["Add two or more PDFs", "Use the arrows to set the order", "Get one PDF without the old document info"],
  },
  "jpg-to-pdf": {
    title: "How it works",
    items: ["One image per A4 page, fitted and centred", "Use the arrows to set the page order", "No EXIF or GPS data inside the PDF"],
  },
};

export const localToolsCopy = {
  onDevice: "Runs in your browser · nothing uploaded",
  orderHint: "Files are combined in the order shown",
  moveUp: (name: string) => `Move ${name} up`,
  moveDown: (name: string) => `Move ${name} down`,
};

export const reportCopy = {
  empty: "No metadata found. This file is already clean.",
};
