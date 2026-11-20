import { FileSearch, MapPinned, ScanSearch } from "lucide-react";
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
    title: "EXIF Viewer Online: See Photo EXIF, GPS & AI Tags",
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
      "when was this photo taken",
      "check the date a photo was taken",
      "how to see photo metadata",
      "what camera took this photo",
    ],
    intro: {
      heading: "Read a photo's metadata in seconds",
      paragraphs: [
        "Drop a photo to see everything stored inside it. Fields are grouped by where they live, such as C2PA, XMP, IPTC, GPS, EXIF and color profile, with AI-related fields marked in orange and listed first.",
        "Viewing is free and doesn't count toward your daily limit. When you're done, open Remove Metadata to strip what you found.",
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
        question: "How do I find out when a photo was taken?",
        answer:
          "Drop it into the box above and look for Date taken under EXIF. That's when the shot was taken, not Date modified, which changes whenever the file is saved again. Photos saved from social networks often have no date left.",
      },
      {
        question: "Can I view metadata of PDFs or videos too?",
        answer: "Yes. The AI Metadata Checker and the Metadata Viewer read PDF, Office, audio and video files as well.",
      },
      faqs.imagePrivacy,
    ],
    related: ["photo-location-finder", "ai-metadata-checker", "remove-exif-data"],
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
      "is this image ai generated",
      "how to check if an image is ai generated",
      "check if a photo was made with ai",
      "trainedalgorithmicmedia meaning",
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
      {
        question: "What does trainedAlgorithmicMedia mean?",
        answer:
          "It's the IPTC DigitalSourceType value for media made entirely by an AI model. Edited photos with AI parts use compositeWithTrainedAlgorithmicMedia instead.",
      },
      faqs.inspectFree,
    ],
    related: ["ai-image-cleaner", "remove-c2pa-content-credentials", "exif-viewer"],
  },
  {
    slug: "photo-location-finder",
    category: "viewers",
    tool: "view-metadata",
    kinds: ["image"],
    icon: MapPinned,
    name: "Photo Location Finder",
    title: "Photo Location Finder: Where Was This Photo Taken?",
    headline: "Find where a photo was taken.",
    description:
      "Read the GPS coordinates saved in a photo and open the spot on a map, if the file still has its location data.",
    keywords: [
      "where was this photo taken",
      "photo location finder",
      "find location of photo",
      "image location finder",
      "gps coordinates from photo",
      "check photo location",
      "how to find where a photo was taken",
      "find gps location from a picture",
      "see location of a photo on a map",
    ],
    intro: {
      heading: "How a photo knows its location",
      paragraphs: [
        "With location services on, phones write latitude, longitude and altitude into every photo. Drop a photo below and, if those fields are there, the report shows the coordinates with a link that opens the spot on a map.",
        "This works only when the file still has GPS data. Most social networks strip it on upload, and screenshots never have it. Pexlora reads metadata only and doesn't guess a location from what's in the picture.",
        "The map opens only when you click it, so your coordinates aren't sent to a map service just by viewing the report.",
      ],
    },
    list: shownList([
      "GPS latitude and longitude",
      "Altitude and camera direction",
      "Date and time the photo was taken",
      "Phone or camera model",
      "Lens and camera settings",
    ]),
    faqs: [
      {
        question: "Why doesn't my photo show a location?",
        answer:
          "Location was off when it was taken, or the file was re-saved by an app or social network that removed GPS data. Screenshots never contain it.",
      },
      {
        question: "Can I remove the location afterwards?",
        answer: "Yes. Open Remove Metadata to download a copy with no GPS data or other metadata.",
      },
    ],
    related: ["remove-gps-from-photo", "remove-location-from-iphone-photos", "exif-viewer"],
  },
];
