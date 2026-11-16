import type { PlanTier } from "@/config/plans";

export type PlanSource = { plan?: { tier?: string | null; expiresAt?: Date | string | null } | null };

export type ActivePlan = { tier: PlanTier; expiresAt: string | null };

export function activePlan({ plan }: PlanSource, now = Date.now()): ActivePlan | null {
  if (plan?.tier !== "pro") return null;
  if (!plan.expiresAt) return { tier: "pro", expiresAt: null };
  const expiresAt = new Date(plan.expiresAt);
  return expiresAt.getTime() > now ? { tier: "pro", expiresAt: expiresAt.toISOString() } : null;
}
