import { AI_NAME } from "@/config/brand";
import {
  DAILY_LIMITS,
  FILE_SIZE_LIMITS_MB,
  MAX_FILES_PER_BATCH,
  MAX_RESIZE_DIMENSION,
  SERVER_IMAGE_SIZE_MB,
} from "@/config/limits";
import type { WorkspaceToolSlug } from "@/config/tools";
import { formatMegabytes } from "@/lib/utils/format-bytes";

export const overviewCopy = {
  usage: {
    title: "Today",
    files: "Files",
    ai: `${AI_NAME} requests`,
    left: (count: number) => `${count} left`,
    resets: "Resets at midnight UTC",
    plan: "Free plan",
  },
  tools: { title: "Tools", description: "Everything in your workspace." },
  shortcuts: { title: "Shortcuts", description: "Open a tool with the setting already chosen." },
  guides: { title: "Guides", description: "Focused tools for specific apps and file types. They open on the website." },
  compress: { title: "Compress to size", description: "For forms, exams and upload limits.", caption: "Under" },
  convert: { title: "Convert", description: "Every converted file comes out clean.", caption: "To" },
};

export const greetingCopy = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  evening: "Good evening",
  fallback: "Welcome back",
};

export const moduleTips: Record<WorkspaceToolSlug, { title: string; tips: string[] }> = {
  "heic-to-jpg": {
    title: "Good to know",
    tips: [
      "Photos are converted in your browser and never uploaded",
      "JPG is smaller and opens everywhere; PNG is lossless",
      "EXIF, GPS and camera details are not copied over",
      "Other images (PNG, WebP, AVIF) can be converted too",
    ],
  },
  "svg-to-image": {
    title: "SVG to image",
    tips: [
      "Pick 2x or 4x for sharp images on retina screens",
      "PNG and WebP keep transparency; JPG gets a white background",
      "Web fonts aren't loaded; convert text to outlines first",
      "Everything runs in your browser",
    ],
  },
  "image-to-svg": {
    title: "Tracing to SVG",
    tips: [
      "Best for logos, icons, signatures and flat artwork",
      "Use 2 colors for black and white signatures and stamps",
      "Fewer colors and Simple detail give smaller, cleaner SVGs",
      "Everything runs in your browser",
    ],
  },
  "form-photo": {
    title: "Getting it accepted",
    tips: [
      "Copy the width, height and KB range from your form's notice",
      "Use a front-facing photo with the face in the middle; it's centre-cropped",
      "Scan signatures on white paper with dark ink",
      "Everything runs in your browser",
    ],
  },
  "merge-pdf": {
    title: "Merging PDFs",
    tips: [
      "Use the arrows to set the page order before merging",
      "Old titles, authors and XMP data are not carried over",
      "Password-protected PDFs need the password removed first",
      "Everything runs in your browser",
    ],
  },
  "split-pdf": {
    title: "Splitting PDFs",
    tips: [
      "Every page becomes its own PDF",
      "Several pages download together as a ZIP",
      "Starts as soon as you add a file",
      "Everything runs in your browser",
    ],
  },
  "rotate-pdf": {
    title: "Rotating PDFs",
    tips: [
      "Every page turns by the angle you pick",
      "Document metadata is removed from the saved copy",
      "Text and images aren't re-compressed",
      "Everything runs in your browser",
    ],
  },
  "jpg-to-pdf": {
    title: "Images to PDF",
    tips: [
      "One image per A4 page, fitted and centred",
      "Use the arrows to set the page order",
      "JPG, PNG, WebP and HEIC all work",
      "Photo EXIF and GPS data are not copied into the PDF",
    ],
  },
  "pdf-to-jpg": {
    title: "PDF pages to JPG",
    tips: [
      "Every page is saved as a sharp JPG",
      "Several pages download together as a ZIP",
      "Starts as soon as you add a file",
      "Everything runs in your browser",
    ],
  },
  "crop-image": {
    title: "Cropping tips",
    tips: [
      "Pick the shape first, then where to keep the picture",
      "1:1 and 4:5 suit profile photos and feed posts",
      "9:16 fits stories and Reels, 16:9 fits video thumbnails",
      "The format stays the same and metadata is removed",
      "Everything runs in your browser",
    ],
  },
  "passport-photo": {
    title: "Printing passport photos",
    tips: [
      "Use a front-facing photo on a plain light background",
      "Print at 100% or actual size, never fit to page",
      "A 4 × 6 in print from a photo shop is the cheapest option",
      "Check your country's rules before you print",
      "Everything runs in your browser",
    ],
  },
  "organize-pdf": {
    title: "Organizing pages",
    tips: [
      "Tap the cross on a page to remove it",
      "Use the arrows to move a page earlier or later",
      "Type ranges like 1-3, 5 to extract pages from long PDFs",
      "The same order applies to every PDF in the list",
      "Everything runs in your browser",
    ],
  },
  "pdf-page-numbers": {
    title: "Page numbers",
    tips: [
      "Bottom centre is the most common position",
      "Skip the cover so numbering looks right on reports",
      "Rotated pages get upright numbers",
      "Document metadata is removed from the saved copy",
      "Everything runs in your browser",
    ],
  },
  "pdf-watermark": {
    title: "Watermarking PDFs",
    tips: [
      "Diagonal is the classic look for CONFIDENTIAL or DRAFT",
      "Tiled is harder to crop out of screenshots",
      "Light keeps the text underneath easy to read",
      "Keep your original: the watermark is part of the saved copy",
      "Everything runs in your browser",
    ],
  },
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
      "Images convert at maximum quality; use the compressor to shrink them",
      "Metadata is removed from every converted file",
    ],
  },
  "compress-image": {
    title: "Picking a level",
    tips: [
      "Balanced is a good default for websites",
      "Light keeps every detail for print or editing",
      "Strong is best for thumbnails and email",
      "Target Size gets each file under a limit, like 100 KB for forms",
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
  "image-alt-text": {
    title: "How it works",
    tips: [
      "AI looks at each image and writes alt text",
      "Copy alt text, description or keywords in one click",
      "Downloads are renamed with an SEO file name",
      "Each image uses one AI request from your daily limit",
      "Real people are never named",
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

export const shellCopy = {
  home: "Pexlora home",
  collapse: "Collapse sidebar",
  expand: "Expand sidebar",
  keepOpen: "Keep sidebar open",
  newBadge: "New",
  searchTools: "Search tools",
  searchShortcut: "Search tools (Ctrl+K or ⌘K)",
  searchPlaceholder: "Search tools and pages",
  noResults: "No tools match your search.",
  website: "Open website",
  settings: "Account settings",
  filesLeft: (left: number) => `${left} ${left === 1 ? "file" : "files"} left`,
  ofToday: (limit: number) => `of ${limit} today`,
  tips: "Tips",
  limits: "Limits",
};

export const sharedLimits = [
  { label: "Images", value: formatMegabytes(FILE_SIZE_LIMITS_MB.image) },
  { label: "Convert, Edit Metadata, AVIF, TIFF, GIF", value: formatMegabytes(SERVER_IMAGE_SIZE_MB) },
  { label: "PDF and Office", value: formatMegabytes(FILE_SIZE_LIMITS_MB.pdf) },
  { label: "Audio", value: formatMegabytes(FILE_SIZE_LIMITS_MB.audio) },
  { label: "Video", value: formatMegabytes(FILE_SIZE_LIMITS_MB.video) },
  { label: "Files per batch", value: String(MAX_FILES_PER_BATCH) },
  { label: "Daily limit", value: `${DAILY_LIMITS.user} files` },
];

export const historyCopy = {
  empty: "Nothing here yet. Files you process stay on this device for 24 hours.",
  emptyTitle: "No files yet",
  openTools: "Open a Tool",
  clear: "Clear History",
  cleared: "History cleared",
  savedAt: (time: string) => `Saved ${time}`,
  expires: (time: string) => `Removed ${time}`,
  searchLabel: "Search files",
  searchPlaceholder: "Search by file name",
  sortLabel: "Sort files",
  sorts: { newest: "Newest", oldest: "Oldest", largest: "Largest" },
  categoryLabel: "Filter by tool type",
  categories: { all: "All", metadata: "Metadata", image: "Images", pdf: "PDFs", ai: "AI" },
  toolFilter: (tool: string) => `Tool: ${tool}`,
  removeToolFilter: "Remove tool filter",
  showing: (shown: number, total: number) => (shown === total ? `${total} files` : `${shown} of ${total} files`),
  noMatch: "No files match these filters.",
  resetFilters: "Clear Filters",
  summaryTitle: "On this device",
  stats: { files: "Files", size: "Size", tools: "Tools" },
  byTool: "By tool",
  zipName: "pexlora-files.zip",
  privacy: "Files stay in this browser only. Each one is removed 24 hours after you made it.",
};

export const tabBarCopy = {
  label: "Dashboard",
  home: "Home",
  tools: "Tools",
  history: "History",
  account: "Account",
};
