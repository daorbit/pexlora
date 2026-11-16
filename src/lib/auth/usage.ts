import "server-only";
import { cache } from "react";
import type { CurrentUser } from "@/lib/auth/dal";
import { aiUsageKey, getUsageTodayByKey, usageKeys } from "@/services/usage.service";

export type UsageSummary = {
  used: number;
  limit: number;
  remaining: number;
};

type UsageUser = Pick<CurrentUser, "id" | "limits">;

const summary = (used: number, limit: number): UsageSummary => ({ used, limit, remaining: Math.max(0, limit - used) });

const usageCountsToday = cache(async (userId: string) => {
  const filesKey = usageKeys.user(userId);
  const aiKey = aiUsageKey(filesKey);
  const counts = await getUsageTodayByKey([filesKey, aiKey]).catch(() => new Map<string, number>());
  return { files: counts.get(filesKey) ?? 0, ai: counts.get(aiKey) ?? 0 };
});

export async function getUserUsageAll(user: UsageUser): Promise<{ files: UsageSummary; ai: UsageSummary }> {
  const counts = await usageCountsToday(user.id);
  return { files: summary(counts.files, user.limits.files), ai: summary(counts.ai, user.limits.ai) };
}

export async function getUserUsage(user: UsageUser): Promise<UsageSummary> {
  return (await getUserUsageAll(user)).files;
}
