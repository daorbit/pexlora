import { ALL_KINDS, type FileKind } from "@/config/file-formats";
import type { WorkspaceToolSlug } from "@/config/tools";
import { aiCopy } from "@/content/ai";
import { localToolsCopy, optionsCopy } from "@/content/workspace";
import {
  getCompressError,
  getFormPhotoError,
  getMetadataFieldsError,
  getOrganizeError,
  getResizeError,
  getWatermarkError,
  type ToolOptions,
} from "@/lib/image/options";
import type { ProcessedFile } from "@/lib/metadata/types";
import { generateAltText } from "@/services/ai-api";
import { cleanFile } from "@/services/file-service";
import { convertImage, editImageMetadata } from "@/services/image-api";
import {
  compressImageFile,
  convertHeicFile,
  cropImageFile,
  formPhotoFile,
  imageToSvgFile,
  imagesToPdfFile,
  mergePdfFiles,
  organizePdfFile,
  pageNumbersFile,
  passportSheetFile,
  pdfToJpgFile,
  resizeImageFile,
  rotatePdfFile,
  splitPdfFile,
  svgToImageFile,
  watermarkPdfFile,
} from "@/services/local-tools";

export type ToolAction = {
  label: string;
  doneLabel: string;
  doneToast?: (count: number) => string;
  note?: string;
  compare?: boolean;
  autoRun?: boolean;
  orderable?: boolean;
  run?: (file: File, options: ToolOptions) => Promise<ProcessedFile>;
  combine?: (files: File[], options: ToolOptions) => Promise<ProcessedFile>;
  validate?: (options: ToolOptions) => string | null;
  zipName: string;
};

type ToolBehavior = {
  accepts: FileKind[];
  localCapable: boolean;
  inspectOnAdd: boolean;
  action?: ToolAction;
};

