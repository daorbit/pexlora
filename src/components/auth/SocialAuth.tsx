import { Suspense } from "react";
import { authCopy } from "@/content/auth";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { OAuthErrorNotice } from "@/components/auth/OAuthErrorNotice";

export function SocialAuth({ googleLabel }: { googleLabel: string }) {
  return (
    <div className="flex flex-col gap-3.5 lg:gap-5.5">
      <Suspense fallback={null}>
        <OAuthErrorNotice />
      </Suspense>
      <GoogleButton label={googleLabel} variant="ink" className="h-11.5 lg:h-13" />
      <div className="flex items-center gap-3 text-[11.5px] text-tertiary lg:text-[12.5px]">
        <span className="h-px flex-1 bg-separator" />
        {authCopy.divider}
        <span className="h-px flex-1 bg-separator" />
      </div>
    </div>
  );
}
