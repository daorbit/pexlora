import type { TextToolSlug } from "@/config/text-tools";
import { AiDetectorWorkspace } from "@/components/text-tools/AiDetectorWorkspace";

type TextToolWorkspaceProps = {
  slug: TextToolSlug;
  context: "site" | "dashboard";
};

const workspaces: Record<TextToolSlug, () => React.ReactNode> = {
  "ai-text-detector": () => <AiDetectorWorkspace />,
};

export function TextToolWorkspace({ slug }: TextToolWorkspaceProps) {
  return workspaces[slug]();
}
