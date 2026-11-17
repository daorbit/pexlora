import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { EmailFirstAuth } from "@/components/auth/EmailFirstAuth";

export const metadata: Metadata = { title: "Create account" };

export default function SignUpPage() {
  return (
    <AuthCard freeNote>
      <EmailFirstAuth initialMode="signup" />
    </AuthCard>
  );
}
