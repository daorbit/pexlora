"use client";

import type { ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { stepsCopy } from "@/content/workspace";
import type { WorkspaceController } from "@/hooks/useWorkspaceController";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { ControllerSteps } from "@/components/workspace/steps/ControllerSteps";

type StepsHeaderProps = {
  controller: WorkspaceController;
  chooseLabel?: string;
  doneLabel?: string;
  aside?: ReactNode;
  className?: string;
};

export function StepsHeader({ controller, chooseLabel, doneLabel, aside, className }: StepsHeaderProps) {
  const done = controller.phase === "done";

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3 border-b border-separator px-4 py-3.5 sm:px-5", className)}>
      <ControllerSteps controller={controller} chooseLabel={chooseLabel} doneLabel={doneLabel} />
      {done ? (
        <Button variant="secondary" size="sm" onClick={controller.clearAll} className="motion-safe:animate-fade-in">
          <RotateCcw className="size-3.5" aria-hidden />
          {stepsCopy.startOver}
        </Button>
      ) : (
        aside
      )}
    </div>
  );
}
