import type { Metadata } from "next";
import { signUp } from "@/actions/auth";
import { authCopy } from "@/content/auth";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthForm } from "@/components/auth/AuthForm";
import { signUpFields } from "@/components/auth/fields";
import { SocialAuth } from "@/components/auth/SocialAuth";

export const metadata: Metadata = { title: "Create account" };

export default function SignUpPage() {
  const copy = authCopy.signup;

  return (
    <AuthCard tabs="signup" title={copy.title} description={copy.description}>
      <SocialAuth googleLabel={copy.google} />
      <AuthForm action={signUp} fields={signUpFields} submitLabel={copy.submit} />
    </AuthCard>
  );
}
