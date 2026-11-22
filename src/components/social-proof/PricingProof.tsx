import { HERO_AVATAR_COUNT, PROOF_AVATARS } from "@/config/social-proof";
import { heroProof, pricingProof } from "@/content/social-proof";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { ProofDivider, ProofRow } from "@/components/social-proof/ProofRow";
import { RatingSummary } from "@/components/social-proof/RatingSummary";

export function PricingProof() {
  return (
    <ProofRow label={heroProof.label}>
      <p className="flex items-center gap-2.5">
        <AvatarStack srcs={PROOF_AVATARS.slice(0, HERO_AVATAR_COUNT)} />
        <span className="font-semibold text-foreground">{pricingProof.text}</span>
      </p>
      <ProofDivider />
      <RatingSummary reviews="never" />
    </ProofRow>
  );
}
