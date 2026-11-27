import { platformRoute } from "@/lib/platform/route";
import { platformMetrics } from "@/services/platform/metrics";
import { readRange } from "@/services/platform/present";

export const GET = platformRoute(["overview:read"], async ({ url }) => {
  const { from, to } = readRange(url);
  return platformMetrics(from, to);
});