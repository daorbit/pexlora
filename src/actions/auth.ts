"use server";

import { redirect } from "next/navigation";
import { after } from "next/server";
import { z } from "zod";
import { routes } from "@/config/site";
import { accountCopy } from "@/content/account";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { NEXT_PARAM, safeNextPath } from "@/lib/url/next-path";
import { createSession, deleteSession } from "@/lib/auth/session";
import {
  signInSchema,
  signUpSchema,
  type AuthFormState,
} from "@/lib/validations/auth";
import {
  createUser,
  emailExists,
  findUserByEmailWithPassword,
} from "@/services/user.service";
import { sendWelcomeEmail } from "@/services/mail.service";

const UNAVAILABLE_MESSAGE = accountCopy.unavailable;

function destination(formData: FormData) {
  return safeNextPath(formData.get(NEXT_PARAM)) ?? routes.dashboard;
}

function readForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
}

export async function signUp(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const input = readForm(formData);
  const values = { name: input.name, email: input.email };
  const parsed = signUpSchema.safeParse(input);

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  try {
    if (await emailExists(parsed.data.email)) {
      return {
        errors: { email: ["An account with this email already exists"] },
        values,
      };
    }

    const user = await createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password),
    });
    await createSession(user._id.toString());
    after(() => sendWelcomeEmail({ name: user.name, email: user.email }));
  } catch (error) {
    console.error("signUp failed", error);
    return { message: UNAVAILABLE_MESSAGE, values };
  }

  redirect(destination(formData));
}

export async function signIn(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const input = readForm(formData);
  const values = { email: input.email };
  const parsed = signInSchema.safeParse(input);

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  try {
    const user = await findUserByEmailWithPassword(parsed.data.email);

    if (user && !user.passwordHash) {
      return { message: "This account uses Google. Continue with Google to sign in.", values };
    }

    const valid =
      user?.passwordHash && (await verifyPassword(parsed.data.password, user.passwordHash));

    if (!user || !valid) {
      return { message: "Invalid email or password", values };
    }

    await createSession(user._id.toString());
  } catch (error) {
    console.error("signIn failed", error);
    return { message: UNAVAILABLE_MESSAGE, values };
  }

  redirect(destination(formData));
}

export async function signOut() {
  await deleteSession();
  redirect(routes.home);
}
