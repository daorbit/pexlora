import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { routes } from "@/config/site";
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
  };
});

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect(routes.signIn);
  return user;
}
