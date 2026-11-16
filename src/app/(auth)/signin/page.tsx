import type { Metadata } from "next";
import { signIn } from "@/actions/auth";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthForm } from "@/components/auth/AuthForm";
import { signInFields } from "@/components/auth/fields";
import { SocialAuth } from "@/components/auth/SocialAuth";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <AuthCard mode="signin" title="Sign in to Pexlora" description="Welcome back. Your daily limit is waiting.">
      <SocialAuth googleLabel="Continue with Google" />
      <AuthForm action={signIn} fields={signInFields} submitLabel="Continue" />
    </AuthCard>
  );
}
