"use server";

import { redirect } from "next/navigation";
import { after } from "next/server";
import { z } from "zod";
import { SIGNUP_CODE } from "@/config/security";
import { routes } from "@/config/site";
import { accountCopy } from "@/content/account";
import { authCopy } from "@/content/auth";
import { hashPassword, verifyPasswordSafely } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";
import { setSignupTicket } from "@/lib/auth/signup-ticket";
import { actionRateLimit } from "@/lib/security/action-limit";
import { hashIdentifier } from "@/lib/security/client";
import { setFlash } from "@/lib/toast/flash";
import { NEXT_PARAM, safeNextPath } from "@/lib/url/next-path";
import { signInSchema, signUpSchema, type AuthFormState } from "@/lib/validations/auth";
import { sendAccountExistsEmail, sendVerificationCodeEmail } from "@/services/mail.service";
import { hitRateLimit } from "@/services/rate-limit.service";
import { startSignup } from "@/services/signup-verification.service";
import { findUserByEmailWithPassword } from "@/services/user.service";

function readForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
}

export async function signUp(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const input = readForm(formData);
  const values = { name: input.name, email: input.email };

  const limited = await actionRateLimit("signUpIp");
  if (limited) return { message: limited, values };

  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) return { errors: z.flattenError(parsed.error).fieldErrors, values };

  const { name, email, password } = parsed.data;

  try {
    const [existing, passwordHash] = await Promise.all([findUserByEmailWithPassword(email), hashPassword(password)]);

    if (existing) {
      const notice = await hitRateLimit("accountNotice", hashIdentifier(email));
      if (notice.ok) after(() => sendAccountExistsEmail(existing));
    } else {
      const issued = await startSignup({ name, email, passwordHash });
      if (issued.status === "limit") return { message: authCopy.verify.sendLimit, values };
      if (issued.status === "sent") await sendVerificationCodeEmail(email, issued.code, SIGNUP_CODE.ttlMinutes);
    }

    await setSignupTicket({ email, next: safeNextPath(formData.get(NEXT_PARAM)) ?? undefined });
  } catch (error) {
    console.error("signUp failed", error);
    return { message: accountCopy.unavailable, values };
  }

  redirect(routes.verifyEmail);
}

export async function signIn(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const input = readForm(formData);
  const values = { email: input.email };

  const limited = await actionRateLimit("signInIp");
  if (limited) return { message: limited, values };

  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) return { errors: z.flattenError(parsed.error).fieldErrors, values };

  const accountLimited = await actionRateLimit("signInAccount", hashIdentifier(parsed.data.email));
  if (accountLimited) return { message: accountLimited, values };

  try {
    const user = await findUserByEmailWithPassword(parsed.data.email);
    const valid = await verifyPasswordSafely(parsed.data.password, user?.passwordHash);
    if (!user || !valid) return { message: authCopy.signin.invalid, values };

    await createSession(user._id.toString(), user.sessionVersion ?? 0);
    await setFlash("signed-in");
  } catch (error) {
    console.error("signIn failed", error);
    return { message: accountCopy.unavailable, values };
  }

  redirect(safeNextPath(formData.get(NEXT_PARAM)) ?? routes.dashboard);
}

export async function signOut() {
  await deleteSession();
  await setFlash("signed-out");
  redirect(routes.home);
}
