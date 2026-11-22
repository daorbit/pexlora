import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthPanel } from "@/components/auth/AuthPanel";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <AuthCard freeNote>
      <AuthPanel initialMode="signin" />
    </AuthCard>
  );
}
