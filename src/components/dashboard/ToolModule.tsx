import type { WorkspaceToolSlug } from "@/config/tools";
import { ModuleTips } from "@/components/dashboard/ModuleTips";
import { ToolWorkspace } from "@/components/workspace/ToolWorkspace";

export function ToolModule({ slug }: { slug: WorkspaceToolSlug }) {
  return <ToolWorkspace tool={slug} panelFooter={<ModuleTips slug={slug} />} />;
}
