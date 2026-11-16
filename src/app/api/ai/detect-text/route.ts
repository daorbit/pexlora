import { withApiErrors } from "@/lib/api/errors";
import { readJsonBody } from "@/lib/api/json-body";
import { consumeAiQuota } from "@/lib/api/quota";
import { detectAiText } from "@/lib/ai/features/detect-text";
import { aiTextSchema } from "@/lib/validations/ai";

export const POST = withApiErrors(async (request) => {
  const { text } = await readJsonBody(request, aiTextSchema);
  const quotaRemaining = await consumeAiQuota(request);
  return Response.json({ ...(await detectAiText(text)), quotaRemaining });
});
