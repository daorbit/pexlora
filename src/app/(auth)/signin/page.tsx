import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { EmailFirstAuth } from "@/components/auth/EmailFirstAuth";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <AuthCard freeNote>
      <EmailFirstAuth initialMode="signin" />
    </AuthCard>
  );
}
