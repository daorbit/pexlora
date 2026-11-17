import { AI_NAME } from "@/config/brand";
import { ALL_KINDS, formatsOfKind, formatsOfKinds, type FileFormat } from "@/config/file-formats";
import { DAILY_LIMITS, FILE_SIZE_LIMITS_MB, MAX_FILES_PER_BATCH } from "@/config/limits";
import { formatMegabytes } from "@/lib/utils/format-bytes";

const labels = (formats: FileFormat[]) => formats.map((format) => format.label);
const limit = (kind: keyof typeof FILE_SIZE_LIMITS_MB) => formatMegabytes(FILE_SIZE_LIMITS_MB[kind]);

export const heroCopy = {
  eyebrow: "Free metadata remover",
  eyebrowNote: "No sign-up",
  title: "Share the photo.",
  titleLead: "Not the",
  highlight: "location.",
  description:
    "Strip AI tags, GPS, EXIF and author details from photos, PDFs, documents, audio and video in seconds. We don't keep your files.",
  shortcutsLabel: "Popular tools",
  trustLabel: "Why Pexlora",
  trust: [
    { id: "free", label: "Free, no sign-up" },
    { id: "private", label: "Files aren't saved" },
    { id: "fast", label: "Done in seconds" },
  ],
  recentLabel: "(recently used)",
  shortcutShortLabels: {
    "remove-metadata": "Clean",
    "view-metadata": "View",
    "edit-metadata": "Edit",
    "compress-image": "Compress",
    "compress-to-size": "To Size",
    "resize-image": "Resize",
    "convert-format": "Convert",
    "image-alt-text": "Alt Text",
    "heic-to-jpg": "HEIC",
    "form-photo": "Form",
    "merge-pdf": "Merge",
    "split-pdf": "Split",
    "rotate-pdf": "Rotate",
    "jpg-to-pdf": "To PDF",
    "pdf-to-jpg": "To JPG",
    "svg-to-image": "SVG",
    "image-to-svg": "To SVG",
    "crop-image": "Crop",
    "passport-photo": "Passport",
    "organize-pdf": "Organize",
    "pdf-page-numbers": "Numbers",
    "pdf-watermark": "Watermark",
  } as Record<string, string>,
};

export const hubCopy = {
  eyebrow: "All tools",
  title: "Pick a tool and drop your files.",
  description: "Every tool is free, runs in your browser with nothing to install, and removes hidden metadata from what you download.",
  filterLabel: "Filter tools",
  filterShortLabel: "Category",
  filterClose: "Close",
  open: "Open Tool",
};

export const showcaseFile = {
  name: "ai-render.jpg",
  src: "/samples/ai-render.jpg",
  details: "JPEG · 1200 × 900",
};

export const showcaseTags = [
  { group: "XMP", key: "DigitalSourceType", value: "trainedAlgorithmicMedia", ai: true },
  { group: "XMP", key: "CreatorTool", value: "Midjourney v6.1", ai: true },
  { group: "XMP", key: "Credit", value: "Made with AI", ai: true },
  { group: "EXIF", key: "Software", value: "Midjourney v6.1", ai: true },
  { group: "EXIF", key: "ImageDescription", value: "a dreamy sunset over violet mountains…", ai: false },
  { group: "EXIF", key: "Artist", value: "midjourney-bot", ai: true },
];

export const featureBands = {
  location: {
    eyebrow: "Location",
    value: "15.4959° N, 73.8093° E",
    title: "Your photos know where you were.",
    description: "See GPS, device and time data before you share, then strip it in one click.",
  },
  ai: {
    eyebrow: "AI labels",
    before: "Made with AI",
    after: "Just a picture.",
    title: "No more “Made with AI” labels.",
    description: "Strip C2PA credentials, XMP digital source type, prompts and generator names that platforms read.",
  },
  convert: {
    eyebrow: "Convert",
    from: "3.1 MB",
    format: ".webp",
    to: "412 KB",
    title: "Modern formats, smaller files.",
    description: "Turn JPG and PNG into WebP or AVIF at maximum quality. Every file comes out clean.",
  },
};

export const stepsCopy = {
  title: "Three steps. Nothing to install.",
};

export const steps = [
  {
    title: "Drop",
    description: `Photos, PDFs, Word, Excel, PowerPoint, songs and videos. Up to ${MAX_FILES_PER_BATCH} at a time.`,
  },
  { title: "Read", description: "Every field is read first. AI tags show in orange, location in red." },
  { title: "Clean", description: "Download a clean copy. It’s checked again, so you know nothing is left." },
];

