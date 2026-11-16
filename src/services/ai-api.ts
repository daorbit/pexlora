import type {
  AiResponse,
  AiTextReport,
  ImageInsights,
  MetadataExplanation,
} from "@/lib/ai/types";
import type { MetadataReport, ProcessedFile } from "@/lib/metadata/types";
import { extensionOf } from "@/lib/utils/file-name";
import { apiRequest } from "@/services/api-client";

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await apiRequest(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
}

export async function fetchImageInsights(file: File): Promise<AiResponse<ImageInsights>> {
  const body = new FormData();
  body.append("file", file);
  const response = await apiRequest("/api/ai/image-insights", { method: "POST", body });
  return response.json();
}

export async function generateAltText(file: File): Promise<ProcessedFile> {
  const { quotaRemaining, ...insights } = await fetchImageInsights(file);
  const extension = extensionOf(file.name);
  const name = extension ? `${insights.fileName}.${extension}` : insights.fileName;
  return {
    blob: new File([file], name, { type: file.type }),
    name,
    leftoverTags: null,
    quotaRemaining,
    insights,
  };
}

export function explainReport(report: MetadataReport) {
  return postJson<AiResponse<MetadataExplanation>>("/api/ai/explain-metadata", { report });
}

export function detectAiText(text: string) {
  return postJson<AiResponse<AiTextReport>>("/api/ai/detect-text", { text });
}

