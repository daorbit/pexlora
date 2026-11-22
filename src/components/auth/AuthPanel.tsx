"use client";

import { useState } from "react";
import { signIn, signUp } from "@/actions/auth";
import { routes } from "@/config/site";
import { authCopy, type AuthMode } from "@/content/auth";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthHeading } from "@/components/auth/AuthHeading";
import { AuthModeSwitch } from "@/components/auth/AuthModeSwitch";
import { AuthTextLink } from "@/components/auth/AuthTextLink";
import { credentialFields } from "@/components/auth/fields";
import { SocialAuth } from "@/components/auth/SocialAuth";
import { SignupProof } from "@/components/social-proof/SignupProof";

const modePaths: Record<AuthMode, string> = { signin: routes.signIn, signup: routes.signUp };

export function AuthPanel({ initialMode }: { initialMode: AuthMode }) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const copy = authCopy[mode];

  const switchMode = () => {
    const next = mode === "signin" ? "signup" : "signin";
    setMode(next);
    window.history.replaceState(null, "", `${modePaths[next]}${window.location.search}`);
  };

  return (
    <>
      <AuthHeading title={copy.title} description={copy.description} />
      {mode === "signup" && <SignupProof />}
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
      <AuthModeSwitch mode={mode} onSwitch={switchMode} />
    </>
  );
}
