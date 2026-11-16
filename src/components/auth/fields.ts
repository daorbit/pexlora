import type { AuthField } from "@/components/auth/AuthForm";

const emailField: AuthField = {
  name: "email",
  label: "Email",
  type: "email",
  autoComplete: "email",
};

export const signInFields: AuthField[] = [
  emailField,
  { name: "password", label: "Password", type: "password", autoComplete: "current-password" },
];

export const signUpFields: AuthField[] = [
  { name: "name", label: "Full name", type: "text", autoComplete: "name" },
  emailField,
  { name: "password", label: "Password (8+ characters)", type: "password", autoComplete: "new-password" },
];
