import type { ComponentType } from "react";
import { steps, stepsCopy } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { Band } from "@/components/ui/Band";
import { BandTitle } from "@/components/landing/BandTitle";
import { CleanVisual, DropVisual, ReadVisual } from "@/components/landing/StepVisuals";

const visuals: ComponentType[] = [DropVisual, ReadVisual, CleanVisual];
const stageDelays = ["[animation-delay:0s]", "[animation-delay:2s]", "[animation-delay:4s]"];
const nodePositions = ["left-1/6", "left-1/2", "left-5/6"];

export function StepsSection() {
  return (
    <Band id="how-it-works" tone="pearl" containerClassName="flex flex-col gap-8 sm:gap-12 lg:gap-16">
      <BandTitle className="max-w-205">{stepsCopy.title}</BandTitle>
      <div className="overflow-hidden rounded-[22px] bg-surface ring-1 ring-separator shadow-[0_1px_2px_rgb(16_18_13/0.05),0_40px_80px_-48px_rgb(16_18_13/0.35)] sm:rounded-[28px]">
        <div className="relative hidden h-16 border-b border-separator md:block" aria-hidden>
          <span className="absolute inset-x-1/6 top-1/2 h-px bg-border-strong" />
          {nodePositions.map((position, index) => (
            <span
              key={position}
              className={cn(
                "absolute top-1/2 inline-flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-surface text-xs font-semibold",
                position,
              )}
            >
              {index + 1}
            </span>
          ))}
          <span className="absolute top-1/2 left-1/6 -mt-1.5 -ml-1.5 size-3 rounded-full bg-primary ring-4 ring-primary/25 motion-safe:animate-rail-dot" />
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-3">
          {steps.map((step, index) => {
            const Visual = visuals[index];
            return (
              <li
                key={step.title}
                className={cn(
                  "flex flex-col gap-4 p-4 motion-safe:animate-stage-on sm:gap-5 sm:p-6 lg:p-8",
                  index > 0 && "border-t border-separator md:border-t-0 md:border-l",
                  stageDelays[index],
                )}
              >
                <Visual />
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  <h3 className="flex items-center gap-2 text-[18px] font-bold tracking-[-0.02em] sm:text-[22px] lg:text-[26px]">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-foreground text-[11px] text-background md:hidden">
                      {index + 1}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-[14px] leading-[1.5] text-secondary sm:text-[15.5px]">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Band>
  );
}
