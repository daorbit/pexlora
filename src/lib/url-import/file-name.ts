import { fileFormats } from "@/config/file-formats";

const UNSAFE_NAME = /[\\/:*?"<>|]+/g;
const CONTROL_CHARS = /\p{Cc}/gu;
const HAS_EXTENSION = /\.[a-z0-9]{2,5}$/i;
const MAX_NAME_LENGTH = 150;
const FALLBACK_NAME = "download";

function decode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function fromDisposition(header: string | null) {
  if (!header) return "";
  const encoded = header.match(/filename\*\s*=\s*(?:UTF-8'')?([^;]+)/i)?.[1];
  const plain = header.match(/filename\s*=\s*"?([^";]+)"?/i)?.[1];
  return decode((encoded ?? plain ?? "").trim().replace(/^"|"$/g, ""));
}

function fromPath(url: URL) {
  return decode(url.pathname.split("/").filter(Boolean).pop() ?? "");
}

export function mimeOf(header: string | null) {
  return (header ?? "").split(";")[0].trim().toLowerCase() || "application/octet-stream";
}

export function remoteFileName(url: URL, disposition: string | null, type: string) {
  const raw = fromDisposition(disposition) || fromPath(url);
  const name = raw.replace(CONTROL_CHARS, "").replace(UNSAFE_NAME, "").trim().slice(-MAX_NAME_LENGTH) || FALLBACK_NAME;
  if (HAS_EXTENSION.test(name)) return name;
  const extension = fileFormats.find((format) => format.mimeTypes.includes(type))?.extensions[0];
  return extension ? `${name}.${extension}` : name;
}
