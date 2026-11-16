import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { routes } from "@/config/site";
import { authCopy } from "@/content/auth";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthTextLink } from "@/components/auth/AuthTextLink";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = { title: "Reset password", robots: { index: false } };

export default function ResetPasswordPage() {
  const copy = authCopy.reset;

  return (
    <AuthCard
      title={copy.title}
      description={copy.description}
      footer={
        <AuthTextLink href={routes.signIn} className="self-center">
          <ArrowLeft className="size-3.5" aria-hidden />
          {authCopy.forgot.back}
        </AuthTextLink>
      }
    >
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </AuthCard>
  );
}
