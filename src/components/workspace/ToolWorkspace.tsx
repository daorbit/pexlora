import { WorkspaceFrame } from "@/components/workspace/WorkspaceFrame";
import { WorkspacePanel, type WorkspacePanelProps } from "@/components/workspace/WorkspacePanel";

export function ToolWorkspace(props: WorkspacePanelProps) {
  return (
    <WorkspaceFrame>
      <WorkspacePanel {...props} />
    </WorkspaceFrame>
  );
}
