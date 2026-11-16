import type { Metadata } from "next";
import { getWorkspaceTool, type WorkspaceToolSlug } from "@/config/tools";
import { seoPagePath, type SeoPage } from "@/content/seo-pages";

const toolTitles: Record<WorkspaceToolSlug, string> = {
  "remove-metadata": "Remove Metadata from Photos Online: EXIF, GPS & AI Tags Free",
  "view-metadata": "EXIF Viewer: Check Photo Metadata & GPS Location Online Free",
  "edit-metadata": "EXIF Editor: Add Copyright & Author to Photos Online Free",
  "compress-image": "Compress Image Online: Reduce JPG, PNG & WebP Size Free",
  "resize-image": "Resize Image Online in Pixels or Percentage Free",
  "convert-format": "Image Converter: JPG to WebP, PNG to JPG & AVIF Online Free",
};

function pageMetadata(title: string, description: string, path: string, keywords?: string[]): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description },
  };
}

export function seoPageMetadata(page: SeoPage): Metadata {
  return pageMetadata(page.title, page.description, seoPagePath(page), page.keywords);
}

export function toolMetadata(slug: WorkspaceToolSlug): Metadata {
  const tool = getWorkspaceTool(slug);
  return pageMetadata(toolTitles[slug], tool.description, tool.href);
}
