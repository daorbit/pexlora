"use client";

import type { WorkspaceController } from "@/hooks/useWorkspaceController";
import { workspaceCard } from "@/components/workspace/layouts/styles";
import { StepsHeader } from "@/components/workspace/steps/StepsHeader";

export function StepsBar({ controller }: { controller: WorkspaceController }) {
  return (
    <div className={workspaceCard}>
      <StepsHeader controller={controller} className="border-b-0" />
    </div>
  );
}
