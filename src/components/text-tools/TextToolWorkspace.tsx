import { getTextTool, type TextToolSlug } from "@/config/text-tools";
import { AiDetectorWorkspace } from "@/components/text-tools/AiDetectorWorkspace";
import { HumanizerWorkspace } from "@/components/text-tools/HumanizerWorkspace";

type TextToolWorkspaceProps = {
  slug: TextToolSlug;
  context: "site" | "dashboard";
};

export function TextToolWorkspace({ slug, context }: TextToolWorkspaceProps) {
  const peer = getTextTool(slug === "ai-text-detector" ? "ai-humanizer" : "ai-text-detector");
  const peerHref = context === "dashboard" ? peer.dashboardHref : peer.href;

  return slug === "ai-text-detector" ? <AiDetectorWorkspace peerHref={peerHref} /> : <HumanizerWorkspace peerHref={peerHref} />;
}
