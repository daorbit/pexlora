"use client";

import { useState } from "react";
import type { FileKind } from "@/config/file-formats";
import type { WorkspaceToolSlug } from "@/config/tools";
import { ToolTabs } from "@/components/workspace/ToolTabs";
import { WorkspaceFrame } from "@/components/workspace/WorkspaceFrame";
import { WorkspacePanel } from "@/components/workspace/WorkspacePanel";

type ToolWorkspaceProps = {
  initialTool?: WorkspaceToolSlug;
  showTabs?: boolean;
  accepts?: FileKind[];
};

export function ToolWorkspace({ initialTool = "remove-metadata", showTabs = true, accepts }: ToolWorkspaceProps) {
  const [tool, setTool] = useState<WorkspaceToolSlug>(initialTool);

  return (
    <WorkspaceFrame tabs={showTabs ? <ToolTabs value={tool} onChange={setTool} /> : undefined}>
      <WorkspacePanel key={tool} tool={tool} accepts={accepts} />
    </WorkspaceFrame>
  );
}
