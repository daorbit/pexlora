import { z } from "zod";
import { nameSchema, passwordSchema } from "@/lib/validations/auth";

const passwordsMatch = {
  check: (data: { newPassword: string; confirmPassword: string }) => data.newPassword === data.confirmPassword,
  issue: { message: "Passwords don't match", path: ["confirmPassword"] },
};

export const profileSchema = z.object({ name: nameSchema });

export const setPasswordSchema = z
  .object({ newPassword: passwordSchema, confirmPassword: z.string() })
  .refine(passwordsMatch.check, passwordsMatch.issue);

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(passwordsMatch.check, passwordsMatch.issue);

export type ProfileField = "name";
export type PasswordField = "currentPassword" | "newPassword" | "confirmPassword";

export type AccountFormState<Field extends string> =
  | {
      status: "success" | "error";
      message?: string;
      errors?: Partial<Record<Field, string[]>>;
    }
  | undefined;
