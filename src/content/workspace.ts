import { AI_NAME } from "@/config/brand";
import { AI_DAILY_LIMITS, DAILY_LIMITS } from "@/config/limits";
import type { FileKind } from "@/config/file-formats";
import type { WorkspaceToolSlug } from "@/config/tools";
import type { OutputFormat } from "@/lib/image/formats";
import type {
  CompressionLevel,
  CompressMode,
  CropAnchor,
  CropRatio,
  MetadataField,
  PageNumberPosition,
  PageNumberStyle,
  PassportCopies,
  PassportOutput,
  PassportSize,
  PrintSheet,
  RasterFormat,
  ResizeMode,
  RotateAngle,
  SvgOutputFormat,
  SvgSize,
  TraceColors,
  TraceDetail,
  WatermarkLayout,
  WatermarkOpacity,
} from "@/lib/image/options";

const singleKindNouns: Partial<Record<FileKind, { lower: string; title: string }>> = {
  image: { lower: "images", title: "Images" },
  vector: { lower: "SVG files", title: "SVG Files" },
};

const nounFor = (kinds: FileKind[]) =>
  (kinds.length === 1 ? singleKindNouns[kinds[0]] : undefined) ?? { lower: "files", title: "Files" };

export const dropzoneCopy = {
  dragging: "Release to add",
  paste: "or paste from your clipboard",
  browseTitle: (kinds: FileKind[]) => `Drop ${nounFor(kinds).lower} or click to browse`,
  mobileTitle: (kinds: FileKind[]) => `Tap to add ${nounFor(kinds).lower}`,
  button: (kinds: FileKind[]) => `Choose ${nounFor(kinds).title}`,
  onDevice: "JPG, PNG, WebP and HEIC photos, documents, audio and video are read and cleaned on your device. They aren't uploaded.",
  samples: "No file handy? Try a sample:",
  samplesShort: "Try:",
};

export type DropzoneOverride = {
  title?: string;
  mobileTitle?: string;
  formats?: string;
  note?: string;
  samples?: boolean;
};

const browserPhotoFormats = "JPG, PNG, WebP, HEIC";

const pdfDrop: DropzoneOverride = {
  title: "Drop PDFs or click to browse",
  mobileTitle: "Tap to add PDFs",
  note: "Your PDFs are processed in your browser and never uploaded.",
};

