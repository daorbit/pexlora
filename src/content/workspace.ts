import type { FileKind } from "@/config/file-formats";
import type { CompressionLevel, MetadataField, ResizeMode } from "@/lib/image/options";

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
  format: "Format",
  formatLabel: "Output format",
  quality: "Quality",
  lossless: "Lossless",
  level: "Level",
  levelLabel: "Compression level",
  levels: {
    light: { label: "Light", hint: "Smaller file, no visible change" },
    balanced: { label: "Balanced", hint: "Much smaller, still sharp" },
    strong: { label: "Strong", hint: "Smallest file, some softening" },
  } satisfies Record<CompressionLevel, { label: string; hint: string }>,
  resizeBy: "Resize by",
  modes: {
    percent: "Percentage",
    dimensions: "Dimensions",
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

export const reportCopy = {
  empty: "No metadata found. This file is already clean.",
};
