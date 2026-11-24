import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type StepsHeaderFrameProps = {
  steps: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export function StepsHeaderFrame({ steps, aside, className }: StepsHeaderFrameProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3 border-b border-separator px-4 py-3.5 sm:px-5", className)}>
      {steps}
      {aside}
    </div>
  );
}
