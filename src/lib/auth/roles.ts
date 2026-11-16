import { AI_DAILY_LIMITS, DAILY_LIMITS } from "@/config/limits";
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

export function effectiveLimits(user: LimitSource): UserLimits {
  const custom = customLimits(user);
  return { files: custom.files ?? DAILY_LIMITS.user, ai: custom.ai ?? AI_DAILY_LIMITS.user };
}
