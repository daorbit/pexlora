import { ALL_KINDS, type FileKind } from "@/config/file-formats";
import type { WorkspaceToolSlug } from "@/config/tools";
import { aiCopy } from "@/content/ai";
import { localToolsCopy, optionsCopy } from "@/content/workspace";
import {
  getCompressError,
  getDpiError,
  getFormPhotoError,
  getImageWatermarkError,
  getMetadataFieldsError,
  getOrganizeError,
  getPdfImageError,
  getResizeError,
  getRotateImageError,
  getSignPdfError,
  getWatermarkError,
  type ToolOptions,
} from "@/lib/image/options";
import type { ProcessedFile } from "@/lib/metadata/types";
import { generateAltText } from "@/services/ai-api";
import { cleanFile } from "@/services/file-service";
import {
  csvToExcelFile,
  excelToCsvFile,
  excelToPdfFile,
  pdfToExcelFile,
  pdfToTextFile,
  pdfToWordFile,
  wordToPdfFile,
} from "@/services/converter-tools";
import { convertImage, editImageMetadata } from "@/services/image-api";
import {
  changeDpiFile,
  compressImageFile,
  compressPdfFile,
  convertHeicFile,
  cropImageFile,
  formPhotoFile,
  imageToSvgFile,
  imagesToPdfFile,
  mergePdfFiles,
  organizePdfFile,
  pageNumbersFile,
  paletteFile,
  passportSheetFile,
  pdfToJpgFile,
  photoSignatureFile,
  resizeImageFile,
  rotateImageFile,
  rotatePdfFile,
  shapeImageFile,
  signPdfFile,
  splitPdfFile,
  svgToImageFile,
  watermarkImageFile,
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

export type WorkspaceLayout = "rows" | "gallery" | "documents";

type ToolBehavior = {
  accepts: FileKind[];
  formats?: string[];
  localCapable: boolean;
  inspectOnAdd: boolean;
  layout?: WorkspaceLayout;
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
    layout: "gallery",
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
  "photo-signature": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Join Photo and Signature",
      doneLabel: "Joined",
      note: localToolsCopy.photoSignOrder,
      orderable: true,
      combine: (files, { photoSign }) => photoSignatureFile(files, photoSign),
      zipName: "photo-signature.zip",
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
  "change-dpi": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Change DPI",
      doneLabel: "Updated",
      note: localToolsCopy.onDevice,
      run: (file, { dpi }) => changeDpiFile(file, dpi),
      validate: ({ dpi }) => getDpiError(dpi),
      zipName: "dpi-images.zip",
    },
  },
  "rotate-image": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Rotate Images",
      doneLabel: "Rotated",
      note: localToolsCopy.onDevice,
      run: (file, { rotateImage }) => rotateImageFile(file, rotateImage),
      validate: ({ rotateImage }) => getRotateImageError(rotateImage),
      zipName: "rotated-images.zip",
    },
  },
  "image-watermark": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Add Watermark",
      doneLabel: "Watermarked",
      note: localToolsCopy.onDevice,
      run: (file, { imageWatermark }) => watermarkImageFile(file, imageWatermark),
      validate: ({ imageWatermark }) => getImageWatermarkError(imageWatermark),
      zipName: "watermarked-images.zip",
    },
  },
  "shape-image": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Shape Images",
      doneLabel: "Shaped",
      note: localToolsCopy.onDevice,
      run: (file, { shape }) => shapeImageFile(file, shape),
      zipName: "shaped-images.zip",
    },
  },
  "image-palette": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Make Palette",
      doneLabel: "Ready",
      note: localToolsCopy.onDevice,
      run: (file, { palette }) => paletteFile(file, palette),
      zipName: "color-palettes.zip",
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
    layout: "documents",
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
  "sign-pdf": {
    accepts: ["pdf"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Sign PDF",
      doneLabel: "Signed",
      note: localToolsCopy.onDevice,
      run: (file, { signPdf }) => signPdfFile(file, signPdf),
      validate: ({ signPdf }) => getSignPdfError(signPdf),
      zipName: "signed-pdfs.zip",
    },
  },
  "compress-pdf": {
    accepts: ["pdf"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Compress PDF",
      doneLabel: "Compressed",
      note: localToolsCopy.onDevice,
      run: (file, { pdfCompress }) => compressPdfFile(file, pdfCompress),
      zipName: "compressed-pdfs.zip",
    },
  },
  "jpg-to-pdf": {
    accepts: ["image"],
    localCapable: true,
    inspectOnAdd: false,
    layout: "documents",
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
      label: "Convert Pages",
      doneLabel: "Converted",
      note: localToolsCopy.onDevice,
      run: (file, { pdfImage }) => pdfToJpgFile(file, pdfImage),
      validate: ({ pdfImage }) => getPdfImageError(pdfImage),
      zipName: "pdf-images.zip",
    },
  },
  "excel-to-pdf": {
    accepts: ["office", "sheet"],
    formats: ["xlsx", "xls", "ods", "csv"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Convert to PDF",
      doneLabel: "Converted",
      note: localToolsCopy.onDevice,
      run: (file, { pdfPage }) => excelToPdfFile(file, pdfPage),
      zipName: "excel-pdfs.zip",
    },
  },
  "pdf-to-excel": {
    accepts: ["pdf"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Convert to Excel",
      doneLabel: "Converted",
      note: localToolsCopy.onDevice,
      run: (file, { pdfSheet }) => pdfToExcelFile(file, pdfSheet),
      zipName: "pdf-sheets.zip",
    },
  },
  "word-to-pdf": {
    accepts: ["office"],
    formats: ["docx"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Convert to PDF",
      doneLabel: "Converted",
      note: localToolsCopy.onDevice,
      run: (file, { pdfPage }) => wordToPdfFile(file, pdfPage),
      zipName: "word-pdfs.zip",
    },
  },
  "pdf-to-word": {
    accepts: ["pdf"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Convert to Word",
      doneLabel: "Converted",
      note: localToolsCopy.onDevice,
      autoRun: true,
      run: (file) => pdfToWordFile(file),
      zipName: "pdf-documents.zip",
    },
  },
  "pdf-to-text": {
    accepts: ["pdf"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Extract Text",
      doneLabel: "Extracted",
      note: localToolsCopy.onDevice,
      autoRun: true,
      run: (file) => pdfToTextFile(file),
      zipName: "pdf-text.zip",
    },
  },
  "csv-to-excel": {
    accepts: ["sheet"],
    formats: ["csv"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Convert to Excel",
      doneLabel: "Converted",
      note: localToolsCopy.onDevice,
      autoRun: true,
      run: (file) => csvToExcelFile(file),
      zipName: "csv-workbooks.zip",
    },
  },
  "excel-to-csv": {
    accepts: ["office", "sheet"],
    formats: ["xlsx", "xls", "ods"],
    localCapable: true,
    inspectOnAdd: false,
    action: {
      label: "Convert to CSV",
      doneLabel: "Converted",
      note: localToolsCopy.onDevice,
      autoRun: true,
      run: (file) => excelToCsvFile(file),
      zipName: "csv-files.zip",
    },
  },
};
