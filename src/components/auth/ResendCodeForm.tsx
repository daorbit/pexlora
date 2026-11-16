"use client";

import { useActionState } from "react";
import { resendVerificationCode, restartSignup } from "@/actions/verify-email";
import { authCopy } from "@/content/auth";
import { cn } from "@/lib/utils/cn";
import { Alert } from "@/components/ui/Alert";

const copy = authCopy.verify;

const linkButton =
  "font-semibold text-accent-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50";

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
        </button>
        .
      </form>
      <form action={restartSignup}>
        <button type="submit" className={cn("text-[13px]", linkButton)}>
          {copy.startOver}
        </button>
      </form>
    </div>
  );
}
