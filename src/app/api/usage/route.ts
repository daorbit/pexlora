import { withApiErrors } from "@/lib/api/errors";
import { consumeFileQuota } from "@/lib/api/quota";

export const POST = withApiErrors(async (request) => {
  const quotaRemaining = await consumeFileQuota(request);
  return Response.json({ quotaRemaining }, { headers: { "Cache-Control": "no-store" } });
});
