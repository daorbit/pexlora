"use client";

import { useState } from "react";
import { signIn, signUp } from "@/actions/auth";
import { routes } from "@/config/site";
import { authCopy, type AuthMode } from "@/content/auth";
import { Segmented } from "@/components/ui/Segmented";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthHeading } from "@/components/auth/AuthHeading";
import { AuthTextLink } from "@/components/auth/AuthTextLink";
import { credentialFields } from "@/components/auth/fields";
import { SocialAuth } from "@/components/auth/SocialAuth";
import { SignupProof } from "@/components/social-proof/SignupProof";

const modePaths: Record<AuthMode, string> = { signin: routes.signIn, signup: routes.signUp };

const modeOptions = (["signin", "signup"] as const).map((value) => ({ value, label: authCopy[value].tab }));

export function AuthPanel({ initialMode }: { initialMode: AuthMode }) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const copy = authCopy[mode];

  const switchMode = (next: AuthMode) => {
    setMode(next);
    window.history.replaceState(null, "", `${modePaths[next]}${window.location.search}`);
  };

  return (
    <>
      <AuthHeading title={copy.title} description={copy.description} />
      {mode === "signup" && <SignupProof />}
      <Segmented
        label={authCopy.modeLabel}
        value={mode}
        options={modeOptions}
        onChange={switchMode}
        className="grid w-full grid-cols-2"
      />
      <SocialAuth />
      <AuthForm
        key={mode}
        action={mode === "signin" ? signIn : signUp}
        fields={credentialFields[mode]}
        submitLabel={copy.submit}
        defaultValues={{ email }}
        onValueChange={(name, value) => name === "email" && setEmail(value)}
        afterFields={
          mode === "signin" ? (
            <AuthTextLink href={routes.forgotPassword} className="self-end px-1">
              {authCopy.forgot.link}
            </AuthTextLink>
          ) : null
        }
      />
    </>
  );
}
