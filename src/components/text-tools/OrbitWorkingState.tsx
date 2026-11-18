"use client";

import { useCycle } from "@/hooks/useCycle";
import { cn } from "@/lib/utils/cn";
import { OrbitMark } from "@/components/ai/OrbitMark";

const lineWidths = ["w-11/12", "w-full", "w-9/12", "w-full", "w-10/12", "w-7/12", "w-11/12", "w-8/12"];

export function OrbitWorkingState({ steps }: { steps: readonly string[] }) {
  const step = useCycle(steps.length);

  return (
    <div className="relative flex flex-1 flex-col gap-6 overflow-hidden p-5" role="status">
      <div className="flex items-center gap-3.5">
        <span className="relative grid size-12 shrink-0 place-items-center">
          <span className="absolute inset-0 rounded-full border-2 border-dashed border-border-strong motion-safe:animate-orbit-spin" />
          <OrbitMark size={28} className="size-7" />
        </span>
        <div className="flex min-w-0 flex-col overflow-hidden">
          <p key={step} className="text-[15px] font-semibold motion-safe:animate-fade-up">
            {steps[step]}
          </p>
          <div className="mt-2 flex gap-1.5" aria-hidden>
            {steps.map((label, index) => (
              <span
                key={label}
                className={cn(
                  "h-1 w-7 rounded-full transition-colors duration-500",
                  index <= step ? "bg-primary" : "bg-fill-strong",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden className="relative flex flex-col gap-3">
        <span className="absolute inset-x-0 z-10 h-0.5 bg-primary motion-safe:animate-scan-y" />
        {lineWidths.map((width, index) => (
          <span key={index} className={cn("relative h-3.5 overflow-hidden rounded-full bg-fill-strong", width)}>
            <span className="absolute inset-y-0 left-0 w-full bg-surface/60 motion-safe:animate-shimmer" />
          </span>
        ))}
      </div>
    </div>
  );
}
