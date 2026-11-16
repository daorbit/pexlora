import { formatsOfKind, formatsOfKinds, type FileFormat } from "@/config/file-formats";
import { DAILY_LIMITS, FILE_SIZE_LIMITS_MB, MAX_FILES_PER_BATCH } from "@/config/limits";
import { FORMAT_LABELS, OUTPUT_FORMATS } from "@/lib/image/formats";
import { formatMegabytes } from "@/lib/utils/format-bytes";

const labels = (formats: FileFormat[]) => formats.map((format) => format.label);
const limit = (kind: keyof typeof FILE_SIZE_LIMITS_MB) => formatMegabytes(FILE_SIZE_LIMITS_MB[kind]);

export const heroCopy = {
  badge: "Free",
  tagline: "Your files. Your privacy.",
  title: "Remove AI metadata from",
  highlight: "any file.",
  description:
    "Drop a photo, PDF, document, audio or video file to strip AI tags, GPS location, EXIF and author details before you share it.",
};

export const hubCopy = {
  eyebrow: "All tools",
  title: "Pick a tool and drop your files.",
  description: "Every tool is free, works in your browser and removes hidden metadata from what you download.",
  filterLabel: "Filter tools",
  open: "Open Tool",
};

export const trustChips = [
  "No sign-up",
  "Files never stored",
  `${DAILY_LIMITS.anonymous} free files a day`,
  "No quality loss",
];

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

export const aiTags = [
  "C2PA manifest",
  "DigitalSourceType",
  "CreatorTool: Midjourney",
  "parameters: Steps 30, CFG 7",
  "Software: DALL·E 3",
  "Credit: Made with AI",
];

export const locationRows = [
  { key: "Make", value: "Apple" },
  { key: "Model", value: "iPhone 15 Pro" },
  { key: "Taken", value: "14 Oct 2026, 17:42" },
  { key: "Location", value: "15.4959° N, 73.8093° E" },
];

export const risksCopy = {
  eyebrow: "Why it matters",
  title: "Every file says more than you think.",
  description: "Hidden fields can reveal where you were, who wrote a document and which AI tool made an image.",
};

export const risks = [
  {
    id: "location",
    title: "Your location travels with the file",
    description:
      "Phones save exact coordinates in photos and videos. Anyone with the original file can find the street.",
    sample: { label: "GPS", value: "15.4959° N, 73.8093° E" },
  },
  {
    id: "ai",
    title: "AI tools sign their work",
    description:
      "Midjourney, ChatGPT, Firefly and Suno write tags and C2PA credentials that apps and platforms can read.",
    sample: { label: "CreatorTool:", value: "Midjourney v6" },
  },
  {
    id: "device",
    title: "Your device leaves a fingerprint",
    description:
      "Camera model, lens, serial numbers, editing software and exact timestamps can link photos back to you.",
    sample: { label: "Model:", value: "iPhone 15 Pro" },
  },
  {
    id: "author",
    title: "Documents name their author",
    description:
      "Word, Excel, PowerPoint and PDF files store who wrote them, the company, editing time and every reviewer who left a comment.",
    sample: { label: "creator:", value: "A. Sharma" },
  },
];

type StepRow = { name: string; meta?: string; badge?: { label: string; tone: "warning" | "danger" } };

export const steps: { label: string; title: string; description: string; rows: StepRow[]; highlight?: boolean }[] = [
  {
    label: "01 · Drop",
    title: "Drop your files",
    description: `Photos, PDFs, Word, Excel, PowerPoint, songs and videos. Up to ${MAX_FILES_PER_BATCH} at a time.`,
    rows: [
      { name: "holiday.jpg", meta: "3.1 MB" },
      { name: "contract.docx", meta: "84 KB" },
      { name: "clip.mov", meta: "146 MB" },
    ],
  },
  {
    label: "02 · Review",
    title: "See what's inside",
    description: "Every field is read first. AI tags show in orange, location in red.",
    rows: [
      { name: "CreatorTool", badge: { label: "AI", tone: "warning" } },
      { name: "GPSLatitude", badge: { label: "Location", tone: "danger" } },
      { name: "dc:creator", meta: "A. Sharma" },
    ],
  },
  {
    label: "03 · Download",
    title: "Download clean copies",
    description: "Each file is checked again after cleaning, so you know nothing is left.",
    highlight: true,
    rows: [
      { name: "holiday-clean.jpg", meta: "0 tags" },
      { name: "contract-clean.docx", meta: "0 tags" },
      { name: "clip-clean.mov", meta: "0 tags" },
    ],
  },
];

