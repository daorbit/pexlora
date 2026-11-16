import type { Metadata } from "next";
import { signUp } from "@/actions/auth";
import { DAILY_LIMITS } from "@/config/limits";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthForm } from "@/components/auth/AuthForm";
import { signUpFields } from "@/components/auth/fields";
import { SocialAuth } from "@/components/auth/SocialAuth";

export const metadata: Metadata = { title: "Create account" };

export default function SignUpPage() {
  return (
    <AuthCard
      mode="signup"
      title="Create your account"
      description={`Free forever. ${DAILY_LIMITS.user} files a day across every tool.`}
    >
      <SocialAuth googleLabel="Sign up with Google" />
      <AuthForm action={signUp} fields={signUpFields} submitLabel="Create Account" />
    </AuthCard>
  );
}
