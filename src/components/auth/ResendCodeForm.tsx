"use client";

import { useActionState } from "react";
import { resendVerificationCode, restartSignup } from "@/actions/verify-email";
import { authCopy } from "@/content/auth";
import { cn } from "@/lib/utils/cn";
import { Alert } from "@/components/ui/Alert";
import { FormPendingSpinner } from "@/components/ui/FormPendingSpinner";
import { Spinner } from "@/components/ui/Spinner";

const copy = authCopy.verify;

const linkButton =
  "inline-flex items-center gap-1.5 font-semibold text-accent-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50";

export function ResendCodeForm() {
  const [state, formAction, pending] = useActionState(resendVerificationCode, undefined);

  return (
    <div className="flex flex-col gap-3">
      {state?.message && <Alert message={state.message} />}
      {state?.success && <Alert message={state.success} tone="success" />}
      <form action={formAction} className="text-[13px] text-secondary">
        {copy.resendPrompt}{" "}
        <button type="submit" disabled={pending} className={linkButton}>
          {copy.resend}
          {pending && <Spinner className="size-3.5" />}
        </button>
        .
      </form>
      <form action={restartSignup}>
        <button type="submit" className={cn("text-[13px]", linkButton)}>
          {copy.startOver}
          <FormPendingSpinner className="size-3.5" />
        </button>
      </form>
    </div>
  );
}
