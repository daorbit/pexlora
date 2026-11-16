import { z } from "zod";

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(80, "Name must be 80 characters or fewer");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-zA-Z]/, "Password must contain a letter")
  .regex(/[0-9]/, "Password must contain a number");

export const signInSchema = z.object({
  email: z.email("Enter a valid email address").trim(),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z.object({
  name: nameSchema,
  email: z.email("Enter a valid email address").trim(),
  password: passwordSchema,
});

export type AuthFormState =
  | {
      message?: string;
      errors?: Partial<Record<"name" | "email" | "password", string[]>>;
      values?: { name?: string; email?: string };
    }
  | undefined;
