import { ALL_KINDS, type FileKind } from "@/config/file-formats";
import type { WorkspaceToolSlug } from "@/config/tools";
import type { OutputFormat } from "@/lib/image/formats";
import type { ProcessedFile } from "@/lib/metadata/types";
import { cleanFile } from "@/services/file-service";
import { convertImage } from "@/services/image-api";

export type ConvertOptions = { format: OutputFormat; quality: number };

type ToolBehavior = {
  accepts: FileKind[];
  inspectOnAdd: boolean;
  expandReports: boolean;
  action?: {
    label: string;
    run: (file: File, options: ConvertOptions) => Promise<ProcessedFile>;
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
      run: (file, options) => convertImage(file, options.format, options.quality),
      zipName: "converted-images.zip",
    },
  },
  "view-metadata": {
    accepts: ALL_KINDS,
    inspectOnAdd: true,
    expandReports: true,
  },
};
