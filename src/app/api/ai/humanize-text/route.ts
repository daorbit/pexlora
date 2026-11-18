import { withApiErrors } from "@/lib/api/errors";
import { readJsonBody } from "@/lib/api/json-body";
import { consumeAiQuota } from "@/lib/api/quota";
import { humanizeText } from "@/lib/ai/features/humanize-text";
import { humanizeSchema } from "@/lib/validations/ai";

export const POST = withApiErrors(async (request) => {
  const { text, tone, strength } = await readJsonBody(request, humanizeSchema);
  const quotaRemaining = await consumeAiQuota(request);
  return Response.json({ ...(await humanizeText(text, tone, strength)), quotaRemaining });
});