export const stepsDemo = {
  file: "sunset.jpg",
  fileMeta: "3.1 MB",
  fields: [
    { key: "CreatorTool", label: "AI", tone: "ai" as const },
    { key: "GPSLatitude", label: "Location", tone: "location" as const },
    { key: "Model", label: "iPhone 15 Pro", tone: "plain" as const },
  ],
  cleanFile: "sunset-clean.jpg",
  cleanBadge: "0 tags",
};

export const risksCopy = {
  title: "Every file says more than you think.",
  description:
    "This is what one phone photo, one AI render and one Word file carry before Pexlora. Afterwards, none of it.",
};

export type FeedTone = "location" | "ai" | "plain";

export const metadataFeed: { key: string; value: string; tone: FeedTone }[] = [
  { key: "GPSLatitude", value: "15.4959° N", tone: "location" },
  { key: "GPSLongitude", value: "73.8093° E", tone: "location" },
  { key: "Model", value: "iPhone 15 Pro", tone: "plain" },
  { key: "LensModel", value: "iPhone 15 Pro back camera", tone: "plain" },
  { key: "DateTimeOriginal", value: "2026:10:14 17:42:09", tone: "plain" },
  { key: "CreatorTool", value: "Midjourney v6.1", tone: "ai" },
  { key: "DigitalSourceType", value: "trainedAlgorithmicMedia", tone: "ai" },
  { key: "c2pa.actions", value: "c2pa.created", tone: "ai" },
  { key: "Credit", value: "Made with AI", tone: "ai" },
  { key: "dc:creator", value: "A. Sharma", tone: "plain" },
  { key: "Company", value: "Sharma & Co.", tone: "plain" },
  { key: "TotalEditingTime", value: "4 h 12 min", tone: "plain" },
];

export const privacyCopy = {
  stat: "0",
  title: "files kept.",
  description:
    "Photos, PDFs, Office files, songs and videos are cleaned inside your browser and never leave it. Only AVIF, TIFF and GIF images, and the image editing tools, use our server, where files are processed in memory and not saved.",
  badges: ["On your device", "Memory only on the server", "HTTPS"],
};

export const formatsCopy = {
  title: "Works with the files you share.",
  description: `Images up to ${limit("image")}, documents ${limit("pdf")}, audio ${limit("audio")}, video ${limit("video")}. Converted images always come out clean.`,
};

export const formatExtensions = formatsOfKinds(ALL_KINDS).map((format) => `.${format.extensions[0]}`);

export const popularToolsCopy = {
  title: "Type the app. Get the tool.",
  searchLabel: "Search tools",
  placeholder: "Try midjourney, gps or pdf",
  empty: "No tool for that yet.",
  count: (shown: number, total: number) => `${shown} of ${total}`,
};

export const learnCopy = {
  title: "What is file metadata?",
  tabsLabel: "Metadata types",
};

export const glossary = [
  {
    term: "EXIF",
    body: "Exchangeable Image File Format. Written by cameras and phones: make, model, lens, exposure, timestamps and often GPS coordinates.",
    sample: { key: "Model", value: "iPhone 15 Pro" },
  },
  {
    term: "XMP",
    body: "Extensible Metadata Platform, an Adobe standard. Stores editing history, creator tools and the IPTC digital source type that marks AI images.",
    sample: { key: "xmp:CreatorTool", value: "Midjourney v6.1" },
  },
  {
    term: "IPTC",
    body: "A press standard for captions, credits, copyright and keywords. Newer fields describe whether an image was made with AI.",
    sample: { key: "DigitalSourceType", value: "trainedAlgorithmicMedia" },
  },
  {
    term: "C2PA",
    body: "Content Credentials. A signed manifest that records how an image was created and edited. OpenAI, Adobe and others add it to AI images.",
    sample: { key: "c2pa.actions", value: "c2pa.created" },
  },
  {
    term: "GPS",
    body: "Latitude, longitude and altitude saved when location services are on. The most sensitive data most photos carry.",
    sample: { key: "GPSLatitude", value: "15.4959° N" },
  },
  {
    term: "PNG",
    body: "Plain-text notes inside PNG files. Stable Diffusion tools such as Automatic1111 and ComfyUI store full prompts and settings here.",
    sample: { key: "parameters", value: "Steps: 30, CFG scale: 7" },
  },
  {
    term: "Docs",
    body: "Fields inside PDF, Word, Excel and PowerPoint files: author, last editor, company, template, editing time and the app that made the file.",
    sample: { key: "dc:creator", value: "A. Sharma" },
  },
  {
    term: "ID3",
    body: "Tags inside MP3, FLAC, WAV and M4A files: title, artist, encoder, cover art and comments. AI music tools often name themselves here.",
    sample: { key: "TSSE", value: "Suno" },
  },
  {
    term: "Video",
    body: "MP4, MOV and WebM files record the camera or phone, recording date, encoder and often the GPS location where the clip was filmed.",
    sample: { key: "com.apple.quicktime.location", value: "+15.4959+073.8093" },
  },
];

