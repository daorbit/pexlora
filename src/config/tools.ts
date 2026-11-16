import {
  FileImage,
  FilePenLine,
  FileSearch,
  Minimize2,
  Scaling,
  ShieldOff,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/config/site";

export type WorkspaceToolSlug =
  | "remove-metadata"
  | "convert-format"
  | "compress-image"
  | "resize-image"
  | "view-metadata"
  | "edit-metadata";

export type WorkspaceTool = {
  slug: WorkspaceToolSlug;
  href: string;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  icon: LucideIcon;
};

export const workspaceTools: WorkspaceTool[] = [
  {
    slug: "remove-metadata",
    href: routes.removeMetadata,
    icon: ShieldOff,
    name: "Remove AI Metadata",
    shortName: "Cleaner",
    headline: "Remove AI metadata from any file.",
    description:
      "Strip C2PA credentials, AI-generator tags, EXIF, GPS and author details from photos, PDFs, Office documents, audio and video.",
  },
  {
    slug: "convert-format",
    href: routes.convert,
    icon: FileImage,
    name: "Image Converter",
    shortName: "Converter",
    headline: "Convert images in seconds.",
    description:
      "Switch between JPG, PNG, WebP and AVIF with quality control. Metadata is removed from every file.",
  },
  {
    slug: "view-metadata",
    href: routes.viewMetadata,
    icon: FileSearch,
    name: "Metadata Viewer",
    shortName: "Inspector",
    headline: "See what your files reveal.",
    description:
      "Read every EXIF, XMP, author, audio and video tag a file carries, with AI tags shown first.",
  },
  {
    slug: "edit-metadata",
    href: routes.editMetadata,
    icon: FilePenLine,
    name: "Metadata Editor",
    shortName: "Editor",
    headline: "Add your name and copyright to images.",
    description:
      "Write author, copyright, description and keywords into JPG, PNG, WebP and AVIF files. GPS, camera and AI tags are removed.",
  },
  {
    slug: "compress-image",
    href: routes.compress,
    icon: Minimize2,
    name: "Image Compressor",
    shortName: "Compressor",
    headline: "Compress images without losing sharpness.",
    description:
      "Shrink JPG, PNG, WebP and AVIF files with three compression levels. The format stays the same and metadata is removed.",
  },
  {
    slug: "resize-image",
    href: routes.resize,
    icon: Scaling,
    name: "Image Resizer",
    shortName: "Resizer",
    headline: "Resize images to any size.",
    description:
      "Scale images by percentage or to an exact width and height, with or without keeping the aspect ratio. Metadata is removed.",
  },
];

export function getWorkspaceTool(slug: WorkspaceToolSlug) {
  return workspaceTools.find((tool) => tool.slug === slug)!;
}
