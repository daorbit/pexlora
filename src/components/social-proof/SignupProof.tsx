import { BadgeCheck } from "lucide-react";
import { signupProof } from "@/content/auth";

export function SignupProof() {
  return (
    <p className="-mt-1 flex items-center justify-center gap-1.5 text-[13px] text-secondary sm:-mt-1.5">
      <BadgeCheck className="size-4 shrink-0 text-accent-text" strokeWidth={2.2} aria-hidden />
      {signupProof.text}
    </p>
  );
}
