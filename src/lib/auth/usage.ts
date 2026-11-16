import "server-only";
import { DAILY_LIMITS } from "@/config/limits";
import { getUsageToday, usageKeys } from "@/services/usage.service";

export type UsageSummary = {
  used: number;
  limit: number;
  remaining: number;
};

export async function getUserUsage(userId: string): Promise<UsageSummary> {
  const limit = DAILY_LIMITS.user;
  const used = await getUsageToday(usageKeys.user(userId)).catch(() => 0);
  return { used, limit, remaining: Math.max(0, limit - used) };
}
