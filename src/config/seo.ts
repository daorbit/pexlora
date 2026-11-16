import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const seo = {
  defaultTitle: `${siteConfig.name}: Free Online Metadata Remover & Image Tools`,
  description:
    "Remove EXIF, GPS and AI metadata from photos, PDFs, Office files, audio and video, then compress, resize or convert images. Free online tools, no sign-up.",
  keywords: [
    "remove metadata from photo",
    "metadata remover",
    "EXIF remover",
    "remove EXIF data",
    "remove GPS from photo",
    "image metadata remover",
    "remove AI metadata",
    "AI metadata remover",
    "AI image cleaner",
    "C2PA remover",
    "remove metadata from PDF",
    "remove metadata from Word document",
    "remove metadata from video",
    "EXIF viewer",
    "photo metadata viewer",
    "EXIF editor",
    "add copyright to photo",
    "compress image",
    "image compressor",
    "reduce image size",
    "resize image",
    "image resizer",
    "image converter",
    "JPG to WebP",
    "PNG to JPG",
  ],
  locale: "en_US",
};

const socialImage = {
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: `${siteConfig.name}: your files, your privacy. Remove hidden metadata from photos, documents, audio and video before you share.`,
};

export const openGraphDefaults = {
  type: "website",
  siteName: siteConfig.name,
  locale: seo.locale,
  images: [{ ...socialImage, url: "/opengraph-image.jpg" }],
} satisfies NonNullable<Metadata["openGraph"]>;

export const twitterDefaults = {
  card: "summary_large_image",
  images: [{ ...socialImage, url: "/twitter-image.jpg" }],
} satisfies NonNullable<Metadata["twitter"]>;
