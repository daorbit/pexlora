import { ALL_KINDS, type FileKind } from "@/config/file-formats";
import type { WorkspaceToolSlug } from "@/config/tools";
import { aiCopy } from "@/content/ai";
import { optionsCopy } from "@/content/workspace";
import { getCompressError, getMetadataFieldsError, getResizeError, type ToolOptions } from "@/lib/image/options";
import type { ProcessedFile } from "@/lib/metadata/types";
import { generateAltText } from "@/services/ai-api";
import { cleanFile } from "@/services/file-service";
import { compressImage, convertImage, editImageMetadata, resizeImage } from "@/services/image-api";

type ToolBehavior = {
  accepts: FileKind[];
  localCapable: boolean;
  inspectOnAdd: boolean;
  action?: {
    label: string;
    doneLabel: string;
    doneToast?: (count: number) => string;
    note?: string;
    compare?: boolean;
    autoRun?: boolean;
    run: (file: File, options: ToolOptions) => Promise<ProcessedFile>;
    validate?: (options: ToolOptions) => string | null;
    zipName: string;
  };
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
      compare: true,
      run: (file, { convert }) => convertImage(file, convert.format),
      zipName: "converted-images.zip",
    },
  },
  "compress-image": {
    accepts: ["image"],
    localCapable: false,
    inspectOnAdd: false,
    action: {
      label: "Compress Images",
      doneLabel: "Compressed",
      compare: true,
      run: (file, { compress }) => compressImage(file, compress),
      validate: ({ compress }) => getCompressError(compress),
      zipName: "compressed-images.zip",
    },
  },
  "resize-image": {
    accepts: ["image"],
    localCapable: false,
    inspectOnAdd: false,
    action: {
      label: "Resize Images",
      doneLabel: "Resized",
      compare: true,
      run: (file, { resize }) => resizeImage(file, resize),
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
};
