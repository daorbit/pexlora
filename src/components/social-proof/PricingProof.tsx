import { RotateCcw } from "lucide-react";
import { proofIcons } from "@/config/social-proof";
import { pricingProof } from "@/content/social-proof";
import { IconStack } from "@/components/ui/IconStack";
import { CountProof } from "@/components/social-proof/CountProof";
import { SiteProof } from "@/components/social-proof/SiteProof";

export function PricingProof() {
  return (
    <SiteProof
      items={[
        { id: "tools", content: <CountProof {...pricingProof.tools} visual={<IconStack srcs={proofIcons} />} /> },
        { id: "refund", content: <CountProof {...pricingProof.refund} icon={RotateCcw} /> },
      ]}
    />
  );
}
