"use client";

import type { WorkspaceController } from "@/hooks/useWorkspaceController";
import { WorkspaceSteps } from "@/components/workspace/steps/WorkspaceSteps";

type ControllerStepsProps = {
  controller: WorkspaceController;
  chooseLabel?: string;
  doneLabel?: string;
  className?: string;
};

export function ControllerSteps({ controller, chooseLabel, doneLabel, className }: ControllerStepsProps) {
  const { queue, phase, batchTotal } = controller;
  return (
    <WorkspaceSteps
      phase={phase}
      fileCount={queue.items.length}
      doneCount={queue.doneItems.length}
      total={batchTotal}
      chooseLabel={chooseLabel}
      doneLabel={doneLabel}
      className={className}
    />
  );
}
