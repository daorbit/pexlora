"use client";

import type { ReactNode } from "react";
import type { WorkspaceController } from "@/hooks/useWorkspaceController";
import { ControllerSteps } from "@/components/workspace/steps/ControllerSteps";
import { StartOverButton } from "@/components/workspace/steps/StartOverButton";
import { StepsHeaderFrame } from "@/components/workspace/steps/StepsHeaderFrame";

type StepsHeaderProps = {
  controller: WorkspaceController;
  chooseLabel?: string;
  doneLabel?: string;
  aside?: ReactNode;
  className?: string;
};

export function StepsHeader({ controller, chooseLabel, doneLabel, aside, className }: StepsHeaderProps) {
  return (
    <StepsHeaderFrame
      className={className}
      steps={<ControllerSteps controller={controller} chooseLabel={chooseLabel} doneLabel={doneLabel} />}
      aside={controller.phase === "done" ? <StartOverButton onClick={controller.clearAll} /> : aside}
    />
  );
}
