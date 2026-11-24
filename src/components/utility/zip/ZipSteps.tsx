import type { ComponentProps } from "react";
import { workspaceCard } from "@/components/workspace/layouts/styles";
import { StartOverButton } from "@/components/workspace/steps/StartOverButton";
import { StepsHeaderFrame } from "@/components/workspace/steps/StepsHeaderFrame";
import { WorkspaceSteps } from "@/components/workspace/steps/WorkspaceSteps";
import { ZipModeTabs, type ZipMode } from "@/components/utility/zip/ZipModeTabs";

type ZipStepsProps = ComponentProps<typeof WorkspaceSteps> & { mode: ZipMode; onStartOver: () => void };

export function ZipSteps({ mode, onStartOver, ...steps }: ZipStepsProps) {
  return (
    <div className={workspaceCard}>
      <StepsHeaderFrame
        className="border-b-0"
        steps={<WorkspaceSteps {...steps} />}
        aside={
          <div className="flex items-center gap-2 max-sm:w-full">
            {steps.phase === "done" && <StartOverButton onClick={onStartOver} />}
            <ZipModeTabs active={mode} />
          </div>
        }
      />
    </div>
  );
}
