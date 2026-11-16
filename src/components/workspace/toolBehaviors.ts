import { ALL_KINDS, type FileKind } from "@/config/file-formats";
import type { WorkspaceToolSlug } from "@/config/tools";
import { getCompressError, getMetadataFieldsError, getResizeError, type ToolOptions } from "@/lib/image/options";
import type { ProcessedFile } from "@/lib/metadata/types";
import { generateAltText } from "@/services/ai-api";
import { cleanFile } from "@/services/file-service";
import { compressImage, convertImage, editImageMetadata, resizeImage } from "@/services/image-api";

type ToolBehavior = {
  accepts: FileKind[];
  inspectOnAdd: boolean;
  expandReports: boolean;
  action?: {
    label: string;
    doneLabel: string;
    run: (file: File, options: ToolOptions) => Promise<ProcessedFile>;
    validate?: (options: ToolOptions) => string | null;
    zipName: string;
  };
};

export const toolBehaviors: Record<WorkspaceToolSlug, ToolBehavior> = {
  "remove-metadata": {
    accepts: ALL_KINDS,
    inspectOnAdd: true,
    expandReports: false,
    action: {
      label: "Remove Metadata",
      doneLabel: "Cleaned",
      run: (file) => cleanFile(file),
      zipName: "clean-files.zip",
    },
  },
  "convert-format": {
    accepts: ["image"],
    inspectOnAdd: false,
    expandReports: false,
    action: {
      label: "Convert Images",
      doneLabel: "Converted",
      run: (file, { convert }) => convertImage(file, convert.format),
      zipName: "converted-images.zip",
    },
  },
  "compress-image": {
    accepts: ["image"],
    inspectOnAdd: false,
    expandReports: false,
    action: {
      label: "Compress Images",
      doneLabel: "Compressed",
      run: (file, { compress }) => compressImage(file, compress),
      validate: ({ compress }) => getCompressError(compress),
      zipName: "compressed-images.zip",
    },
  },
  "resize-image": {
    accepts: ["image"],
    inspectOnAdd: false,
    expandReports: false,
    action: {
      label: "Resize Images",
      doneLabel: "Resized",
      run: (file, { resize }) => resizeImage(file, resize),
      validate: ({ resize }) => getResizeError(resize),
      zipName: "resized-images.zip",
    },
  },
  "edit-metadata": {
    accepts: ["image"],
    inspectOnAdd: true,
    expandReports: false,
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
    inspectOnAdd: false,
    expandReports: false,
    action: {
      label: "Generate Alt Text",
      doneLabel: "Generated",
      run: (file) => generateAltText(file),
      zipName: "renamed-images.zip",
    },
  },
  "view-metadata": {
    accepts: ALL_KINDS,
    inspectOnAdd: true,
    expandReports: true,
  },
};
