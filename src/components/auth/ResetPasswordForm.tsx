"use client";

import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/actions/password-reset";
import { routes } from "@/config/site";
import { authCopy } from "@/content/auth";
import { Alert } from "@/components/ui/Alert";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthTextLink } from "@/components/auth/AuthTextLink";
import { resetPasswordFields } from "@/components/auth/fields";

export function ResetPasswordForm() {
  const token = useSearchParams().get("token");
  const copy = authCopy.reset;

  if (!token) {
    return (
      <div className="flex flex-col gap-3">
        <Alert message={copy.missing} />
        <AuthTextLink href={routes.forgotPassword} className="self-center">
          {copy.requestNew}
        </AuthTextLink>
      </div>
    );
  }

  return (
    <AuthForm
      action={resetPassword}
      fields={resetPasswordFields}
      submitLabel={copy.submit}
      hiddenFields={{ token }}
      afterFields={
        <AuthTextLink href={routes.forgotPassword} className="self-end px-1">
          {copy.requestNew}
        </AuthTextLink>
      }
    />
  );
}
