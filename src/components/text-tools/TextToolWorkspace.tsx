import { getTextTool, type TextToolSlug } from "@/config/text-tools";
import { AiDetectorWorkspace } from "@/components/text-tools/AiDetectorWorkspace";
import { HumanizerWorkspace } from "@/components/text-tools/HumanizerWorkspace";

type TextToolWorkspaceProps = {
  slug: TextToolSlug;
  context: "site" | "dashboard";
};

const peers: Record<TextToolSlug, TextToolSlug> = {
  "ai-text-detector": "ai-humanizer",
  "ai-humanizer": "ai-text-detector",
};

const workspaces: Record<TextToolSlug, (peerHref: string) => React.ReactNode> = {
  "ai-text-detector": (peerHref) => <AiDetectorWorkspace peerHref={peerHref} />,
  "ai-humanizer": (peerHref) => <HumanizerWorkspace peerHref={peerHref} />,
};

export function TextToolWorkspace({ slug, context }: TextToolWorkspaceProps) {
  const peer = getTextTool(peers[slug]);
  return workspaces[slug](context === "dashboard" ? peer.dashboardHref : peer.href);
}
