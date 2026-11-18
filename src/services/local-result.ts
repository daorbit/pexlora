import type { NamedBlob } from "@/lib/files/pdf/pdf-tools";
import { UnreadableFileError } from "@/lib/files/processors/types";
import type { ProcessedFile } from "@/lib/metadata/types";
import { withExtension } from "@/lib/utils/file-name";
import { consumeQuota } from "@/services/usage-api";

export async function guard<T>(task: () => Promise<T>) {
  try {
    return await task();
  } catch (error) {
    if (error instanceof UnreadableFileError) throw error;
    console.error(error);
    throw new UnreadableFileError("This file couldn't be processed. It may be damaged.");
  }
}

export async function finish(blob: Blob, name: string, extra: Partial<ProcessedFile> = {}): Promise<ProcessedFile> {
  return { blob, name, leftoverTags: null, ...extra, quotaRemaining: await consumeQuota() };
}

export async function bundle(parts: NamedBlob[], source: File, suffix: string) {
  if (parts.length === 1) return finish(parts[0].blob, parts[0].name);
  const { createZip } = await import("@/lib/utils/download");
  return finish(await createZip(parts), withExtension(source.name, "zip", suffix));
}
