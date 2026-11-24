import { BadgeCheck, ShieldCheck } from "lucide-react";
import { getWorkspaceTool, type WorkspaceToolSlug } from "@/config/tools";
import { toolProofCopy } from "@/content/social-proof";
import { pathOf } from "@/lib/file-handling/tool-paths";
import { CountProof } from "@/components/social-proof/CountProof";
import { SiteProof } from "@/components/social-proof/SiteProof";

export function ToolProof({ tool }: { tool: WorkspaceToolSlug }) {
  const path = pathOf(getWorkspaceTool(tool));
  const price = path === "ai" ? toolProofCopy.ai : toolProofCopy.free;

  return (
    <SiteProof
      items={[
        { id: "path", content: <CountProof {...toolProofCopy.paths[path]} icon={ShieldCheck} /> },
        { id: "price", content: <CountProof {...price} icon={BadgeCheck} /> },
      ]}
    />
  );
}
