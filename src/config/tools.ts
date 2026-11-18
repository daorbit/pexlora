import { AI_NAME } from "@/config/brand";
import { routes } from "@/config/site";
import {
  Combine,
  Crop,
  FileImage,
  IdCard,
  Images,
  Layers,
  ListOrdered,
  Palette,
  PenTool,
  Printer,
  RotateCcwSquare,
  RotateCw,
  Scissors,
  Shapes,
  SquareUser,
  Stamp,
  SwitchCamera,
} from "lucide-react";
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
  | "pdf-to-jpg"
  | "svg-to-image"
  | "image-to-svg"
  | "crop-image"
  | "change-dpi"
  | "rotate-image"
  | "shape-image"
  | "image-palette"
  | "passport-photo"
  | "organize-pdf"
  | "pdf-page-numbers"
  | "pdf-watermark";

export type ToolCategory = "metadata" | "image" | "pdf" | "ai" | "utility";

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
  utility: "Utilities",
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
    slug: "crop-image",
    category: "image",
    href: routes.cropImage,
    icon: Crop,
    name: "Crop Image",
    shortName: "Crop Image",
    headline: "Crop images to square, 4:5, 16:9 and more.",
    description:
      "Crop JPG, PNG, WebP and HEIC images to a square, a 4:5 portrait post, a 9:16 story or a 16:9 widescreen frame. Cropped in your browser, nothing is uploaded.",
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
    slug: "svg-to-image",
    category: "image",
    href: routes.svgToImage,
    icon: FileImage,
    name: "SVG to PNG Converter",
    shortName: "SVG to PNG",
    headline: "Convert SVG to PNG, JPG or WebP.",
    description:
      "Turn SVG icons, logos and illustrations into sharp PNG, JPG or WebP images at 1x, 2x, 4x or an exact pixel size. Converted in your browser, nothing is uploaded.",
  },
  {
    slug: "image-to-svg",
    category: "image",
    href: routes.imageToSvg,
    icon: PenTool,
    name: "PNG to SVG Converter",
    shortName: "PNG to SVG",
    headline: "Convert PNG and JPG to SVG vectors.",
    description:
      "Trace logos, icons, signatures and simple artwork from PNG, JPG or WebP into real SVG vector paths you can scale and edit. Traced in your browser, nothing is uploaded.",
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
    slug: "change-dpi",
    category: "image",
    href: routes.changeDpi,
    icon: Printer,
    name: "Change Image DPI",
    shortName: "Change DPI",
    headline: "Change image DPI to 300, 200 or any value.",
    description:
      "Set the DPI of JPG and PNG images to 300, 200, 96 or any value without touching a single pixel, for forms, print shops and documents. Done in your browser, nothing is uploaded.",
  },
  {
    slug: "rotate-image",
    category: "image",
    href: routes.rotateImage,
    icon: RotateCcwSquare,
    name: "Rotate & Flip Image",
    shortName: "Rotate Image",
    headline: "Rotate and flip images the right way up.",
    description:
      "Rotate JPG, PNG, WebP and HEIC images by 90°, 180° or 270° and flip them horizontally or vertically, so they show upright everywhere. Done in your browser, nothing is uploaded.",
  },
  {
    slug: "shape-image",
    category: "image",
    href: routes.shapeImage,
    icon: Shapes,
    name: "Round Image & Shapes",
    shortName: "Round Image",
    headline: "Round the corners or crop images into a circle, heart or star.",
    description:
      "Give images rounded corners or crop them into a circle, heart, star, hexagon or arch, saved as a transparent PNG or on white. Done in your browser, nothing is uploaded.",
  },
  {
    slug: "image-palette",
    category: "image",
    href: routes.palette,
    icon: Palette,
    name: "Color Palette Generator",
    shortName: "Color Palette",
    headline: "Pull the main colours out of any image.",
    description:
      "Get the 5, 8 or 12 main colours of a photo, logo or design as hex codes you can copy, plus a palette card to download. Done in your browser, nothing is uploaded.",
  },
  {
    slug: "passport-photo",
    category: "image",
    href: routes.passportPhoto,
    icon: SquareUser,
    name: "Passport Photo Maker",
    shortName: "Passport Photo",
    headline: "Make a printable sheet of passport photos.",
    description:
      "Turn one photo into a 4 × 6 in or A4 print sheet of 35 × 45 mm, 2 × 2 in or stamp-size passport photos with cut lines. Made in your browser at 300 DPI.",
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
    slug: "organize-pdf",
    category: "pdf",
    href: routes.organizePdf,
    icon: Layers,
    name: "Organize PDF",
    shortName: "Organize PDF",
    headline: "Delete, reorder and extract PDF pages.",
    description:
      "Remove pages from a PDF, change their order or pull out just the ones you need, with a preview of every page. Runs in your browser, nothing is uploaded.",
  },
  {
    slug: "pdf-page-numbers",
    category: "pdf",
    href: routes.pdfPageNumbers,
    icon: ListOrdered,
    name: "Add Page Numbers to PDF",
    shortName: "Page Numbers",
    headline: "Add page numbers to a PDF.",
    description:
      "Number every page of a PDF at the top or bottom, as 1, Page 1 or Page 1 of 9, with the option to skip the cover. Added in your browser, nothing is uploaded.",
  },
  {
    slug: "pdf-watermark",
    category: "pdf",
    href: routes.pdfWatermark,
    icon: Stamp,
    name: "Add Watermark to PDF",
    shortName: "Watermark PDF",
    headline: "Add a text watermark to a PDF.",
    description:
      "Stamp CONFIDENTIAL, DRAFT, COPY or your own text across every page of a PDF, diagonal, straight or tiled. Added in your browser, nothing is uploaded.",
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
      "Save all or just the pages you pick as sharp JPG or PNG images, at screen or print sharpness, in one ZIP. Rendered in your browser, nothing is uploaded.",
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
