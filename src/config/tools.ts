import { AI_NAME } from "@/config/brand";
import { routes } from "@/config/site";
import { Combine, FileImage, IdCard, Images, RotateCw, Scissors, SwitchCamera } from "lucide-react";
import { AltTextIcon } from "@/components/icons/AltTextIcon";
import { CompressImageIcon } from "@/components/icons/CompressImageIcon";
import { ConvertImageIcon } from "@/components/icons/ConvertImageIcon";
import { EditMetadataIcon } from "@/components/icons/EditMetadataIcon";
import { RemoveMetadataIcon } from "@/components/icons/RemoveMetadataIcon";
import { ResizeImageIcon } from "@/components/icons/ResizeImageIcon";
import type { IconComponent } from "@/components/icons/types";
import { ViewMetadataIcon } from "@/components/icons/ViewMetadataIcon";

export type WorkspaceToolSlug =
  | "remove-metadata"
  | "convert-format"
  | "compress-image"
  | "resize-image"
  | "view-metadata"
  | "edit-metadata"
  | "image-alt-text"
  | "heic-to-jpg"
  | "form-photo"
  | "merge-pdf"
  | "split-pdf"
  | "rotate-pdf"
  | "jpg-to-pdf"
  | "pdf-to-jpg";

export type ToolCategory = "metadata" | "image" | "pdf" | "ai";

export type WorkspaceTool = {
  slug: WorkspaceToolSlug;
  category: ToolCategory;
  href: string;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  icon: IconComponent;
};

export const toolCategories: Record<ToolCategory, string> = {
  metadata: "Metadata tools",
  image: "Image tools",
  pdf: "PDF tools",
  ai: "AI tools",
};

