import "server-only";
import { createHash } from "node:crypto";
import { AI_DAILY_LIMITS, DAILY_LIMITS } from "@/config/limits";
import { ApiError } from "@/lib/api/errors";
import { getSession } from "@/lib/auth/session";
import { env } from "@/lib/env";
import { incrementUsage, usageKeys } from "@/services/usage.service";

type QuotaKind = "files" | "ai";

const quotas: Record<QuotaKind, { limits: { anonymous: number; user: number }; noun: string; prefix: string }> = {
  files: { limits: DAILY_LIMITS, noun: "files", prefix: "" },
  ai: { limits: AI_DAILY_LIMITS, noun: "AI requests", prefix: "ai:" },
};

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function hashIp(ip: string) {
  return createHash("sha256").update(`${ip}:${env.sessionSecret}`).digest("hex");
}

async function consumeQuota(request: Request, kind: QuotaKind) {
  const { limits, noun, prefix } = quotas[kind];
  const session = await getSession();
  const key = prefix + (session ? usageKeys.user(session.userId) : usageKeys.ip(hashIp(clientIp(request))));
  const limit = session ? limits.user : limits.anonymous;

  let used: number;
  try {
    used = await incrementUsage(key);
  } catch (error) {
    console.warn("Usage tracking unavailable, skipping quota check", error);
    return null;
  }

  if (used > limit) {
    throw new ApiError(
      session
        ? `You've reached today's limit of ${limit} ${noun}. It resets at midnight UTC.`
        : `You've used your ${limit} free ${noun} for today. Create a free account to get up to ${limits.user} a day.`,
      429,
      { upsell: !session },
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
