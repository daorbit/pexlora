import { SIGNUP_CODE } from "@/config/security";
import { authCopy } from "@/content/auth";
import type { AuthField } from "@/components/auth/AuthForm";

const emailField: AuthField = {
  name: "email",
  label: "Email",
  type: "email",
  autoComplete: "email",
  placeholder: "you@example.com",
};

export const signInFields: AuthField[] = [
  emailField,
  { name: "password", label: "Password", type: "password", autoComplete: "current-password", placeholder: "Your password" },
];

export const signUpFields: AuthField[] = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", placeholder: "Your name" },
  emailField,
  {
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "new-password",
    placeholder: "At least 8 characters",
  },
];

export const forgotPasswordFields: AuthField[] = [emailField];

export const resetPasswordFields: AuthField[] = [
  {
    name: "password",
    label: "New password",
    type: "password",
    autoComplete: "new-password",
    placeholder: "At least 8 characters",
  },
];

export const verifyCodeFields: AuthField[] = [
  {
    name: "code",
    label: authCopy.verify.codeLabel,
    type: "text",
    autoComplete: "one-time-code",
    inputMode: "numeric",
    maxLength: SIGNUP_CODE.length,
    placeholder: "0".repeat(SIGNUP_CODE.length),
    className: "font-mono text-[22px] tracking-[0.5em] placeholder:tracking-[0.5em]",
  },
];
