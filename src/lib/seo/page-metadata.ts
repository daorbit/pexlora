import type { Metadata } from "next";
import { openGraphDefaults, twitterDefaults } from "@/config/seo";
import { ogCopy } from "@/content/og";
import { OG_SIZE, ogImagePath, type OgKind } from "@/lib/seo/og-path";

export type PageImage = { kind: OgKind; slug: string; name: string };

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  keywords?: string[],
  image?: PageImage,
): Metadata {
  const images = image
    ? [{ url: ogImagePath(image.kind, image.slug), ...OG_SIZE, type: "image/png", alt: ogCopy.alt(image.name) }]
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { ...openGraphDefaults, title, description, url: path, ...(images && { images }) },
    twitter: { ...twitterDefaults, title, description, ...(images && { images }) },
  };
}

export const noIndexMetadata: Metadata = {
  robots: { index: false, follow: true },
};
