import type { OutputFormat } from "@/lib/image/formats";
import type { MetadataReport, ProcessedFile } from "@/lib/metadata/types";
import { apiRequest } from "@/services/api-client";

function post(path: string, file: File, fields: Record<string, string> = {}) {
  const body = new FormData();
  body.append("file", file);
  Object.entries(fields).forEach(([key, value]) => body.append(key, value));
  return apiRequest(path, { method: "POST", body });
}

function numberHeader(response: Response, name: string) {
  const value = response.headers.get(name);
  return value === null ? null : Number(value);
}

async function toProcessedFile(response: Response, fallbackName: string): Promise<ProcessedFile> {
  const encodedName = response.headers.get("X-File-Name");
  return {
    blob: await response.blob(),
    name: encodedName ? decodeURIComponent(encodedName) : fallbackName,
    leftoverTags: numberHeader(response, "X-Leftover-Tags"),
    quotaRemaining: numberHeader(response, "X-Quota-Remaining"),
  };
}

export async function inspectImage(file: File): Promise<MetadataReport> {
  const response = await post("/api/images/inspect", file);
  return response.json();
}

export async function cleanImage(file: File) {
  return toProcessedFile(await post("/api/images/clean", file), file.name);
}

export async function convertImage(file: File, format: OutputFormat, quality: number) {
  const response = await post("/api/images/convert", file, {
    format,
    quality: String(quality),
  });
  return toProcessedFile(response, file.name);
}
