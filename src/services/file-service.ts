import { fileKinds, type FileFormat } from "@/config/file-formats";
import { detectFormat } from "@/lib/files/detect";
import { loadProcessor, type LocalEngine } from "@/lib/files/processors";
import { UnreadableFileError, type FileProcessor } from "@/lib/files/processors/types";
import type { MetadataReport, ProcessedFile } from "@/lib/metadata/types";
import { extensionOf, withExtension } from "@/lib/utils/file-name";
import { cleanImage, inspectImage } from "@/services/image-api";
import { consumeQuota } from "@/services/usage-api";

function formatOf(file: File) {
  const format = detectFormat(file);
  if (!format) throw new UnreadableFileError("Unsupported file type.");
  return format;
}

async function runLocal<T>(format: FileFormat, task: (processor: FileProcessor) => Promise<T>) {
  const processor = await loadProcessor(format.engine as LocalEngine);
  try {
    return await task(processor);
  } catch (error) {
    if (error instanceof UnreadableFileError) throw error;
    console.error(error);
    throw new UnreadableFileError(`This ${fileKinds[format.kind].noun} couldn't be read. It may be damaged.`);
  }
}

export function isProcessedLocally(file: File) {
  return detectFormat(file)?.engine !== "image";
}

export async function inspectFile(file: File): Promise<MetadataReport> {
  const format = formatOf(file);
  if (format.engine === "image") return inspectImage(file);
  return runLocal(format, (processor) => processor.inspect(file, format));
}

export async function cleanFile(file: File): Promise<ProcessedFile> {
  const format = formatOf(file);
  if (format.engine === "image") return cleanImage(file);

  const { blob, leftoverTags } = await runLocal(format, async (processor) => {
    const cleaned = await processor.clean(file, format);
    const verification = await processor.inspect(cleaned, format);
    return { blob: cleaned, leftoverTags: verification.totalTags };
  });
  const quotaRemaining = await consumeQuota();
  const extension = extensionOf(file.name) || format.extensions[0];

  return { blob, name: withExtension(file.name, extension, "-clean"), leftoverTags, quotaRemaining };
}
