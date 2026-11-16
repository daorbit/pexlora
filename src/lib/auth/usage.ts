import "server-only";
import type { CurrentUser } from "@/lib/auth/dal";
import { getUsageToday, usageKeys } from "@/services/usage.service";

export type UsageSummary = {
  used: number;
  limit: number;
  remaining: number;
};

export async function getUserUsage(user: Pick<CurrentUser, "id" | "limits">): Promise<UsageSummary> {
  const limit = user.limits.files;
  const used = await getUsageToday(usageKeys.user(user.id)).catch(() => 0);
  return { used, limit, remaining: Math.max(0, limit - used) };
}