export const toolBehaviors: Record<WorkspaceToolSlug, ToolBehavior> = {
  "remove-metadata": {
    accepts: ALL_KINDS,
    localCapable: true,
    inspectOnAdd: true,
    action: {
      label: "Remove Metadata",
      doneLabel: "Cleaned",
      autoRun: true,
      run: (file) => cleanFile(file),
      zipName: "clean-files.zip",
    },
  },
  "convert-format": {
    accepts: ["image"],
    localCapable: false,
    inspectOnAdd: false,
    action: {
      label: "Convert Images",
      doneLabel: "Converted",
      note: optionsCopy.fullQuality,
      run: (file, { convert }) => convertImage(file, convert.format),
      zipName: "converted-images.zip",
    },
  },
  "compress-image": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Compress Images",
      doneLabel: "Compressed",
      note: localToolsCopy.mostlyOnDevice,
      compare: true,
      run: (file, { compress }) => compressImageFile(file, compress),
      validate: ({ compress }) => getCompressError(compress),
      zipName: "compressed-images.zip",
    },
  },
  "resize-image": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Resize Images",
      doneLabel: "Resized",
      note: localToolsCopy.mostlyOnDevice,
      compare: true,
      run: (file, { resize }) => resizeImageFile(file, resize),
      validate: ({ resize }) => getResizeError(resize),
      zipName: "resized-images.zip",
    },
  },
  "edit-metadata": {
    accepts: ["image"],
    localCapable: false,
    inspectOnAdd: true,
    action: {
      label: "Save Metadata",
      doneLabel: "Saved",
      run: (file, { metadata }) => editImageMetadata(file, metadata),
      validate: ({ metadata }) => getMetadataFieldsError(metadata),
      zipName: "edited-images.zip",
    },
  },
  "image-alt-text": {
    accepts: ["image"],
    localCapable: false,
    inspectOnAdd: false,
    action: {
      label: "Generate Alt Text",
      doneLabel: "Generated",
      doneToast: aiCopy.altTextReady,
      run: (file) => generateAltText(file),
      zipName: "renamed-images.zip",
    },
  },
  "view-metadata": {
    accepts: ALL_KINDS,
    localCapable: true,
    inspectOnAdd: true,
  },
  "heic-to-jpg": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Convert Photos",
      doneLabel: "Converted",
      note: localToolsCopy.onDevice,
      autoRun: true,
      run: (file, { heic }) => convertHeicFile(file, heic.format),
      zipName: "converted-photos.zip",
    },
  },
  "svg-to-image": {
    accepts: ["vector"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Convert SVGs",
      doneLabel: "Converted",
      note: localToolsCopy.onDevice,
      autoRun: true,
      run: (file, { svg }) => svgToImageFile(file, svg),
      zipName: "svg-images.zip",
    },
  },
  "image-to-svg": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Convert to SVG",
      doneLabel: "Traced",
      note: localToolsCopy.onDevice,
      compare: true,
      run: (file, { trace }) => imageToSvgFile(file, trace),
      zipName: "svg-vectors.zip",
    },
  },
  "form-photo": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Resize for Form",
      doneLabel: "Ready",
      note: localToolsCopy.onDevice,
      compare: true,
      run: (file, { form }) => formPhotoFile(file, form),
      validate: ({ form }) => getFormPhotoError(form),
      zipName: "form-photos.zip",
    },
  },
  "crop-image": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Crop Images",
      doneLabel: "Cropped",
      note: localToolsCopy.onDevice,
      compare: true,
      run: (file, { crop }) => cropImageFile(file, crop),
      zipName: "cropped-images.zip",
    },
  },
  "passport-photo": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Make Photo Sheet",
      doneLabel: "Ready",
      note: localToolsCopy.onDevice,
      run: (file, { passport }) => passportSheetFile(file, passport),
      zipName: "passport-photo-sheets.zip",
    },
  },
  "organize-pdf": {
    accepts: ["pdf"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Save PDF",
      doneLabel: "Saved",
      note: localToolsCopy.onDevice,
      run: (file, { organize }) => organizePdfFile(file, organize),
      validate: ({ organize }) => getOrganizeError(organize),
      zipName: "organized-pdfs.zip",
    },
  },
  "pdf-page-numbers": {
    accepts: ["pdf"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Add Page Numbers",
      doneLabel: "Numbered",
      note: localToolsCopy.onDevice,
      run: (file, { pageNumbers }) => pageNumbersFile(file, pageNumbers),
      zipName: "numbered-pdfs.zip",
    },
  },
  "pdf-watermark": {
    accepts: ["pdf"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Add Watermark",
      doneLabel: "Watermarked",
      note: localToolsCopy.onDevice,
      run: (file, { watermark }) => watermarkPdfFile(file, watermark),
      validate: ({ watermark }) => getWatermarkError(watermark),
      zipName: "watermarked-pdfs.zip",
    },
  },
  "merge-pdf": {
    accepts: ["pdf"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Merge PDFs",
      doneLabel: "Merged",
      note: localToolsCopy.orderHint,
      orderable: true,
      combine: (files) => mergePdfFiles(files),
      zipName: "merged.zip",
    },
  },
  "split-pdf": {
    accepts: ["pdf"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Split PDF",
      doneLabel: "Split",
      note: localToolsCopy.onDevice,
      autoRun: true,
      run: (file) => splitPdfFile(file),
      zipName: "split-pages.zip",
    },
  },
  "rotate-pdf": {
    accepts: ["pdf"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Rotate PDF",
      doneLabel: "Rotated",
      note: localToolsCopy.onDevice,
      run: (file, { rotate }) => rotatePdfFile(file, rotate.angle),
      zipName: "rotated-pdfs.zip",
    },
  },
  "jpg-to-pdf": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Create PDF",
      doneLabel: "Created",
      note: localToolsCopy.orderHint,
      orderable: true,
      combine: (files) => imagesToPdfFile(files),
      zipName: "images.zip",
    },
  },
  "pdf-to-jpg": {
    accepts: ["pdf"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Convert to JPG",
      doneLabel: "Converted",
      note: localToolsCopy.onDevice,
      autoRun: true,
      run: (file) => pdfToJpgFile(file),
      zipName: "pdf-images.zip",
    },
  },
};