export const dropzoneOverrides: Partial<Record<WorkspaceToolSlug, DropzoneOverride>> = {
  "crop-image": {
    formats: browserPhotoFormats,
    note: "Photos are cropped in your browser and never uploaded.",
  },
  "passport-photo": {
    title: "Drop a photo of your face",
    mobileTitle: "Tap to add your photo",
    formats: browserPhotoFormats,
    note: "Front-facing, plain light background, good light. It stays on your device.",
    samples: false,
  },
  "merge-pdf": pdfDrop,
  "split-pdf": pdfDrop,
  "rotate-pdf": pdfDrop,
  "pdf-to-jpg": pdfDrop,
  "organize-pdf": { ...pdfDrop, title: "Drop a PDF or click to browse", mobileTitle: "Tap to add a PDF" },
  "pdf-page-numbers": pdfDrop,
  "pdf-watermark": pdfDrop,
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
  formMinKb: "Smallest",
  formMaxKb: "Largest",
  kilobytesUnit: "KB",
  formHint: "Leave width and height empty to keep the photo's shape. Check your form's notice for the exact size.",
  heicHints: {
    jpeg: "Smaller, opens everywhere",
    png: "Lossless, bigger files",
  } satisfies Record<RasterFormat, string>,
  svgFormatHints: {
    png: "Sharp, keeps transparency",
    jpeg: "White background, opens everywhere",
    webp: "Small, keeps transparency",
  } satisfies Record<SvgOutputFormat, string>,
  svgSize: "Size",
  svgSizeLabel: "Output size",
  svgSizes: {
    "1x": { label: "1×", hint: "The SVG's own size" },
    "2x": { label: "2×", hint: "Sharp on retina screens" },
    "4x": { label: "4×", hint: "Extra large" },
    "512": { label: "512 px", hint: "Longest side" },
    "1024": { label: "1024 px", hint: "Longest side" },
    "2048": { label: "2048 px", hint: "Longest side" },
  } satisfies Record<SvgSize, { label: string; hint: string }>,
  traceDetail: "Detail",
  traceDetailLabel: "Tracing detail",
  traceDetails: {
    simple: { label: "Simple", hint: "Logos and icons, fewest paths" },
    balanced: { label: "Balanced", hint: "Clean edges, good default" },
    detailed: { label: "Detailed", hint: "Illustrations, more paths" },
  } satisfies Record<TraceDetail, { label: string; hint: string }>,
  traceColors: "Colors",
  traceColorsLabel: "Number of colors",
  traceColorLabels: {
    "2": "2 (B&W)",
    "4": "4",
    "8": "8",
    "16": "16",
    "32": "32",
  } satisfies Record<TraceColors, string>,
  traceHint: "Best for logos, icons, signatures and flat artwork. Photos turn into thousands of shapes.",
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
  cropRatio: "Aspect ratio",
  cropRatioLabel: "Crop aspect ratio",
  cropRatios: {
    "1x1": { label: "1:1", hint: "Square, profile" },
    "4x5": { label: "4:5", hint: "Portrait post" },
    "9x16": { label: "9:16", hint: "Story, Reels" },
    "16x9": { label: "16:9", hint: "Widescreen" },
    "3x2": { label: "3:2", hint: "Photo print" },
    "4x3": { label: "4:3", hint: "Classic" },
  } satisfies Record<CropRatio, { label: string; hint: string }>,
  cropAnchor: "Keep",
  cropAnchorLabel: "Crop position",
  cropAnchors: {
    start: { label: "Top / Left", hint: "Trim the end" },
    center: { label: "Centre", hint: "Trim both sides" },
    end: { label: "Bottom / Right", hint: "Trim the start" },
  } satisfies Record<CropAnchor, { label: string; hint: string }>,
  cropPreview: "Crop preview of the first image",
  cropHint: "Every image in the list is cropped the same way. The format stays the same and metadata is removed.",
  passportSize: "Photo size",
  passportSizeLabel: "Passport photo size",
  passportSizes: {
    "35x45": { label: "35×45 mm", hint: "India, UK, EU" },
    "51x51": { label: "2×2 in", hint: "US, OCI" },
    "20x25": { label: "20×25 mm", hint: "Stamp size" },
  } satisfies Record<PassportSize, { label: string; hint: string }>,
  passportPreview: "Preview of the printed photo sheet",
  passportCount: (count: number, sheet: string) => `${count} ${count === 1 ? "photo" : "photos"} on one ${sheet} sheet`,
  passportPrintHint: "Print at 100% (actual size), not fit to page, then cut along the grey lines.",
  passportSheet: "Print on",
  passportSheetLabel: "Sheet size",
  passportSheets: {
    "4x6": { label: "4 × 6 in", hint: "Photo print" },
    a4: { label: "A4", hint: "Home printer" },
  } satisfies Record<PrintSheet, { label: string; hint: string }>,
  passportCopies: "Copies",
  passportCopiesLabel: "Number of copies",
  passportCopyLabels: {
    fill: "Fill",
    "2": "2",
    "4": "4",
    "6": "6",
  } satisfies Record<PassportCopies, string>,
  passportOutput: "Save as",
  passportOutputLabel: "Output file",
  passportOutputs: {
    jpeg: { label: "JPG", hint: "For photo shops, 300 DPI" },
    pdf: { label: "PDF", hint: "Prints at the exact size" },
  } satisfies Record<PassportOutput, { label: string; hint: string }>,
  passportNoFit: "This photo size doesn't fit on the chosen sheet.",
  pageNumberPosition: "Position",
  pageNumberPositionLabel: "Page number position",
  pageNumberPositions: {
    "top-left": { label: "Top Left" },
    "top-center": { label: "Top Centre" },
    "top-right": { label: "Top Right" },
    "bottom-left": { label: "Bottom Left" },
    "bottom-center": { label: "Bottom Centre" },
    "bottom-right": { label: "Bottom Right" },
  } satisfies Record<PageNumberPosition, { label: string }>,
  pageNumberStyle: "Format",
  pageNumberStyleLabel: "Page number format",
  pageNumberStyles: {
    number: { label: "1", hint: "Just the number" },
    page: { label: "Page 1", hint: "With the word Page" },
    "page-of": { label: "Page 1 of 9", hint: "With the total" },
    fraction: { label: "1 / 9", hint: "Short, with the total" },
  } satisfies Record<PageNumberStyle, { label: string; hint: string }>,
  pageNumberLabels: {
    number: (page: number) => String(page),
    page: (page: number) => `Page ${page}`,
    "page-of": (page: number, total: number) => `Page ${page} of ${total}`,
    fraction: (page: number, total: number) => `${page} / ${total}`,
  } satisfies Record<PageNumberStyle, (page: number, total: number) => string>,
  skipFirstPage: "Skip the first page (cover)",
  pageNumberPickHint: "Tap a spot on the page to place the number",
  pageNumberPositionNow: (position: string) => `Position: ${position}. Change it on the page preview.`,
  watermarkPreview: "Preview of the watermark on a page",
  watermarkText: "Watermark text",
  watermarkPlaceholder: "Confidential",
  watermarkLayout: "Layout",
  watermarkLayoutLabel: "Watermark layout",
  watermarkLayouts: {
    diagonal: { label: "Diagonal", hint: "Across the page" },
    horizontal: { label: "Straight", hint: "Centred" },
    tiled: { label: "Tiled", hint: "Repeated" },
  } satisfies Record<WatermarkLayout, { label: string; hint: string }>,
  watermarkOpacity: "Strength",
  watermarkOpacityLabel: "Watermark opacity",
  watermarkOpacities: {
    light: { label: "Light", hint: "Barely there" },
    medium: { label: "Medium", hint: "Easy to read" },
    strong: { label: "Strong", hint: "Hard to miss" },
  } satisfies Record<WatermarkOpacity, { label: string; hint: string }>,
  watermarkHint: "The same text goes on every page of every PDF in the list.",
  organizePages: "Page order",
  organizePlaceholder: "All pages, e.g. 1-3, 5",
  organizeHint: "Applies to every PDF in the list. Ranges can run backwards, like 9-1.",
};

