import type { Metadata } from "next";
import { signIn } from "@/actions/auth";
import { routes } from "@/config/site";
import { authCopy } from "@/content/auth";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthTextLink } from "@/components/auth/AuthTextLink";
import { signInFields } from "@/components/auth/fields";
import { SocialAuth } from "@/components/auth/SocialAuth";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  const copy = authCopy.signin;

  return (
    <AuthCard tabs="signin" title={copy.title} description={copy.description}>
      <SocialAuth googleLabel={copy.google} />
      <AuthForm
        action={signIn}
        fields={signInFields}
        submitLabel={copy.submit}
        afterFields={
          <AuthTextLink href={routes.forgotPassword} className="self-end px-1">
            {authCopy.forgot.link}
          </AuthTextLink>
        }
      />
    </AuthCard>
  );
}
