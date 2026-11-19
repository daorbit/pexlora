import { importCopy } from "@/content/import-sources";
import { toast } from "@/lib/toast/store";

export class ImportSkip extends Error {
  constructor(
    public fileName: string,
    public why: "unsupported" | "tooLarge",
    public limitMb = 0,
  ) {
    super(`${fileName}: ${why}`);
  }
}

export function acceptedMimeTypes(accept: string) {
  return accept.split(",").filter((part) => part.includes("/"));
}

export function acceptedExtensions(accept: string) {
  return accept.split(",").filter((part) => part.startsWith("."));
}

function reportSkip(skip: ImportSkip) {
  toast.error(skip.why === "tooLarge" ? importCopy.tooLarge(skip.fileName, skip.limitMb) : importCopy.unsupported(skip.fileName));
}

export async function collectFiles(tasks: Promise<File>[], onFiles: (files: File[]) => void, onError: (error: unknown) => void) {
  const results = await Promise.allSettled(tasks);
  const files = results.flatMap((result) => (result.status === "fulfilled" ? [result.value] : []));
  const failures = results.flatMap((result) => (result.status === "rejected" ? [result.reason as unknown] : []));

  failures.forEach((reason) => {
    if (reason instanceof ImportSkip) reportSkip(reason);
  });
  const other = failures.find((reason) => !(reason instanceof ImportSkip));
  if (other) onError(other);
  if (files.length) onFiles(files);
}
