import { Suspense } from "react";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { OAuthErrorNotice } from "@/components/auth/OAuthErrorNotice";

export function SocialAuth({ googleLabel }: { googleLabel: string }) {
  return (
    <div className="flex flex-col gap-5">
      <Suspense fallback={null}>
        <OAuthErrorNotice />
      </Suspense>
      <GoogleButton label={googleLabel} />
      <div className="flex items-center gap-3.5 text-[12.5px] text-secondary">
        <span className="h-px flex-1 bg-separator" />
        or
        <span className="h-px flex-1 bg-separator" />
      </div>
    </div>
  );
}
