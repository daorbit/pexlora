import type { Metadata } from "next";
import { compressTargetPath, type CompressTarget } from "@/config/compress-targets";
import { conversionPath, type Conversion } from "@/config/conversions";
import { formPresetPath, type FormPreset } from "@/config/form-presets";
import { imagePdfPath, type ImagePdfVariant } from "@/config/image-pdf-variants";
import { getTextTool, type TextToolSlug } from "@/config/text-tools";
import { getWorkspaceTool, type WorkspaceToolSlug } from "@/config/tools";
import { getUtilityTool, type UtilityToolSlug } from "@/config/utility-tools";
import { utilityTitles } from "@/content/utility-tools";
import { formPresetCopy, toolPageCopy } from "@/content/tool-pages";
import { compressTargetLocalKeywords, formPresetLocalKeywords, toolKeywords } from "@/content/tool-keywords";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { seoPagePath, type SeoPage } from "@/content/seo-pages";

const toolTitles: Record<WorkspaceToolSlug, string> = {
  "remove-metadata": "Remove Metadata from Photos, PDFs, Audio & Video",
  "view-metadata": "Metadata Viewer: Check Photos, PDFs, Audio & Video",
  "edit-metadata": "EXIF Editor: Add Author & Copyright to Photos Free",
  "compress-image": "Compress Image Online: Reduce JPG & PNG Size",
  "resize-image": "Resize Image Online in Pixels or Percentage Free",
  "convert-format": "Image Converter: JPG, PNG, WebP & AVIF Online Free",
  "image-alt-text": "AI Alt Text Generator: Alt Text & SEO File Names",
  "heic-to-jpg": "HEIC to JPG Converter: Convert iPhone Photos Free",
  "form-photo": "Photo & Signature Resizer for Forms in KB",
  "merge-pdf": "Merge PDF Online: Combine PDF Files Free",
  "split-pdf": "Split PDF Online: Separate PDF Pages Free",
  "rotate-pdf": "Rotate PDF Online: Turn PDF Pages and Save Free",
  "jpg-to-pdf": "JPG to PDF Converter: Combine Images into One PDF",
  "pdf-to-jpg": "PDF to JPG Converter: PDF Pages to Images",
  "svg-to-image": "SVG to PNG Converter: SVG to PNG, JPG, WebP",
  "image-to-svg": "PNG to SVG Converter: Trace Images to Vector",
  "crop-image": "Crop Image Online: Square, 4:5, 9:16 & 16:9 Free",
  "change-dpi": "Change Image DPI Online: Set 300 or 200 DPI Free",
  "rotate-image": "Rotate Image Online: Rotate & Flip JPG, PNG Free",
  "shape-image": "Round Image Corners or Crop to a Circle Free",
  "image-palette": "Color Palette from Image: Get Hex Codes Free",
  "passport-photo": "Passport Photo Maker: 4x6 & A4 Print Sheet",
  "organize-pdf": "Organize PDF: Delete & Reorder Pages Free",
  "pdf-page-numbers": "Add Page Numbers to PDF Online Free",
  "pdf-watermark": "Add Watermark to PDF Online: Text Watermark Free",
  "excel-to-pdf": "Excel to PDF Converter: XLSX & CSV to PDF",
  "pdf-to-excel": "PDF to Excel Converter: PDF Tables to XLSX",
  "word-to-pdf": "Word to PDF Converter: DOCX to PDF Online Free",
  "pdf-to-word": "PDF to Word Converter: PDF to Editable DOCX Free",
  "pdf-to-text": "PDF to Text Converter: Extract Text from PDF Free",
  "csv-to-excel": "CSV to Excel Converter: CSV to XLSX Online Free",
  "excel-to-csv": "Excel to CSV Converter: XLSX to UTF-8 CSV Free",
};

const textToolTitles: Record<TextToolSlug, string> = {
  "ai-text-detector": "AI Text Detector: Check if Text Is AI Free",
  "ai-humanizer": "AI Humanizer: Humanize AI Text Free",
};

export function textToolMetadata(slug: TextToolSlug): Metadata {
  const tool = getTextTool(slug);
  return pageMetadata(textToolTitles[slug], tool.description, tool.href);
}

export function utilityToolMetadata(slug: UtilityToolSlug): Metadata {
  const tool = getUtilityTool(slug);
  return pageMetadata(utilityTitles[slug], tool.description, tool.href);
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

export function imagePdfMetadata(variant: ImagePdfVariant): Metadata {
  return pageMetadata(
    toolPageCopy.imagePdfTitle(variant.from),
    toolPageCopy.imagePdfMetaDescription(variant.from),
    imagePdfPath(variant.slug),
    [`${variant.from} to PDF`, `convert ${variant.from} to PDF`],
  );
}

export function compressTargetMetadata(target: CompressTarget): Metadata {
  return pageMetadata(
    toolPageCopy.compressTargetTitle(target.label),
    toolPageCopy.compressTargetMetaDescription(target.label),
    compressTargetPath(target.slug),
    [...toolPageCopy.compressTargetKeywords(target.label), ...compressTargetLocalKeywords(target.label)],
  );
}

export function toolMetadata(slug: WorkspaceToolSlug): Metadata {
  const tool = getWorkspaceTool(slug);
  return pageMetadata(toolTitles[slug], tool.description, tool.href, toolKeywords[slug]);
}

export function formPresetMetadata(preset: FormPreset): Metadata {
  return pageMetadata(
    formPresetCopy.title(preset),
    formPresetCopy.metaDescription(preset),
    formPresetPath(preset.slug),
    [...formPresetCopy.keywords(preset), ...formPresetLocalKeywords(preset.name)],
  );
}
