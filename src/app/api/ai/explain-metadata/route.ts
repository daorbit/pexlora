import { withApiErrors } from "@/lib/api/errors";
import { readJsonBody } from "@/lib/api/json-body";
import { consumeAiQuota } from "@/lib/api/quota";
import { explainMetadata } from "@/lib/ai/features/explain-metadata";
import type { MetadataReport } from "@/lib/metadata/types";
import { metadataReportSchema } from "@/lib/validations/ai";

export const POST = withApiErrors(async (request) => {
  const { report } = await readJsonBody(request, metadataReportSchema);
  const quotaRemaining = await consumeAiQuota(request);
  return Response.json({ ...(await explainMetadata(report as MetadataReport)), quotaRemaining });
});
