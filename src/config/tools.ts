import {
  FileImage,
  FileSearch,
  Minimize2,
  Scaling,
  ShieldOff,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/config/site";

export type WorkspaceToolSlug = "remove-metadata" | "convert-format" | "view-metadata";
export type ToolSlug = WorkspaceToolSlug | "compress" | "resize";

type BaseTool = {
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
};

export type WorkspaceTool = BaseTool & {
  slug: WorkspaceToolSlug;
  status: "available";
  href: string;
  headline: string;
};

export type UpcomingTool = BaseTool & {
  slug: Exclude<ToolSlug, WorkspaceToolSlug>;
  status: "coming-soon";
};

export type Tool = WorkspaceTool | UpcomingTool;

export const workspaceTools: WorkspaceTool[] = [
  {
    slug: "remove-metadata",
    status: "available",
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
    status: "available",
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
    status: "available",
    href: routes.viewMetadata,
    icon: FileSearch,
    name: "Metadata Viewer",
    shortName: "Inspector",
    headline: "See what your files reveal.",
    description:
      "Read every EXIF, XMP, author, audio and video tag a file carries, with AI tags shown first.",
  },
];

export const upcomingTools: UpcomingTool[] = [
  {
    slug: "compress",
    status: "coming-soon",
    icon: Minimize2,
    name: "Image Compressor",
    shortName: "Compressor",
    description: "Shrink file size while keeping images sharp.",
  },
  {
    slug: "resize",
    status: "coming-soon",
    icon: Scaling,
    name: "Image Resizer",
    shortName: "Resizer",
    description: "Resize to exact dimensions, a percentage or common presets.",
  },
];

export const tools: Tool[] = [...workspaceTools, ...upcomingTools];

export function getWorkspaceTool(slug: WorkspaceToolSlug) {
  return workspaceTools.find((tool) => tool.slug === slug)!;
}
