import { routes } from "@/config/site";
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
  | "image-alt-text";

export type ToolCategory = "metadata" | "image" | "ai";

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
      "Check photo metadata online: EXIF, GPS location, camera, XMP, author and AI tags in images, PDFs, audio and video, with AI tags shown first.",
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
      "Convert JPG to WebP, PNG to JPG, WebP to PNG and more at full quality. Metadata is removed from every file.",
  },
  {
    slug: "image-alt-text",
    category: "ai",
    href: routes.altText,
    icon: AltTextIcon,
    name: "AI Alt Text Generator",
    shortName: "AI Alt Text",
    headline: "Generate alt text and SEO file names with AI.",
    description:
      "AI looks at each image and writes accessible alt text, a short description, keywords and an SEO-friendly file name you can download.",
  },
];

export const toolIconSrc = (slug: WorkspaceToolSlug) => `/icons/tools/${slug}.svg`;

export function getWorkspaceTool(slug: WorkspaceToolSlug) {
  return workspaceTools.find((tool) => tool.slug === slug)!;
}

export function toolsInCategory(category: ToolCategory) {
  return workspaceTools.filter((tool) => tool.category === category);
}
