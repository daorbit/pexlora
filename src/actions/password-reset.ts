"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { routes } from "@/config/site";
import { accountCopy } from "@/content/account";
import { authCopy } from "@/content/auth";
import { env } from "@/lib/env";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { forgotPasswordSchema, resetPasswordSchema, type AuthFormState } from "@/lib/validations/auth";
import { sendPasswordResetEmail } from "@/services/mail.service";
import {
  consumePasswordResetToken,
  createPasswordResetToken,
  RESET_TOKEN_TTL_MINUTES,
} from "@/services/password-reset.service";
import { findUserByEmailWithPassword, updateUserPassword } from "@/services/user.service";

export async function requestPasswordReset(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "");
  const parsed = forgotPasswordSchema.safeParse({ email });

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values: { email } };
  }

  try {
    const user = await findUserByEmailWithPassword(parsed.data.email);
    if (user?.passwordHash) {
      const token = await createPasswordResetToken(user._id.toString());
      if (token) {
        const resetUrl = `${env.appUrl}${routes.resetPassword}?token=${encodeURIComponent(token)}`;
        await sendPasswordResetEmail(user, resetUrl, RESET_TOKEN_TTL_MINUTES).catch((error) =>
          console.error("Failed to send password reset email", error),
        );
      }
    }
  } catch (error) {
    console.error("requestPasswordReset failed", error);
    return { message: accountCopy.unavailable, values: { email } };
  }

  return { success: authCopy.forgot.sent };
}

export async function resetPassword(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = resetPasswordSchema.safeParse({
    token: String(formData.get("token") ?? ""),
    password: String(formData.get("password") ?? ""),
  });

  if (!parsed.success) {
    const { token, password } = z.flattenError(parsed.error).fieldErrors;
    return token ? { message: authCopy.reset.invalid } : { errors: { password } };
  }

  try {
    const userId = await consumePasswordResetToken(parsed.data.token);
    if (!userId) return { message: authCopy.reset.invalid };

    await updateUserPassword(userId, await hashPassword(parsed.data.password));
    await createSession(userId);
  } catch (error) {
    console.error("resetPassword failed", error);
    return { message: accountCopy.unavailable };
  }

  redirect(routes.dashboard);
}
