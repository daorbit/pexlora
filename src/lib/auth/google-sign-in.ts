import "server-only";
import { after } from "next/server";
import type { GoogleLinkResult } from "@/content/account";
import { createSession, getSession } from "@/lib/auth/session";
import { sendWelcomeEmail } from "@/services/mail.service";
import { findOrCreateGoogleUser, linkGoogleAccount, type GoogleProfile } from "@/services/user.service";

export async function signInWithGoogle(profile: GoogleProfile) {
  const { user, isNew } = await findOrCreateGoogleUser(profile);
  await createSession(user._id.toString());

  if (isNew) {
    after(() => sendWelcomeEmail({ name: user.name, email: user.email }));
  }
}

export async function linkGoogleToCurrentUser(profile: GoogleProfile): Promise<GoogleLinkResult> {
  const session = await getSession();
  if (!session) return "error";
  return (await linkGoogleAccount(session.userId, profile)) ? "linked" : "taken";
}
