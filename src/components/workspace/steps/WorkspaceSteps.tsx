import { Fragment } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { queueCopy, stepsCopy } from "@/content/workspace";
import type { WorkspacePhase } from "@/lib/workspace/phase";
import { cn } from "@/lib/utils/cn";

type StepState = "done" | "active" | "working" | "upcoming";

type WorkspaceStepsProps = {
  phase: WorkspacePhase;
  fileCount: number;
  doneCount: number;
  total: number;
  chooseLabel?: string;
  doneLabel?: string;
  className?: string;
};

function stepState(step: number, phase: WorkspacePhase): StepState {
  const current = phase === "add" ? 0 : phase === "done" ? 2 : 1;
  if (step < current) return "done";
  if (step > current) return "upcoming";
  return phase === "working" ? "working" : "active";
}

const circle: Record<StepState, string> = {
  done: "bg-accent-soft text-accent-text",
  active: "bg-primary text-primary-foreground",
  working: "bg-primary text-primary-foreground",
  upcoming: "bg-fill text-secondary",
};

export function WorkspaceSteps({ phase, fileCount, doneCount, total, chooseLabel, doneLabel, className }: WorkspaceStepsProps) {
  const labels = [
    fileCount ? stepsCopy.added(fileCount) : stepsCopy.add,
    phase === "working" ? queueCopy.working(doneCount, total) : phase === "done" ? (doneLabel ?? stepsCopy.done) : (chooseLabel ?? stepsCopy.choose),
    phase === "done" ? stepsCopy.saveActive : stepsCopy.save,
  ];

  return (
    <ol aria-label={stepsCopy.label} className={cn("flex min-w-0 items-center gap-2 sm:gap-3", className)}>
      {labels.map((label, index) => {
        const state = stepState(index, phase);
        const current = state === "active" || state === "working";
        return (
          <Fragment key={index}>
            {index > 0 && (
              <li aria-hidden className={cn("h-0.5 w-5 shrink-0 rounded-full sm:w-9", state === "upcoming" ? "bg-separator" : "bg-primary")} />
            )}
            <li aria-current={current ? "step" : undefined} className="flex min-w-0 items-center gap-2">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold transition-colors duration-300 sm:size-7.5",
                  circle[state],
                )}
              >
                {state === "done" && <Check className="size-3.5" strokeWidth={3.2} aria-hidden />}
                {state === "working" && <LoaderCircle className="size-3.5 animate-spin" strokeWidth={2.8} aria-hidden />}
                {(state === "active" || state === "upcoming") && index + 1}
              </span>
              <span
                className={cn(
                  "truncate text-[13px] sm:text-sm",
                  current ? "font-semibold text-foreground" : "font-medium text-secondary max-md:hidden",
                )}
              >
                {label}
              </span>
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}
