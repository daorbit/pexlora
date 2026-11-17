"use client";

import { useState } from "react";
import { authCopy, type AuthMode } from "@/content/auth";
import { useNextPath } from "@/hooks/useNextPath";
import { AuthHeading } from "@/components/auth/AuthHeading";
import { CheckoutIntentNote } from "@/components/auth/CheckoutIntentNote";
import { CredentialsStep } from "@/components/auth/CredentialsStep";
import { EmailStep } from "@/components/auth/EmailStep";
import { SocialAuth } from "@/components/auth/SocialAuth";
import { StepDots } from "@/components/auth/StepDots";

const TOTAL_STEPS = 2;

export function EmailFirstAuth({ initialMode }: { initialMode: AuthMode }) {
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const next = useNextPath();
  const heading = confirmed ? authCopy[mode] : authCopy.entry;

  const continueWith = (value: string) => {
    setEmail(value);
    setConfirmed(true);
  };

  return (
    <>
      <AuthHeading title={heading.title} description={heading.description} />
      <CheckoutIntentNote next={next} />
      {confirmed ? (
        <div className="motion-safe:animate-fade-up motion-safe:[animation-duration:0.35s]">
          <CredentialsStep
            mode={mode}
            email={email}
            onChangeEmail={() => setConfirmed(false)}
            onSwitchMode={() => setMode((current) => (current === "signin" ? "signup" : "signin"))}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:gap-5">
          <SocialAuth />
          <EmailStep defaultEmail={email} onContinue={continueWith} />
        </div>
      )}
      <StepDots step={confirmed ? 2 : 1} total={TOTAL_STEPS} />
    </>
  );
}
