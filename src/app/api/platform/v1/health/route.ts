import { PLATFORM_AUDIENCE } from "@/lib/platform/auth";
import { platformRoute } from "@/lib/platform/route";
import { databaseHealth } from "@/services/platform/metrics";

export const GET = platformRoute(["products:read"], async () => {
  const checks = [await databaseHealth()];
  return { ok: checks.every((check) => check.ok), product: PLATFORM_AUDIENCE, time: new Date().toISOString(), checks };
});