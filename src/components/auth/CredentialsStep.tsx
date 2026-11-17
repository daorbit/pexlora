"use client";

import { signIn, signUp } from "@/actions/auth";
import { routes } from "@/config/site";
import { authCopy, type AuthMode } from "@/content/auth";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthTextLink } from "@/components/auth/AuthTextLink";
import { EmailChip } from "@/components/auth/EmailChip";
import { credentialFields } from "@/components/auth/fields";

type CredentialsStepProps = {
  mode: AuthMode;
  email: string;
  onChangeEmail: () => void;
  onSwitchMode: () => void;
};

export function CredentialsStep({ mode, email, onChangeEmail, onSwitchMode }: CredentialsStepProps) {
  const copy = authCopy[mode];

  return (
    <div className="flex flex-col gap-4">
      <AuthForm
        key={mode}
        action={mode === "signin" ? signIn : signUp}
        fields={credentialFields[mode]}
        submitLabel={copy.submit}
        beforeFields={<EmailChip email={email} onChange={onChangeEmail} />}
        afterFields={
          mode === "signin" ? (
            <AuthTextLink href={routes.forgotPassword} className="self-end px-1">
              {authCopy.forgot.link}
            </AuthTextLink>
          ) : null
        }
      />
      <p className="text-center text-sm text-secondary">
        {copy.switchPrompt}{" "}
        <button
          type="button"
          onClick={onSwitchMode}
          className="font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          {copy.switchAction}
        </button>
      </p>
    </div>
  );
}
