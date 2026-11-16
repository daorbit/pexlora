import { withApiErrors } from "@/lib/api/errors";
import { consumeAiQuota } from "@/lib/api/quota";
import { readImageUpload } from "@/lib/api/upload";
import { imageInsights } from "@/lib/ai/features/image-insights";

export const POST = withApiErrors(async (request) => {
  const { buffer } = await readImageUpload(request);
  const quotaRemaining = await consumeAiQuota(request);
  return Response.json({ ...(await imageInsights(buffer)), quotaRemaining });
});
