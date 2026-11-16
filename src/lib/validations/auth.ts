import { z } from "zod";
import { SIGNUP_CODE } from "@/config/security";

const MAX_EMAIL_LENGTH = 254;
const MAX_PASSWORD_LENGTH = 128;

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(80, "Name must be 80 characters or fewer");

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(MAX_EMAIL_LENGTH, "Enter a valid email address")
  .pipe(z.email("Enter a valid email address"));

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(MAX_PASSWORD_LENGTH, `Password must be ${MAX_PASSWORD_LENGTH} characters or fewer`)
  .regex(/[a-zA-Z]/, "Password must contain a letter")
  .regex(/[0-9]/, "Password must contain a number");

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required").max(MAX_PASSWORD_LENGTH, "Invalid email or password"),
});

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  token: z.string().min(20, "This reset link is invalid").max(200, "This reset link is invalid"),
  password: passwordSchema,
});

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .regex(new RegExp(`^\\d{${SIGNUP_CODE.length}}$`), `Enter the ${SIGNUP_CODE.length}-digit code from the email`),
});

export type AuthFieldName = "name" | "email" | "password" | "code";

export type AuthFormState =
  | {
      message?: string;
      success?: string;
      errors?: Partial<Record<AuthFieldName, string[]>>;
      values?: { name?: string; email?: string };
    }
  | undefined;