export const stepsCopy = {
  eyebrow: "How it works",
  title: "Three steps. Nothing to install.",
  description: "Drop a file, see what it carries and download a clean copy that's checked twice.",
};

const extensionList = (formats: FileFormat[]) =>
  formats.flatMap((format) => format.extensions.slice(0, 1).map((extension) => `.${extension}`)).join(" ");

export const privacyCopy = {
  eyebrow: "Privacy",
  title: "Your files stay",
  highlight: "yours.",
  description:
    "Most files are cleaned right in your browser. Images take a short trip over HTTPS and are gone the moment the clean copy is back.",
};

export const privacyRows = [
  { title: "PDF and Office", formats: extensionList(formatsOfKinds(["pdf", "office"])), local: true },
  { title: "Audio", formats: extensionList(formatsOfKind("audio")), local: true },
  { title: "Video", formats: extensionList(formatsOfKind("video")), local: true },
  { title: "Images", formats: extensionList(formatsOfKind("image")), local: false },
];

export const privacyBadges = { local: "On your device", server: "Memory only" };

export const formatsCopy = {
  eyebrow: "Formats",
  title: "Works with the files you share.",
};

export const formatGroups = [
  { title: "Images", note: `Up to ${limit("image")} · clean and convert`, formats: labels(formatsOfKind("image")) },
  { title: "Documents", note: `Up to ${limit("pdf")} · on your device`, formats: labels(formatsOfKinds(["pdf", "office"])) },
  { title: "Audio", note: `Up to ${limit("audio")} · no re-encoding`, formats: labels(formatsOfKind("audio")) },
  { title: "Video", note: `Up to ${limit("video")} · no re-encoding`, formats: labels(formatsOfKind("video")) },
  {
    title: "Convert images to",
    note: "Always metadata-free",
    formats: OUTPUT_FORMATS.map((format) => FORMAT_LABELS[format]),
  },
];

export const formatsDescription =
  "Clean photos, documents, songs and videos in the formats you already use. Converted images always come out without metadata.";

export const popularToolsCopy = {
  eyebrow: "Popular tools",
  title: "A metadata remover for every kind of file.",
  description: "Jump straight to the tool for the app or file type you're working with.",
};

export const glossary = [
  {
    term: "EXIF",
    body: "Exchangeable Image File Format. Written by cameras and phones: make, model, lens, exposure, timestamps and often GPS coordinates.",
  },
  {
    term: "XMP",
    body: "Extensible Metadata Platform, an Adobe standard. Stores editing history, creator tools and the IPTC digital source type that marks AI images.",
  },
  {
    term: "IPTC",
    body: "A press standard for captions, credits, copyright and keywords. Newer fields describe whether an image was made with AI.",
  },
  {
    term: "C2PA",
    body: "Content Credentials. A signed manifest that records how an image was created and edited. OpenAI, Adobe and others add it to AI images.",
  },
  {
    term: "GPS",
    body: "Latitude, longitude and altitude saved when location services are on. The most sensitive data most photos carry.",
  },
  {
    term: "PNG text chunks",
    body: "Plain-text notes inside PNG files. Stable Diffusion tools such as Automatic1111 and ComfyUI store full prompts and settings here.",
  },
  {
    term: "Document properties",
    body: "Fields inside PDF, Word, Excel and PowerPoint files: author, last editor, company, template, editing time and the app that made the file.",
  },
  {
    term: "ID3 and audio tags",
    body: "Tags inside MP3, FLAC, WAV and M4A files: title, artist, encoder, cover art and comments. AI music tools often name themselves here.",
  },
  {
    term: "Video metadata",
    body: "MP4, MOV and WebM files record the camera or phone, recording date, encoder and often the GPS location where the clip was filmed.",
  },
];

export const faqCopy = {
  eyebrow: "FAQ",
  title: "Questions, answered.",
  description: "What we remove, what we keep and what happens to your files.",
  contact: "Contact Us",
};

export const accountCopy = {
  title: `Process up to ${DAILY_LIMITS.user} files a day, free.`,
  description: "One click with Google. No card, no trial, no catch.",
  google: "Continue with Google",
  email: "Sign Up with Email",
};

export const faqs = [
  {
    question: "What does removing AI metadata actually do?",
    answer:
      "AI tools write tags like C2PA credentials, XMP digital source type and generation prompts into the file. We re-encode the image without any of them, so platforms that read metadata find nothing. The picture looks the same.",
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
      "PDF, Office, audio and video files are cleaned in your browser and never uploaded. Images are processed in memory on our server and discarded as soon as the result is sent back.",
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
      "JPEG and WebP files are re-encoded at high quality to avoid visible loss, which can add a few kilobytes. Use the compressor if size matters.",
  },
];
