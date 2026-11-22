import { PROOF_AVATARS } from "@/config/social-proof";
import { signupProof } from "@/content/social-proof";
import { AvatarStack } from "@/components/ui/AvatarStack";

export function SignupProof() {
  return (
    <div className="-mt-1 flex items-center justify-center gap-2.5 text-[13px] text-secondary sm:-mt-1.5">
      <AvatarStack srcs={PROOF_AVATARS.slice(0, 4)} size="xs" />
      <p>{signupProof.text}</p>
    </div>
  );
}
