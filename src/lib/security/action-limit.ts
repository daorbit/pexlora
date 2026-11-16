import "server-only";
import type { RateLimitScope } from "@/config/security";
import { securityCopy } from "@/content/security";
import { requestClientId } from "@/lib/security/client";
import { hitRateLimit } from "@/services/rate-limit.service";

export async function actionRateLimit(scope: RateLimitScope, identifier?: string) {
  const result = await hitRateLimit(scope, identifier ?? (await requestClientId()));
  return result.ok ? null : securityCopy.tooManyAttempts(result.retryAfterSeconds);
}
