import type { Metadata } from "next";
import { getWorkspaceTool, type WorkspaceToolSlug } from "@/config/tools";
import { seoPagePath, type SeoPage } from "@/content/seo-pages";

const toolTitles: Record<WorkspaceToolSlug, string> = {
  "remove-metadata": "Remove AI Metadata, EXIF & GPS from Images, PDF & Video Free",
  "convert-format": "Convert Images to WebP, AVIF, PNG & JPG Free",
  "view-metadata": "Metadata Viewer: See EXIF, XMP, Author & AI Tags in Any File",
  "compress-image": "Compress JPG, PNG, WebP & AVIF Images Online Free",
  "resize-image": "Resize Images by Pixels or Percentage Online Free",
  "edit-metadata": "Edit Image Metadata: Add Author, Copyright & Keywords Free",
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
