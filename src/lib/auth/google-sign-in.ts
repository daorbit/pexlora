import "server-only";
import { after } from "next/server";
import { createSession } from "@/lib/auth/session";
import { sendWelcomeEmail } from "@/services/mail.service";
import { findOrCreateGoogleUser, type GoogleProfile } from "@/services/user.service";

export async function signInWithGoogle(profile: GoogleProfile) {
  const { user, isNew } = await findOrCreateGoogleUser(profile);
  await createSession(user._id.toString());

  if (isNew) {
    after(() => sendWelcomeEmail({ name: user.name, email: user.email }));
  }
}
