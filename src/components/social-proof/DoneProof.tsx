import { PROOF_AVATARS } from "@/config/social-proof";
import { doneProof, filesProof } from "@/content/social-proof";
import { AvatarStack } from "@/components/ui/AvatarStack";

export function DoneProof() {
  return (
    <div className="flex items-center gap-2.5 text-[13px] text-secondary motion-safe:animate-fade-up motion-safe:[animation-duration:0.4s]">
      <AvatarStack srcs={PROOF_AVATARS.slice(0, 3)} size="xs" />
      <p>{doneProof.text(filesProof.count)}</p>
    </div>
  );
}
