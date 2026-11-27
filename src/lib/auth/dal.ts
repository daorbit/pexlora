import "server-only";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import type { UserRole } from "@/config/roles";
import { routes } from "@/config/site";
import { effectiveLimits, effectiveRole, type UserLimits } from "@/lib/auth/roles";
import { activePlan, type ActivePlan } from "@/lib/auth/plan";
import { getSession } from "@/lib/auth/session";
import { findSessionUser } from "@/services/user.service";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  hasGoogle: boolean;
  hasPassword: boolean;
  memberSince: string;
  role: UserRole;
  limits: UserLimits;
  plan: ActivePlan | null;
};

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await getSession();
  if (!session) return null;

  const user = await findSessionUser(session.userId);
  if (!user || user.status === "suspended" || (user.sessionVersion ?? 0) !== (session.version ?? 0)) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl ?? undefined,
    hasGoogle: Boolean(user.googleId),
    hasPassword: Boolean(user.passwordHash),
    memberSince: new Date(user.createdAt).toISOString(),
    role: effectiveRole(user),
    limits: effectiveLimits(user),
    plan: activePlan(user),
  };
});

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (user) return user;
  redirect((await getSession()) ? routes.sessionExpired : routes.signIn);
}

export async function getSuperAdmin() {
  const user = await getCurrentUser();
  return user?.role === "super_admin" ? user : null;
}

export async function requireSuperAdmin(): Promise<CurrentUser> {
  const user = await requireUser();
  if (user.role !== "super_admin") notFound();
  return user;
}
