import { isPlanId, type PlanId, type PlanTier } from "@/config/plans";

export type PlanSource = {
  plan?: { tier?: string | null; id?: string | null; expiresAt?: Date | string | null } | null;
};

export type ActivePlan = { tier: PlanTier; id: PlanId; expiresAt: string | null };

export function activePlan({ plan }: PlanSource, now = Date.now()): ActivePlan | null {
  if (plan?.tier !== "pro") return null;
  if (!plan.expiresAt) return { tier: "pro", id: "pro-lifetime", expiresAt: null };
  const expiresAt = new Date(plan.expiresAt);
  if (expiresAt.getTime() <= now) return null;
  return { tier: "pro", id: isPlanId(plan.id) ? plan.id : "pro-365", expiresAt: expiresAt.toISOString() };
}
