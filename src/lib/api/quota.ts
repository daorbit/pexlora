import "server-only";
import { AI_DAILY_LIMITS, DAILY_LIMITS } from "@/config/limits";
import type { RateLimitScope } from "@/config/security";
import { securityCopy } from "@/content/security";
import { ApiError } from "@/lib/api/errors";
import type { Upsell } from "@/lib/api/upsell";
import { activePlan } from "@/lib/auth/plan";
import { effectiveLimits } from "@/lib/auth/roles";
import { getSession } from "@/lib/auth/session";
import { clientId } from "@/lib/security/client";
import { hitRateLimit } from "@/services/rate-limit.service";
import { incrementUsage, usageKeys } from "@/services/usage.service";
import { findUserLimits } from "@/services/user.service";

type QuotaKind = "files" | "ai";

type QuotaConfig = { limits: { anonymous: number; user: number }; noun: string; prefix: string; burst: RateLimitScope };

const quotas: Record<QuotaKind, QuotaConfig> = {
  files: { limits: DAILY_LIMITS, noun: "files", prefix: "", burst: "imageApi" },
  ai: { limits: AI_DAILY_LIMITS, noun: "AI requests", prefix: "ai:", burst: "aiApi" },
};

export async function assertApiRateLimit(request: Request, scope: RateLimitScope, identity?: string) {
  const result = await hitRateLimit(scope, identity ?? clientId(request.headers));
  if (!result.ok) throw new ApiError(securityCopy.tooManyRequests(result.retryAfterSeconds), 429);
}

async function userLimit(userId: string, kind: QuotaKind) {
  const user = await findUserLimits(userId).catch(() => null);
  if (!user) return { limit: quotas[kind].limits.user, pro: false };
  return { limit: effectiveLimits(user)[kind], pro: Boolean(activePlan(user)) };
}

const anonymousLimit = (kind: QuotaKind) => ({ limit: quotas[kind].limits.anonymous, pro: false });

function quotaUpsell(signedIn: boolean, pro: boolean): Upsell {
  if (!signedIn) return "account";
  return pro ? null : "pro";
}

async function consumeQuota(request: Request, kind: QuotaKind) {
  const { limits, noun, prefix, burst } = quotas[kind];
  const session = await getSession();
  const identity = session ? usageKeys.user(session.userId) : usageKeys.ip(clientId(request.headers));
  const key = prefix + identity;

  const burstCheck = assertApiRateLimit(request, burst, identity);

  let used: number;
  let allowance: { limit: number; pro: boolean };
  try {
    [used, allowance] = await Promise.all([
      incrementUsage(key),
      session ? userLimit(session.userId, kind) : anonymousLimit(kind),
    ]);
  } catch (error) {
    console.warn("Usage tracking unavailable, skipping quota check", error);
    await burstCheck;
    return null;
  }
  await burstCheck;

  const { limit, pro } = allowance;
  if (used > limit) {
    throw new ApiError(
      session
        ? `You've reached today's limit of ${limit} ${noun}. It resets at midnight UTC.`
        : `You've used your ${limit} free ${noun} for today. Create a free account to get up to ${limits.user} a day.`,
      429,
      { upsell: quotaUpsell(Boolean(session), pro) },
    );
  }

  return limit - used;
}

export function consumeFileQuota(request: Request) {
  return consumeQuota(request, "files");
}

export function consumeAiQuota(request: Request) {
  return consumeQuota(request, "ai");
}

async function withQuota<T>(request: Request, kind: QuotaKind, task: () => Promise<T>) {
  const [quotaRemaining, result] = await Promise.all([consumeQuota(request, kind), task()]);
  return { quotaRemaining, result };
}

export function withFileQuota<T>(request: Request, task: () => Promise<T>) {
  return withQuota(request, "files", task);
}

export function withAiQuota<T>(request: Request, task: () => Promise<T>) {
  return withQuota(request, "ai", task);
}
