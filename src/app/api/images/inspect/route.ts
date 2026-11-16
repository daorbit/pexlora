import { withApiErrors } from "@/lib/api/errors";
import { readImageUpload } from "@/lib/api/upload";
import { inspectImage } from "@/lib/image/metadata";

export const POST = withApiErrors(async (request) => {
  const { buffer } = await readImageUpload(request);
  const report = await inspectImage(buffer);
  return Response.json(report, { headers: { "Cache-Control": "no-store" } });
});
