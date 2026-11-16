import type { Metadata } from "next";
import { openGraphDefaults, twitterDefaults } from "@/config/seo";

export function pageMetadata(title: string, description: string, path: string, keywords?: string[]): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { ...openGraphDefaults, title, description, url: path },
    twitter: { ...twitterDefaults, title, description },
  };
}

export const noIndexMetadata: Metadata = {
  robots: { index: false, follow: true },
};
