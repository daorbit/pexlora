import type { Metadata } from "next";
import { compressTargetPath, type CompressTarget } from "@/config/compress-targets";
import { conversionPath, type Conversion } from "@/config/conversions";
import { getTextTool, type TextToolSlug } from "@/config/text-tools";
import { getWorkspaceTool, type WorkspaceToolSlug } from "@/config/tools";
import { toolPageCopy } from "@/content/tool-pages";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { seoPagePath, type SeoPage } from "@/content/seo-pages";

const toolTitles: Record<WorkspaceToolSlug, string> = {
  "remove-metadata": "Remove Metadata from Photos, PDFs, Audio & Video",
  "view-metadata": "Metadata Viewer: Check Photos, PDFs, Audio & Video",
  "edit-metadata": "EXIF Editor: Add Author & Copyright to Photos Free",
  "compress-image": "Compress Image Online: Reduce JPG, PNG & WebP Size Free",
  "resize-image": "Resize Image Online in Pixels or Percentage Free",
  "convert-format": "Image Converter: JPG, PNG, WebP & AVIF Online Free",
  "image-alt-text": "AI Alt Text Generator: Alt Text & SEO File Names",
  "heic-to-jpg": "HEIC to JPG Converter: Convert iPhone Photos Free",
  "merge-pdf": "Merge PDF Online: Combine PDF Files Free",
  "split-pdf": "Split PDF Online: Separate PDF Pages Free",
  "rotate-pdf": "Rotate PDF Online: Turn PDF Pages and Save Free",
  "jpg-to-pdf": "JPG to PDF Converter: Combine Images into One PDF",
  "pdf-to-jpg": "PDF to JPG Converter: Save PDF Pages as Images Free",
};

const textToolTitles: Record<TextToolSlug, string> = {
  "ai-text-detector": "AI Text Detector: Check if Text Was Written by AI Free",
};

export function textToolMetadata(slug: TextToolSlug): Metadata {
  const tool = getTextTool(slug);
  return pageMetadata(textToolTitles[slug], tool.description, tool.href);
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

export function compressTargetMetadata(target: CompressTarget): Metadata {
  return pageMetadata(
    toolPageCopy.compressTargetTitle(target.label),
    toolPageCopy.compressTargetMetaDescription(target.label),
    compressTargetPath(target.slug),
    toolPageCopy.compressTargetKeywords(target.label),
  );
}

export function toolMetadata(slug: WorkspaceToolSlug): Metadata {
  const tool = getWorkspaceTool(slug);
  return pageMetadata(toolTitles[slug], tool.description, tool.href);
}
