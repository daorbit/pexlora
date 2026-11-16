"use server";

import { redirect } from "next/navigation";
import { after } from "next/server";
import { z } from "zod";
import { SIGNUP_CODE } from "@/config/security";
import { routes } from "@/config/site";
import { accountCopy } from "@/content/account";
import { authCopy } from "@/content/auth";
import { createSession } from "@/lib/auth/session";
import { clearSignupTicket, readSignupTicket } from "@/lib/auth/signup-ticket";
import { actionRateLimit } from "@/lib/security/action-limit";
import { hashIdentifier } from "@/lib/security/client";
import { verifyCodeSchema, type AuthFormState } from "@/lib/validations/auth";
import { sendAccountExistsEmail, sendVerificationCodeEmail, sendWelcomeEmail } from "@/services/mail.service";
import { hitRateLimit } from "@/services/rate-limit.service";
import { resendSignupCode, verifySignupCode } from "@/services/signup-verification.service";
import { createUser, findUserByEmailWithPassword } from "@/services/user.service";

const copy = authCopy.verify;

export async function verifyEmail(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const limited = await actionRateLimit("verifyCodeIp");
  if (limited) return { message: limited };

  const ticket = await readSignupTicket();
  if (!ticket) return { message: copy.sessionExpired };

  const parsed = verifyCodeSchema.safeParse({ code: String(formData.get("code") ?? "") });
  if (!parsed.success) return { errors: z.flattenError(parsed.error).fieldErrors };

  try {
    const result = await verifySignupCode(ticket.email, parsed.data.code);
    if (result.status === "invalid") return { errors: { code: [copy.wrongCode(result.attemptsLeft)] } };
    if (result.status === "expired") return { message: copy.expired };

    if (await findUserByEmailWithPassword(result.signup.email)) return { message: copy.expired };

    const user = await createUser(result.signup);
    await clearSignupTicket();
    await createSession(user._id.toString(), 0);
    after(() => sendWelcomeEmail({ name: user.name, email: user.email }));
  } catch (error) {
    console.error("verifyEmail failed", error);
    return { message: accountCopy.unavailable };
  }

  redirect(ticket.next ?? routes.dashboard);
}

export async function resendVerificationCode(): Promise<AuthFormState> {
  const limited = await actionRateLimit("resendCodeIp");
  if (limited) return { message: limited };

  const ticket = await readSignupTicket();
  if (!ticket) return { message: copy.sessionExpired };

  try {
    const result = await resendSignupCode(ticket.email);
    if (result.status === "cooldown") return { message: copy.wait(result.retryAfterSeconds) };
    if (result.status === "limit") return { message: copy.sendLimit };

    if (result.status === "sent") {
      await sendVerificationCodeEmail(ticket.email, result.code, SIGNUP_CODE.ttlMinutes);
    } else {
      const existing = await findUserByEmailWithPassword(ticket.email);
      const notice = existing ? await hitRateLimit("accountNotice", hashIdentifier(ticket.email)) : null;
      if (existing && notice?.ok) after(() => sendAccountExistsEmail(existing));
    }
  } catch (error) {
    console.error("resendVerificationCode failed", error);
    return { message: accountCopy.unavailable };
  }

  return { success: copy.resent };
}

export async function restartSignup() {
  await clearSignupTicket();
  redirect(routes.signUp);
}