export const faqCopy = {
  eyebrow: "FAQ",
  title: "Questions, answered.",
  description: "What we remove, what we keep and what happens to your files.",
  contact: "Contact Us",
};

export const accountCopy = {
  title: `${DAILY_LIMITS.user} files a day.`,
  highlight: "Free.",
  description: "One click with Google. No card, no trial, no catch.",
  google: "Continue with Google",
  googleShort: "Google",
  email: "Sign Up with Email",
  emailShort: "Email",
};

export const faqs = [
  {
    question: "What does removing AI metadata actually do?",
    answer:
      "AI tools write tags like C2PA credentials, XMP digital source type and generation prompts into the file. We cut those tags out and give you a copy without them, so platforms that read metadata find nothing. For JPG, PNG and WebP the pixels stay exactly the same.",
  },
  {
    question: "Will this remove invisible watermarks like SynthID?",
    answer:
      "No. Invisible watermarks live in the pixels, not in metadata. We only remove metadata and don't claim to beat pixel-level watermarks or AI detectors.",
  },
  {
    question: "How do I remove GPS location from a photo?",
    answer:
      "Open the Remove Metadata tool, drop the photo in and click Remove Metadata. GPS coordinates, along with every other EXIF, XMP and IPTC field, are removed from the downloaded copy.",
  },
  {
    question: "Do I need an account?",
    answer: `No. You can process ${DAILY_LIMITS.anonymous} files a day without signing up. A free account raises that to ${DAILY_LIMITS.user}.`,
  },
  {
    question: "Are my files uploaded or stored?",
    answer:
      `JPG, PNG, WebP and HEIC photos, PDF, Office, audio and video files are cleaned in your browser and never uploaded. AVIF, TIFF and GIF images, and images you convert, compress, resize or edit, are processed in memory on our server and not saved. ${AI_NAME} features work differently: they send the image or text you submit to Cloudflare Workers AI to produce the answer.`,
  },
  {
    question: "Which files can I clean?",
    answer: `Photos (${labels(formatsOfKind("image")).join(", ")}), PDF, Word, Excel and PowerPoint (${labels(formatsOfKind("office")).join(", ")}), audio (${labels(formatsOfKind("audio")).join(", ")}) and video (${labels(formatsOfKind("video")).join(", ")}).`,
  },
  {
    question: "Does cleaning a video or song lower its quality?",
    answer:
      "No. Audio and video are never re-encoded. Metadata is blanked out in place, so the picture and sound stay exactly the same and the file size barely changes.",
  },
  {
    question: "What is removed from Word, Excel, PowerPoint and PDF files?",
    answer:
      "Author, last editor, company, manager, template, editing time, custom properties, comment and tracked-change author names, the preview thumbnail, XMP and C2PA data. The text and layout of the document are untouched.",
  },
  {
    question: "Does converting also strip metadata?",
    answer:
      "Yes. Every converted file is written without EXIF, XMP, IPTC or C2PA data. Orientation is applied to the pixels first, so nothing ends up sideways.",
  },
  {
    question: "Which format should I convert to?",
    answer:
      "WebP is the safest choice for websites and works everywhere modern. AVIF gives the smallest files for photos. Use PNG when you need lossless quality or transparency, and JPG for maximum compatibility.",
  },
  {
    question: "Why did my file get bigger after cleaning?",
    answer:
      "Usually it doesn't: JPG, PNG, WebP and HEIC files only lose their metadata, so they come out slightly smaller. AVIF, TIFF and GIF files are re-encoded at high quality, which can add some size. Use the compressor if size matters.",
  },
];
