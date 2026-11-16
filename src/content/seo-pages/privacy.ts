import { Camera, MapPinOff } from "lucide-react";
import { extensions, faqs, removedList } from "@/content/seo-pages/shared";
import type { SeoPage } from "@/content/seo-pages/types";

export const privacyPages: SeoPage[] = [
  {
    slug: "remove-exif-data",
    category: "privacy",
    tool: "remove-metadata",
    kinds: ["image"],
    icon: Camera,
    name: "EXIF Remover",
    title: "EXIF Remover: Remove EXIF Data from Photos Online Free",
    headline: "Remove EXIF data from photos.",
    description: `Delete camera model, serial numbers, timestamps, software and GPS from ${extensions(["image"])} photos in one click.`,
    keywords: [
      "exif remover",
      "remove exif data",
      "exif data remover online",
      "delete exif data",
      "strip exif",
      "exif cleaner",
      "photo metadata remover",
      "remove metadata from photo",
    ],
    intro: {
      heading: "What EXIF reveals about you",
      paragraphs: [
        "EXIF is the block of data a camera or phone writes into every photo: make and model, lens, exposure settings, the exact time it was taken, often a serial number and, with location turned on, GPS coordinates.",
        "Pexlora removes the whole EXIF block together with XMP, IPTC, embedded thumbnails and the color profile. Orientation is applied to the pixels first, so the photo looks the same in every app.",
      ],
    },
    list: removedList([
      "Camera make, model and lens",
      "Serial numbers and owner name",
      "Date and time taken",
      "Exposure, ISO and focal length",
      "Editing software",
      "GPS latitude, longitude and altitude",
    ]),
    faqs: [
      {
        question: "How do I remove EXIF data from a photo?",
        answer:
          "Drop the photo into the box above and choose Remove Metadata. Download the clean copy, which has no EXIF, XMP or IPTC data.",
      },
      {
        question: "Will removing EXIF rotate my photo?",
        answer: "No. Orientation is applied to the pixels before the EXIF block is removed.",
      },
      {
        question: "Don't social networks remove EXIF already?",
        answer:
          "Many strip it on upload, but email, cloud links, messaging apps that send files and direct transfers usually keep it. Clean the file yourself before sending.",
      },
      faqs.imagePrivacy,
    ],
    related: ["remove-gps-from-photo", "exif-viewer", "ai-image-cleaner", "remove-video-metadata"],
  },
  {
    slug: "remove-gps-from-photo",
    category: "privacy",
    tool: "remove-metadata",
    kinds: ["image", "video"],
    icon: MapPinOff,
    name: "Photo Location Remover",
    title: "Remove GPS Location from Photos & Videos Online Free",
    headline: "Remove location from photos and videos.",
    description:
      "Phones save exact GPS coordinates in photos and videos. Remove them before you share, post or send a file.",
    keywords: [
      "remove gps from photo",
      "remove location from photo",
      "remove geotag from photo",
      "delete photo location",
      "remove location data from picture",
      "remove gps from video",
    ],
    intro: {
      heading: "Your photos can point to your home",
      paragraphs: [
        "With location services on, your phone writes the latitude, longitude and altitude of every shot into the photo. iPhones and Android phones do the same for videos. Anyone who receives the original file can open that spot on a map.",
        "Drop photos or videos below. The report lists the coordinates it finds under GPS location, and the cleaned copy has none. Videos are cleaned on your device without re-encoding.",
      ],
    },
    list: removedList([
      "GPS latitude and longitude",
      "Altitude and camera direction",
      "Location tags in iPhone and Android videos",
      "Place names in XMP and IPTC",
      "Timestamps that show when you were there",
    ]),
    faqs: [
      {
        question: "How do I check if a photo has location data?",
        answer: "Drop it into the box above. If GPS data is present, it appears under GPS location with the coordinates.",
      },
      {
        question: "Can I remove location from videos too?",
        answer: "Yes. Location tags in MP4 and MOV files are removed without re-encoding the video.",
      },
      {
        question: "Should I just turn off location on my phone?",
        answer: "That stops new photos being tagged. Cleaning removes location from photos and videos you've already taken.",
      },
    ],
    related: ["remove-exif-data", "remove-video-metadata", "exif-viewer", "ai-metadata-checker"],
  },
];
