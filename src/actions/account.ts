"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import { accountCopy } from "@/content/account";
import { getCurrentUser } from "@/lib/auth/dal";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import {
  changePasswordSchema,
  profileSchema,
  setPasswordSchema,
  type AccountFormState,
  type PasswordField,
  type ProfileField,
} from "@/lib/validations/account";
import { findUserByIdWithPassword, updateUserName, updateUserPassword } from "@/services/user.service";

const failure = (message: string) => ({ status: "error" as const, message });

function readField(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

export async function updateProfile(
  _state: AccountFormState<ProfileField>,
  formData: FormData,
): Promise<AccountFormState<ProfileField>> {
  const user = await getCurrentUser();
  if (!user) return failure(accountCopy.signedOut);

  const parsed = profileSchema.safeParse({ name: readField(formData, "name") });
  if (!parsed.success) {
    return { status: "error", errors: z.flattenError(parsed.error).fieldErrors };
  }

  try {
    await updateUserName(user.id, parsed.data.name);
  } catch (error) {
    console.error("updateProfile failed", error);
    return failure(accountCopy.unavailable);
  }

  refresh();
  return { status: "success", message: accountCopy.profile.saved };
}

export async function updatePassword(
  _state: AccountFormState<PasswordField>,
  formData: FormData,
): Promise<AccountFormState<PasswordField>> {
  const user = await getCurrentUser();
  if (!user) return failure(accountCopy.signedOut);

  const input = {
    currentPassword: readField(formData, "currentPassword"),
    newPassword: readField(formData, "newPassword"),
    confirmPassword: readField(formData, "confirmPassword"),
  };

  try {
    const account = await findUserByIdWithPassword(user.id);
    if (!account) return failure(accountCopy.signedOut);

    const currentHash = account.passwordHash;
    const parsed = (currentHash ? changePasswordSchema : setPasswordSchema).safeParse(input);
    if (!parsed.success) {
      return { status: "error", errors: z.flattenError(parsed.error).fieldErrors };
    }

    if (currentHash) {
      if (!(await verifyPassword(input.currentPassword, currentHash))) {
        return { status: "error", errors: { currentPassword: [accountCopy.password.wrongCurrent] } };
      }
      if (input.currentPassword === input.newPassword) {
        return { status: "error", errors: { newPassword: [accountCopy.password.reused] } };
      }
    }

    await updateUserPassword(user.id, await hashPassword(parsed.data.newPassword));
    refresh();
    return {
      status: "success",
      message: currentHash ? accountCopy.password.changed : accountCopy.password.added,
    };
  } catch (error) {
    console.error("updatePassword failed", error);
    return failure(accountCopy.unavailable);
  }
}
