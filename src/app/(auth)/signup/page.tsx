import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthPanel } from "@/components/auth/AuthPanel";

export const metadata: Metadata = { title: "Create account" };

export default function SignUpPage() {
  return (
    <AuthCard freeNote>
      <AuthPanel initialMode="signup" />
    </AuthCard>
  );
}
