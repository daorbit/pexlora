import "server-only";
import { RATE_LIMITS, type RateLimitScope } from "@/config/security";
import { connectToDatabase } from "@/lib/db/mongoose";
import { RateLimit } from "@/models/RateLimit";

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSeconds: number };

export async function hitRateLimit(scope: RateLimitScope, identifier: string): Promise<RateLimitResult> {
  const { limit, windowSeconds } = RATE_LIMITS[scope];
  const windowMs = windowSeconds * 1000;
  const window = Math.floor(Date.now() / windowMs);
  const resetsAt = (window + 1) * windowMs;

  try {
    await connectToDatabase();
    const entry = await RateLimit.findOneAndUpdate(
      { key: `${scope}:${identifier}:${window}` },
      { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(resetsAt) } },
      { upsert: true, returnDocument: "after" },
    ).lean();

    if ((entry?.count ?? 0) > limit) {
      return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((resetsAt - Date.now()) / 1000)) };
    }
  } catch (error) {
    console.warn("Rate limiting unavailable, allowing request", error);
  }
  return { ok: true };
}
