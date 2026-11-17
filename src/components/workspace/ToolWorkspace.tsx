import { WorkspacePanel, type WorkspacePanelProps } from "@/components/workspace/WorkspacePanel";
import { PlanPerksLoader } from "@/components/plan/PlanPerksLoader";

export function ToolWorkspace(props: WorkspacePanelProps) {
  return (
    <>
      <PlanPerksLoader />
      <WorkspacePanel {...props} />
    </>
  );
}
