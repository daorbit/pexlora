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
  DpiPreset,
  ImageFlip,
  ImageRotation,
  ImageShape,
  ImageWatermarkColor,
  ImageWatermarkPosition,
  MetadataField,
  PhotoSignLayout,
  PhotoSignSize,
  SignInk,
  SignPages,
  SignSize,
  PaletteSize,
  ShapeBackground,
  ShapeCorners,
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
  batch?: boolean;
};

const browserPhotoFormats = "JPG, PNG, WebP, HEIC";

const pdfDrop: DropzoneOverride = {
  title: "Drop PDFs or click to browse",
  mobileTitle: "Tap to add PDFs",
  note: "Your PDFs are processed in your browser and never uploaded.",
};

const convertNote = "Converted in your browser. Your files are never uploaded.";

const sheetDrop: DropzoneOverride = {
  title: "Drop spreadsheets or click to browse",
  mobileTitle: "Tap to add spreadsheets",
  note: convertNote,
};

export const dropzoneOverrides: Partial<Record<WorkspaceToolSlug, DropzoneOverride>> = {
  "crop-image": {
    formats: browserPhotoFormats,
    note: "Photos are cropped in your browser and never uploaded.",
  },
  "change-dpi": {
    formats: browserPhotoFormats,
    note: "DPI is changed in your browser. Your images are never uploaded.",
  },
  "rotate-image": {
    formats: browserPhotoFormats,
    note: "Images are rotated in your browser and never uploaded.",
  },
  "photo-signature": {
    title: "Drop your photo and signature",
    mobileTitle: "Tap to add photo and signature",
    formats: browserPhotoFormats,
    note: "Photo first, then signature. Joined in your browser, never uploaded.",
    samples: false,
  },
  "image-watermark": {
    formats: browserPhotoFormats,
    note: "Watermarks are added in your browser. Your images are never uploaded.",
  },
  "shape-image": {
    formats: browserPhotoFormats,
    note: "Images are shaped in your browser and never uploaded.",
  },
  "image-palette": {
    formats: browserPhotoFormats,
    note: "Colours are read in your browser. Your images are never uploaded.",
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
  "compress-pdf": pdfDrop,
  "sign-pdf": pdfDrop,
  "pdf-to-jpg": pdfDrop,
  "organize-pdf": { ...pdfDrop, title: "Drop a PDF or click to browse", mobileTitle: "Tap to add a PDF" },
  "pdf-page-numbers": pdfDrop,
  "pdf-watermark": pdfDrop,
  "excel-to-pdf": sheetDrop,
  "excel-to-csv": sheetDrop,
  "csv-to-excel": { title: "Drop CSV files or click to browse", mobileTitle: "Tap to add CSV files", note: convertNote },
  "word-to-pdf": { title: "Drop Word files or click to browse", mobileTitle: "Tap to add Word files", note: convertNote },
  "pdf-to-excel": pdfDrop,
  "pdf-to-word": pdfDrop,
  "pdf-to-text": pdfDrop,
};

export type SignMode = "draw" | "type" | "upload";

export const signatureCopy = {
  title: "Your signature",
  modeLabel: "How to add your signature",
  modes: { draw: "Draw", type: "Type", upload: "Upload" } satisfies Record<SignMode, string>,
  inkLabel: "Ink colour",
  inks: { black: "Black", blue: "Blue" } satisfies Record<SignInk, string>,
  padLabel: "Signature pad. Draw your signature with a finger, stylus or mouse.",
  padHint: "Sign inside the box",
  typeLabel: "Type your name",
  typePlaceholder: "Your name",
  uploadHint: "A photo or scan of your signature on white paper. The white background is removed.",
  upload: "Choose Image",
  clear: "Clear",
  ready: "Signature ready",
  preview: "Your signature",
  uploadFailed: "That image couldn't be read. Try a JPG or PNG.",
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
  pdfLevels: {
    light: { label: "Light", hint: "Photos stay sharp, smaller file" },
    balanced: { label: "Balanced", hint: "Good for email and form uploads" },
    strong: { label: "Strong", hint: "Smallest file, photos softer" },
  } satisfies Record<CompressionLevel, { label: string; hint: string }>,
  pdfCompressHint: "Text and drawings stay sharp and selectable. Only the photos inside are shrunk, and document metadata is removed.",
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
  dpi: "DPI",
  dpiLabel: "Image DPI",
  dpiPresets: {
    "72": { label: "72", hint: "Web, Mac" },
    "96": { label: "96", hint: "Windows" },
    "150": { label: "150", hint: "Draft print" },
    "200": { label: "200", hint: "Forms" },
    "300": { label: "300", hint: "Print, forms" },
    "600": { label: "600", hint: "Scans" },
  } satisfies Record<DpiPreset, { label: string; hint: string }>,
  dpiCustom: "Custom DPI",
  dpiUnit: "dpi",
  dpiHint:
    "Pixels stay exactly the same; only the print size changes. JPG and PNG stay as they are, WebP and HEIC are saved as JPG. Metadata is removed.",
  rotateAngle: "Rotate",
  rotateAngleLabel: "Rotation angle",
  imageRotations: {
    "0": { label: "None", hint: "Flip only" },
    "90": { label: "90°", hint: "Right" },
    "180": { label: "180°", hint: "Upside down" },
    "270": { label: "270°", hint: "Left" },
  } satisfies Record<ImageRotation, { label: string; hint: string }>,
  flip: "Flip",
  flipLabel: "Flip direction",
  flips: {
    none: { label: "None", hint: "Keep as is" },
    horizontal: { label: "Horizontal", hint: "Mirror" },
    vertical: { label: "Vertical", hint: "Upside down" },
  } satisfies Record<ImageFlip, { label: string; hint: string }>,
  rotateHint: "The pixels are turned, so the image is upright in every app and form. The format stays the same and metadata is removed.",
  rotatePreview: "Rotation preview of the first image",
  shape: "Shape",
  shapeLabel: "Image shape",
  shapes: {
    rounded: { label: "Rounded" },
    circle: { label: "Circle" },
    heart: { label: "Heart" },
    star: { label: "Star" },
    hexagon: { label: "Hexagon" },
    arch: { label: "Arch" },
  } satisfies Record<ImageShape, { label: string }>,
  corners: "Corners",
  cornersLabel: "Corner size",
  cornerSizes: {
    small: { label: "Small", hint: "Subtle" },
    medium: { label: "Medium", hint: "App icon" },
    large: { label: "Large", hint: "Very round" },
  } satisfies Record<ShapeCorners, { label: string; hint: string }>,
  shapeBackground: "Background",
  shapeBackgroundLabel: "Background outside the shape",
  shapeBackgrounds: {
    transparent: { label: "Transparent", hint: "PNG" },
    white: { label: "White", hint: "JPG" },
  } satisfies Record<ShapeBackground, { label: string; hint: string }>,
  shapeHint: "Shapes other than Rounded use the centre square of the image. Metadata is removed.",
  shapePreview: "Shape preview of the first image",
  paletteSize: "Colours",
  paletteSizeLabel: "Number of colours",
  paletteSizes: {
    "5": { label: "5", hint: "Main colours" },
    "8": { label: "8", hint: "Balanced" },
    "12": { label: "12", hint: "Detailed" },
  } satisfies Record<PaletteSize, { label: string; hint: string }>,
  paletteHint: "Tap a colour in the preview to copy its hex code. Make Palette saves a card with the image and every hex code.",
  paletteCopyAll: "Copy All",
  paletteCopied: (hex: string) => `Copied ${hex}`,
  paletteCopyLabel: (hex: string) => `Copy ${hex}`,
  paletteEmpty: "No colours found. The image may be fully transparent.",
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
  signPosition: "Position",
  signPositionLabel: "Where the signature goes on the page",
  signPositions: {
    "top-left": { label: "Top left" },
    "top-center": { label: "Top centre" },
    "top-right": { label: "Top right" },
    "bottom-left": { label: "Bottom left" },
    "bottom-center": { label: "Bottom centre" },
    "bottom-right": { label: "Bottom right" },
  } satisfies Record<PageNumberPosition, { label: string }>,
  signSize: "Size",
  signSizeLabel: "Signature size",
  signSizes: {
    small: { label: "Small", hint: "About 4 cm" },
    medium: { label: "Medium", hint: "About 5.5 cm" },
    large: { label: "Large", hint: "About 8 cm" },
  } satisfies Record<SignSize, { label: string; hint: string }>,
  signPages: "Pages",
  signPagesLabel: "Pages to sign",
  signPageChoices: {
    last: { label: "Last page", hint: "Most forms" },
    first: { label: "First page", hint: "Cover sign-off" },
    all: { label: "Every page", hint: "Initial each page" },
  } satisfies Record<SignPages, { label: string; hint: string }>,
  signHint: "Your signature is placed on every PDF in the list. Document metadata is removed from the signed copy.",
  photoSignLayout: "Signature",
  photoSignLayoutLabel: "Where the signature goes",
  photoSignLayouts: {
    below: { label: "Below", hint: "Under the photo" },
    beside: { label: "Beside", hint: "To the right" },
  } satisfies Record<PhotoSignLayout, { label: string; hint: string }>,
  photoSignSize: "Max size",
  photoSignSizeLabel: "Largest file size",
  photoSignSizes: {
    "20": { label: "20 KB", hint: "Strict forms" },
    "50": { label: "50 KB", hint: "Most forms" },
    "100": { label: "100 KB", hint: "Sharper" },
    "200": { label: "200 KB", hint: "Best quality" },
  } satisfies Record<PhotoSignSize, { label: string; hint: string }>,
  photoSignHint: "Add exactly two images: your photo first, then your signature. They're joined on a white background and saved as one JPG.",
  imageWatermarkPlaceholder: "© Your Name",
  imageWatermarkPosition: "Position",
  imageWatermarkPositionLabel: "Watermark position",
  imageWatermarkPositions: {
    corner: { label: "Corner", hint: "Small, bottom right" },
    diagonal: { label: "Diagonal", hint: "Large, across" },
    tiled: { label: "Tiled", hint: "Repeated" },
  } satisfies Record<ImageWatermarkPosition, { label: string; hint: string }>,
  imageWatermarkColor: "Colour",
  imageWatermarkColorLabel: "Watermark colour",
  imageWatermarkColors: {
    white: { label: "White", hint: "For dark photos" },
    black: { label: "Black", hint: "For light photos" },
  } satisfies Record<ImageWatermarkColor, { label: string; hint: string }>,
  imageWatermarkHint: "The same watermark goes on every image in the list. Any language works. Metadata is removed from the saved copy.",
  imageWatermarkPreview: "Watermark preview of the first image",
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
  sameSettings: "First image in the list. Every image gets the same settings.",
  paletteOf: "Colours of the first image, most used first.",
};

export const pdfImageCopy = {
  pages: "Pages",
  pagesPlaceholder: "All pages, e.g. 1-3, 7",
  pagesHint: "Tap pages in the preview or type a range. Applies to every PDF in the list.",
  format: "Format",
  formats: {
    jpeg: { label: "JPG", hint: "Smaller files" },
    png: { label: "PNG", hint: "Sharp text, bigger" },
  },
  quality: "Sharpness",
  qualities: {
    screen: { label: "Screen", hint: "150 DPI, smaller" },
    print: { label: "Print", hint: "300 DPI, sharp text" },
  },
  output: (spec: string) => (spec ? `Pages ${spec} from each PDF` : "Every page from each PDF"),
  zipNote: "One image per page. Several pages come back in one ZIP.",
  pickerTitle: "Pick pages",
  selected: (selected: number, total: number) => `${selected} of ${total} selected`,
  all: "All",
  odd: "Odd",
  even: "Even",
  first: "First",
  toggle: (page: number, on: boolean) => `${on ? "Skip" : "Include"} page ${page}`,
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

export const galleryCopy = {
  stepFormat: "1. Convert to",
  stepFiles: "2. Your images",
  files: "Your images",
  conversion: "Conversion",
  count: (count: number, max: number) => `${count} of ${max}`,
  addMore: "Add or drop more",
  ready: "Ready",
  working: "Converting…",
  view: "View",
  summary: (count: number, format: string) => `${count} ${count === 1 ? "image" : "images"} to ${format}`,
  sizesIn: (bytes: string) => `${bytes} in`,
  sizesInOut: (input: string, output: string) => `${input} in, ${output} out`,
  run: (format: string) => `Convert to ${format}`,
  noTransparency: "JPG has no transparency. Transparent areas turn white.",
  remove: (name: string) => `Remove ${name}`,
  change: (percent: number) => `${percent > 0 ? "+" : ""}${percent}% size`,
};

export const documentsCopy = {
  title: (count: number) => `${count} ${count === 1 ? "file" : "files"}`,
  reorder: "use the arrows to reorder",
  addPdfs: "Add Files",
  dropAnother: "Drop another file",
  pages: (count: number) => `${count} ${count === 1 ? "page" : "pages"}`,
  moveEarlier: (name: string) => `Move ${name} earlier`,
  moveLater: (name: string) => `Move ${name} later`,
  remove: (name: string) => `Remove ${name}`,
  resultLabel: "Result",
  result: (pages: number) => `1 PDF · ${pages} ${pages === 1 ? "page" : "pages"}`,
  resultCounting: "1 PDF",
  about: (size: string) => `about ${size}`,
  order: "Page order",
  cleanTitle: "Clean output",
  infoRemoved: "Document info (title, author, app) is not carried over",
};

export const queueCopy = {
  addFiles: "Add Files",
  clearAll: "Clear All",
  dropMore: "Drop or paste more files",
  freeLeft: (count: number) => `${count} free ${count === 1 ? "file" : "files"} left today`,
  addToStart: "Add files to start",
  progress: (done: number, total: number) => `${done} of ${total} done`,
  working: (done: number, total: number) => `Working on ${Math.min(done + 1, total)} of ${total}`,
  cleared: (count: number) => `Cleared ${count} ${count === 1 ? "file" : "files"}`,
};

export const stepsCopy = {
  label: "Progress",
  add: "Add files",
  added: (count: number) => `${count} ${count === 1 ? "file" : "files"} added`,
  choose: "Choose settings",
  chooseFormat: "Pick a format",
  done: "Done",
  convertedTo: (format: string) => `Converted to ${format}`,
  save: "Save",
  saveActive: "Save your files",
  startOver: "Start Over",
  convertTo: "Convert to",
};

export const batchTitleCopy = {
  progress: (done: number, total: number, title: string) => `(${done}/${total}) ${title}`,
  done: (title: string) => `Done · ${title}`,
  working: (total: number) => `Processing ${total} ${total === 1 ? "file" : "files"}`,
};

export const locationCopy = {
  found: "This photo reveals where it was taken",
  removed: "Location removed from the clean copy",
  viewOnMap: "View on Map",
  mapNote: "Opens OpenStreetMap in a new tab",
  copy: "Copy",
  copied: "Coordinates copied",
  copyFailed: "Couldn't copy the coordinates",
};

export const resultPreviewCopy = {
  toggle: "View",
  title: (name: string) => `Preview of ${name}`,
  pages: (count: number) => `${count} ${count === 1 ? "page" : "pages"}`,
  openFull: "Open Full Size",
  page: (page: number) => `Page ${page}`,
  imageSize: (width: number, height: number, size: string) => `${width} × ${height} · ${size}`,
  cantPlay: "Your browser can't play this format here. Save the file to check it.",
  noPreview: "This file type can't be previewed in the browser. Save it to open it.",
  zipFiles: (count: number) => `${count} ${count === 1 ? "file" : "files"} in this ZIP`,
  zipEmpty: "This ZIP is empty.",
  zipError: "This ZIP couldn't be opened for a preview. Save it to check the files.",
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
  photoSignOrder: "Photo first, signature second. Use the arrows to swap them.",
  pdfAlreadySmall: "This PDF is already as small as this level can make it. Try Strong, or it may have no photos to shrink.",
  orderHint: "Files are combined in the order shown",
  moveUp: (name: string) => `Move ${name} up`,
  moveDown: (name: string) => `Move ${name} down`,
};

export const reportCopy = {
  empty: "No metadata found. This file is already clean.",
  search: "Search tags and values",
  filterLabel: "Show",
  filters: {
    all: (count: number) => `All · ${count}`,
    ai: (count: number) => `AI · ${count}`,
    sensitive: (count: number) => `Personal · ${count}`,
  },
  noMatches: "No tags match this search.",
  exportJson: "Export JSON",
  aiNote:
    "No AI tags found. That doesn't prove the image wasn't made with AI: tags are easy to strip, and pixel watermarks like SynthID aren't metadata.",
  versionsLabel: "Metadata version",
  original: (count: number) => `Original · ${count}`,
  cleaned: (count: number | null) => (count === null ? "Result" : `Result · ${count}`),
  cleanedLoading: "Reading the result's metadata",
  cleanedError: "The result's metadata couldn't be read.",
};
