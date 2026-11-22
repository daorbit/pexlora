import { HERO_AVATAR_COUNT, PROOF_AVATARS } from "@/config/social-proof";
import { filesProof, heroProof } from "@/content/social-proof";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { CountProof } from "@/components/social-proof/CountProof";
import { ProofDivider, ProofRow } from "@/components/social-proof/ProofRow";
import { RatingSummary } from "@/components/social-proof/RatingSummary";

export function HeroProof() {
  return (
    <ProofRow label={heroProof.label} className="sm:text-[14.5px]">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <AvatarStack srcs={PROOF_AVATARS.slice(0, HERO_AVATAR_COUNT)} />
        <RatingSummary reviews="sm" />
      </div>
      <ProofDivider />
      <CountProof count={filesProof.count} label={filesProof.label} />
    </ProofRow>
  );
}
