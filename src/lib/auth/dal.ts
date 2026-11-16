import "server-only";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import type { UserRole } from "@/config/roles";
import { routes } from "@/config/site";
import { effectiveLimits, effectiveRole, type UserLimits } from "@/lib/auth/roles";
import { getSession } from "@/lib/auth/session";
import { findUserByIdWithPassword } from "@/services/user.service";

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
};

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await getSession();
  if (!session) return null;

  const user = await findUserByIdWithPassword(session.userId);
  if (!user) return null;

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
  };
});

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect(routes.signIn);
  return user;
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
