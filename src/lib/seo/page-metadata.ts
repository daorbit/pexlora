import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, path: string, keywords?: string[]): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description },
  };
}
