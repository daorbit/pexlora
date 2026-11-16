import type { Metadata } from "next";
import { conversionPath, type Conversion } from "@/config/conversions";
import { getTextTool, type TextToolSlug } from "@/config/text-tools";
import { getWorkspaceTool, type WorkspaceToolSlug } from "@/config/tools";
import { toolPageCopy } from "@/content/tool-pages";
import { seoPagePath, type SeoPage } from "@/content/seo-pages";

const toolTitles: Record<WorkspaceToolSlug, string> = {
  "remove-metadata": "Remove Metadata from Photos Online: EXIF, GPS & AI Tags Free",
  "view-metadata": "EXIF Viewer: Check Photo Metadata & GPS Location Online Free",
  "edit-metadata": "EXIF Editor: Add Copyright & Author to Photos Online Free",
  "compress-image": "Compress Image Online: Reduce JPG, PNG & WebP Size Free",
  "resize-image": "Resize Image Online in Pixels or Percentage Free",
  "convert-format": "Image Converter: JPG to WebP, PNG to JPG & AVIF Online Free",
  "image-alt-text": "AI Alt Text Generator: Image Descriptions & SEO File Names Free",
};

const textToolTitles: Record<TextToolSlug, string> = {
  "ai-text-detector": "AI Text Detector: Check if Text Was Written by AI Free",
  "ai-humanizer": "AI Humanizer: Make AI Text Sound Natural and Human Free",
};

export function textToolMetadata(slug: TextToolSlug): Metadata {
  const tool = getTextTool(slug);
  return pageMetadata(textToolTitles[slug], tool.description, tool.href);
}

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

export function conversionMetadata(conversion: Conversion): Metadata {
  return pageMetadata(
    toolPageCopy.conversionTitle(conversion.from, conversion.toLabel),
    toolPageCopy.conversionMetaDescription(conversion.from, conversion.toLabel),
    conversionPath(conversion.slug),
    [`${conversion.from} to ${conversion.toLabel}`, `convert ${conversion.from} to ${conversion.toLabel}`],
  );
}

export function toolMetadata(slug: WorkspaceToolSlug): Metadata {
  const tool = getWorkspaceTool(slug);
  return pageMetadata(toolTitles[slug], tool.description, tool.href);
}
