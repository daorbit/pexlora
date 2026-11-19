import { urlImport } from "@/config/import-sources";
import { urlImportCopy } from "@/content/import-sources";

export type UrlImportReason = "invalid" | "blocked" | "notFile" | "tooLarge" | "failed";

const messages: Record<UrlImportReason, string> = {
  invalid: urlImportCopy.invalid,
  blocked: urlImportCopy.blocked,
  notFile: urlImportCopy.notFile,
  tooLarge: urlImportCopy.tooLarge(urlImport.maxServerMb),
  failed: urlImportCopy.failed,
};

export class UrlImportError extends Error {
  constructor(
    public reason: UrlImportReason,
    message = messages[reason],
  ) {
    super(message);
  }
}

export function parseHttpUrl(raw: string) {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    throw new UrlImportError("invalid");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new UrlImportError("invalid");
  return url;
}
