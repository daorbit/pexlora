import { AI_DAILY_LIMITS, DAILY_LIMITS } from "@/config/limits";
import { PRO_LIMITS } from "@/config/plans";
import { activePlan, type PlanSource } from "@/lib/auth/plan";
import { isUserRole, OWNER_EMAILS, type UserRole } from "@/config/roles";

type RoleSource = { email: string; role?: string | null };
type LimitSource = { limits?: { files?: number | null; ai?: number | null } | null };

export type UserLimits = { files: number; ai: number };
export type CustomLimits = { files: number | null; ai: number | null };

export function isOwner(email: string) {
  return OWNER_EMAILS.includes(email.toLowerCase());
}

export function effectiveRole({ email, role }: RoleSource): UserRole {
  if (isOwner(email)) return "super_admin";
  return isUserRole(role) ? role : "user";
}

export function isSuperAdmin(user: RoleSource) {
  return effectiveRole(user) === "super_admin";
}

export function customLimits({ limits }: LimitSource): CustomLimits {
  return { files: limits?.files ?? null, ai: limits?.ai ?? null };
}

export function effectiveLimits(user: LimitSource & PlanSource): UserLimits {
  const custom = customLimits(user);
  const base = activePlan(user) ? PRO_LIMITS : { files: DAILY_LIMITS.user, ai: AI_DAILY_LIMITS.user };
  return { files: custom.files ?? base.files, ai: custom.ai ?? base.ai };
}
