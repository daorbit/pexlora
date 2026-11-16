import "server-only";
import { createHash } from "node:crypto";
import { DAILY_LIMITS } from "@/config/limits";
import { ApiError } from "@/lib/api/errors";
import { getSession } from "@/lib/auth/session";
import { env } from "@/lib/env";
import { incrementUsage, usageKeys } from "@/services/usage.service";

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function hashIp(ip: string) {
  return createHash("sha256").update(`${ip}:${env.sessionSecret}`).digest("hex");
}

export async function consumeFileQuota(request: Request) {
  const session = await getSession();
  const key = session ? usageKeys.user(session.userId) : usageKeys.ip(hashIp(clientIp(request)));
  const limit = session ? DAILY_LIMITS.user : DAILY_LIMITS.anonymous;

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
        ? `You've reached today's limit of ${limit} files. It resets at midnight UTC.`
        : `You've used your ${limit} free files for today. Create a free account to process up to ${DAILY_LIMITS.user} a day.`,
      429,
      { upsell: !session },
    );
  }

  return limit - used;
}
