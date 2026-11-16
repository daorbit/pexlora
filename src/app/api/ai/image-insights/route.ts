import { withApiErrors } from "@/lib/api/errors";
import { withAiQuota } from "@/lib/api/quota";
import { readImageUpload } from "@/lib/api/upload";
import { imageInsights, imagePreview } from "@/lib/ai/features/image-insights";

export const POST = withApiErrors(async (request) => {
  const { buffer } = await readImageUpload(request);
  const { quotaRemaining, result: preview } = await withAiQuota(request, () => imagePreview(buffer));
  return Response.json({ ...(await imageInsights(preview)), quotaRemaining });
});