export const workspaceTools: WorkspaceTool[] = [
  {
    slug: "remove-metadata",
    category: "metadata",
    href: routes.removeMetadata,
    icon: RemoveMetadataIcon,
    name: "EXIF & Metadata Remover",
    shortName: "Remove Metadata",
    headline: "Remove EXIF, GPS and AI metadata from any file.",
    description:
      "Remove metadata from photos, PDFs, Office documents, audio and video: EXIF, GPS location, C2PA credentials, AI tags and author names.",
  },
  {
    slug: "view-metadata",
    category: "metadata",
    href: routes.viewMetadata,
    icon: ViewMetadataIcon,
    name: "EXIF & Metadata Viewer",
    shortName: "View Metadata",
    headline: "View EXIF data and hidden metadata.",
    description:
      "See the hidden metadata in photos, PDFs, Office files, audio and video: EXIF, GPS location, camera, XMP, author and AI tags, with AI tags shown first.",
  },
  {
    slug: "edit-metadata",
    category: "metadata",
    href: routes.editMetadata,
    icon: EditMetadataIcon,
    name: "EXIF & Metadata Editor",
    shortName: "Edit Metadata",
    headline: "Edit EXIF data and add copyright to photos.",
    description:
      "Add author, copyright, description and keywords to JPG, PNG, WebP and AVIF images. GPS, camera and AI tags are removed.",
  },
  {
    slug: "compress-image",
    category: "image",
    href: routes.compress,
    icon: CompressImageIcon,
    name: "Image Compressor",
    shortName: "Compress Image",
    headline: "Compress images and reduce file size.",
    description:
      "Reduce image size for JPG, PNG, WebP and AVIF with three compression levels or an exact target like 100 KB. The format stays the same and metadata is removed.",
  },
  {
    slug: "resize-image",
    category: "image",
    href: routes.resize,
    icon: ResizeImageIcon,
    name: "Image Resizer",
    shortName: "Resize Image",
    headline: "Resize images in pixels or by percentage.",
    description:
      "Change image size to an exact width and height in pixels or scale by percentage, with or without keeping the aspect ratio.",
  },
  {
    slug: "convert-format",
    category: "image",
    href: routes.convert,
    icon: ConvertImageIcon,
    name: "Image Converter",
    shortName: "Convert Image",
    headline: "Convert images to JPG, PNG, WebP or AVIF.",
    description:
      "Convert JPG to WebP, PNG to JPG, WebP to PNG and more at the highest quality setting. Metadata is removed from every file.",
  },
  {
    slug: "image-alt-text",
    category: "ai",
    href: routes.altText,
    icon: AltTextIcon,
    name: "AI Alt Text Generator",
    shortName: "AI Alt Text",
    headline: `Generate alt text and SEO file names with ${AI_NAME}.`,
    description:
      `${AI_NAME} looks at each image and writes accessible alt text, a short description, keywords and an SEO-friendly file name you can download.`,
  },
  {
    slug: "heic-to-jpg",
    category: "image",
    href: routes.heicToJpg,
    icon: SwitchCamera,
    name: "HEIC to JPG Converter",
    shortName: "HEIC to JPG",
    headline: "Convert iPhone HEIC photos to JPG.",
    description:
      "Turn iPhone HEIC photos into JPG or PNG right in your browser. Photos aren't uploaded and the converted files carry no EXIF or GPS data.",
  },
  {
    slug: "form-photo",
    category: "image",
    href: routes.formPhoto,
    icon: IdCard,
    name: "Photo & Signature Resizer",
    shortName: "Form Photo",
    headline: "Resize photos and signatures for online forms.",
    description:
      "Get a photo or signature to the exact pixel size and KB range an exam, bank or government form asks for. Done in your browser, saved as JPG.",
  },
  {
    slug: "merge-pdf",
    category: "pdf",
    href: routes.mergePdf,
    icon: Combine,
    name: "Merge PDF",
    shortName: "Merge PDF",
    headline: "Merge PDF files into one.",
    description:
      "Combine several PDFs into a single file in the order you choose. It runs in your browser, so your documents aren't uploaded.",
  },
  {
    slug: "split-pdf",
    category: "pdf",
    href: routes.splitPdf,
    icon: Scissors,
    name: "Split PDF",
    shortName: "Split PDF",
    headline: "Split a PDF into separate pages.",
    description:
      "Turn every page of a PDF into its own file and download them together as a ZIP. Processed in your browser, nothing is uploaded.",
  },
  {
    slug: "rotate-pdf",
    category: "pdf",
    href: routes.rotatePdf,
    icon: RotateCw,
    name: "Rotate PDF",
    shortName: "Rotate PDF",
    headline: "Rotate PDF pages and save them.",
    description:
      "Turn every page of a PDF by 90 or 180 degrees and save it. Author, title and other document metadata are removed at the same time.",
  },
  {
    slug: "jpg-to-pdf",
    category: "pdf",
    href: routes.jpgToPdf,
    icon: FileImage,
    name: "JPG to PDF",
    shortName: "JPG to PDF",
    headline: "Turn images into one PDF.",
    description:
      "Combine JPG, PNG, WebP and HEIC images into a single PDF with one image per page. Converted in your browser, with no photo metadata inside.",
  },
  {
    slug: "pdf-to-jpg",
    category: "pdf",
    href: routes.pdfToJpg,
    icon: Images,
    name: "PDF to JPG",
    shortName: "PDF to JPG",
    headline: "Convert PDF pages to JPG images.",
    description:
      "Save every page of a PDF as a sharp JPG image and download them together as a ZIP. Rendered in your browser, nothing is uploaded.",
  },
];

export const nextStepTools: WorkspaceToolSlug[] = ["remove-metadata", "compress-image", "resize-image", "convert-format"];

export const toolIconSrc =(slug: WorkspaceToolSlug) => `/icons/tools/${slug}.svg`;

export function getWorkspaceTool(slug: WorkspaceToolSlug) {
  return workspaceTools.find((tool) => tool.slug === slug)!;
}

export function toolsInCategory(category: ToolCategory) {
  return workspaceTools.filter((tool) => tool.category === category);
}
