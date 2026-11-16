import { FileSearch, ScanSearch } from "lucide-react";
import { ALL_KINDS } from "@/config/file-formats";
import { faqs, shownList } from "@/content/seo-pages/shared";
import type { SeoPage } from "@/content/seo-pages/types";

export const viewerPages: SeoPage[] = [
  {
    slug: "exif-viewer",
    category: "viewers",
    tool: "view-metadata",
    kinds: ["image"],
    icon: FileSearch,
    name: "EXIF Viewer",
    title: "EXIF Viewer Online: See Photo Metadata, GPS & AI Tags Free",
    headline: "View EXIF data online.",
    description:
      "See every EXIF, XMP, IPTC and GPS field a photo carries, with AI tags flagged first. Free, with no sign-up.",
    keywords: [
      "exif viewer",
      "exif viewer online",
      "exif reader",
      "photo metadata viewer",
      "image metadata viewer",
      "check exif data",
      "view photo metadata",
    ],
    intro: {
      heading: "Read a photo's metadata in seconds",
      paragraphs: [
        "Drop a photo to see everything stored inside it. Fields are grouped by where they live, such as C2PA, XMP, IPTC, GPS, EXIF and color profile, with AI-related fields marked in orange and listed first.",
        "Viewing is free and doesn't count toward your daily limit. When you're done, open the Cleaner to remove what you found.",
      ],
    },
    list: shownList([
      "Camera make, model and lens",
      "Exposure, ISO and focal length",
      "Date, time and time zone",
      "GPS coordinates",
      "Software and edit history",
      "AI generator tags and C2PA manifests",
    ]),
    faqs: [
      faqs.inspectFree,
      {
        question: "Can I view metadata of PDFs or videos too?",
        answer: "Yes. The AI Metadata Checker and the Metadata Viewer read PDF, Office, audio and video files as well.",
      },
      faqs.imagePrivacy,
    ],
    related: ["ai-metadata-checker", "remove-exif-data", "remove-gps-from-photo", "ai-image-cleaner"],
  },
  {
    slug: "ai-metadata-checker",
    category: "viewers",
    tool: "view-metadata",
    kinds: ALL_KINDS,
    icon: ScanSearch,
    name: "AI Metadata Checker",
    title: "AI Metadata Checker: See If a File Has AI Tags or C2PA",
    headline: "Check any file for AI metadata.",
    description:
      "See whether an image, video, song or document carries AI generator tags or C2PA Content Credentials. Free, with no sign-up.",
    keywords: [
      "ai metadata checker",
      "check ai metadata",
      "c2pa checker",
      "content credentials checker",
      "check if image has ai tag",
      "ai tag checker",
      "ai image metadata viewer",
    ],
    intro: {
      heading: "AI tools often sign their work",
      paragraphs: [
        "AI tools often name themselves inside the files they create: a CreatorTool of Midjourney or Firefly in an image, a ChatGPT producer in a PDF, a Suno comment in an MP3, or a signed C2PA manifest from OpenAI or Google. The checker reads every field and highlights these in orange.",
        "It reports what's written in the file. It isn't an AI detector, and a file with no AI tags isn't proof that a person made it.",
      ],
    },
    list: shownList([
      "C2PA Content Credentials manifests",
      "IPTC DigitalSourceType: trainedAlgorithmicMedia",
      "Generator names such as Midjourney, DALL·E, Firefly, Gemini, Sora and Suno",
      "Stable Diffusion prompts and ComfyUI workflows",
      "AI app names in PDF and Office files",
    ]),
    faqs: [
      {
        question: "Can this tell me if an image is AI-generated?",
        answer:
          "Only if the file says so in its metadata. Metadata is easy to remove, so a file without AI tags isn't proof that a person made it.",
      },
      {
        question: "Which files can I check?",
        answer: "Photos, PDF, Word, Excel, PowerPoint, MP3, WAV, FLAC, M4A, MP4, MOV, WebM and MKV files.",
      },
      faqs.inspectFree,
    ],
    related: ["ai-image-cleaner", "remove-c2pa-content-credentials", "exif-viewer", "remove-audio-metadata"],
  },
];