export const stageCopy = {
  preview: "Preview",
  pages: "Pages",
  placeNumber: "Page number position",
  samplePage: "Sample page. Your PDF keeps its own content.",
  firstImage: "First image in the list. Every image is cropped the same way.",
};

export const organizeCopy = {
  title: "Pages",
  kept: (kept: number, total: number) => `${kept} of ${total} pages kept`,
  reverse: "Reverse",
  reset: "Reset",
  loading: "Loading pages",
  removed: "Removed",
  pageLabel: (page: number) => `Page ${page}`,
  remove: (page: number) => `Remove page ${page}`,
  restore: (page: number) => `Put page ${page} back`,
  moveEarlier: (page: number) => `Move page ${page} earlier`,
  moveLater: (page: number) => `Move page ${page} later`,
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
  mostlyOnDevice: "JPG, PNG, WebP and HEIC run in your browser",
  tooLargeForBrowser: "This image is too large for your browser to process. Try a smaller image or another browser.",
  browserFormatsOnly: "This tool works with JPG, PNG, WebP and HEIC images.",
  orderHint: "Files are combined in the order shown",
  moveUp: (name: string) => `Move ${name} up`,
  moveDown: (name: string) => `Move ${name} down`,
};

export const reportCopy = {
  empty: "No metadata found. This file is already clean.",
};
