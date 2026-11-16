import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { requestPasswordReset } from "@/actions/password-reset";
import { routes } from "@/config/site";
import { authCopy } from "@/content/auth";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthTextLink } from "@/components/auth/AuthTextLink";
import { forgotPasswordFields } from "@/components/auth/fields";

export const metadata: Metadata = { title: "Forgot password", robots: { index: false } };

export default function ForgotPasswordPage() {
  const copy = authCopy.forgot;

  return (
    <AuthCard
      title={copy.title}
      description={copy.description}
      footer={
        <AuthTextLink href={routes.signIn} className="self-center">
          <ArrowLeft className="size-3.5" aria-hidden />
          {copy.back}
        </AuthTextLink>
      }
    >
      <AuthForm action={requestPasswordReset} fields={forgotPasswordFields} submitLabel={copy.submit} />
    </AuthCard>
  );
}
