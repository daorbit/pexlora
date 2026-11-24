import { detectFormat } from "@/lib/files/detect";
import { previewKind } from "@/lib/files/preview-kind";
import type { ZipEntry } from "@/lib/files/zip/read-zip";
import { matchesQuery } from "@/lib/utils/match-query";

const SCRIPTABLE_FILE = /\.svgz?$/i;
const OPENING_PREVIEWS = ["image", "pdf", "text"];

export function entryFileName(path: string) {
  return path.split("/").pop() || path;
}

export function entryFolder(path: string) {
  return path.slice(0, Math.max(0, path.lastIndexOf("/")));
}

export function searchEntries(entries: ZipEntry[], query: string) {
  return entries.filter((entry) => matchesQuery(query, [entry.name]));
}

export function savableEntries(entries: ZipEntry[]) {
  return entries.map((entry) => ({ blob: entry.blob, name: entryFileName(entry.name) }));
}

function safePreviewKind({ name, blob }: ZipEntry) {
  if (SCRIPTABLE_FILE.test(name)) return null;
  const kind = previewKind(blob, name);
  return kind === "zip" ? null : kind;
}

export function safePreviewBlob(entry: ZipEntry) {
  const kind = safePreviewKind(entry);
  if (!kind) return null;
  return kind === "text" ? new Blob([entry.blob], { type: "text/plain;charset=utf-8" }) : entry.blob;
}

export function firstPreviewable(entries: ZipEntry[]) {
  return entries.find((entry) => OPENING_PREVIEWS.includes(safePreviewKind(entry) ?? "")) ?? null;
}

export function formatOfName(name: string) {
  return detectFormat({ name, type: "" });
}
