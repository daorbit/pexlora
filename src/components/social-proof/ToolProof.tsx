import type { WorkspaceToolSlug } from "@/config/tools";
import { heroProof, toolProof, toolProofFallback } from "@/content/social-proof";
import { CountProof } from "@/components/social-proof/CountProof";
import { ProofDivider, ProofRow } from "@/components/social-proof/ProofRow";
import { RatingSummary } from "@/components/social-proof/RatingSummary";

export function ToolProof({ tool }: { tool: WorkspaceToolSlug }) {
  const proof = toolProof[tool] ?? toolProofFallback;

  return (
    <ProofRow label={heroProof.label}>
      <RatingSummary reviews="sm" />
      <ProofDivider />
      <CountProof count={proof.count} label={proof.label} />
    </ProofRow>
  );
}
