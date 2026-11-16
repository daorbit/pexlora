import type { FileFormat } from "@/config/file-formats";
import type { MetadataReport } from "@/lib/metadata/types";

export type FileProcessor = {
  inspect: (file: Blob, format: FileFormat) => Promise<MetadataReport>;
  clean: (file: Blob, format: FileFormat) => Promise<Blob>;
};

export class UnreadableFileError extends Error {}
