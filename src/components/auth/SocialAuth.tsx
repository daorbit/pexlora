import { Suspense } from "react";
import { authCopy } from "@/content/auth";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { OAuthErrorNotice } from "@/components/auth/OAuthErrorNotice";

export function SocialAuth() {
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <Suspense fallback={null}>
        <OAuthErrorNotice />
      </Suspense>
      <GoogleButton label={authCopy.google} variant="secondary" className="h-12 sm:h-12.5" />
      <div className="flex items-center gap-3 text-[12.5px] text-secondary">
        <span className="h-px flex-1 bg-separator" />
        {authCopy.divider}
        <span className="h-px flex-1 bg-separator" />
      </div>
    </div>
  );
}
