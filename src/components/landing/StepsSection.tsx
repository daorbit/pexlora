import { ArrowDownToLine, Check, Search, type LucideIcon } from "lucide-react";
import { steps, stepsCopy } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { Band } from "@/components/ui/Band";
import { BandTitle } from "@/components/landing/BandTitle";

const icons: LucideIcon[] = [ArrowDownToLine, Search, Check];
const lineDelays = ["[animation-delay:0s]", "[animation-delay:1s]"];

export function StepsSection() {
  return (
    <Band id="how-it-works" tone="pearl" containerClassName="flex flex-col gap-14 lg:gap-18">
      <BandTitle className="max-w-205">{stepsCopy.title}</BandTitle>
      <ol className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-0">
        {steps.map((step, index) => {
          const Icon = icons[index];
          const delay = lineDelays[index];
          return (
            <li key={step.title} className="flex flex-col gap-5.5 md:pr-10">
              <div className="flex items-center">
                <span className="inline-flex size-22 shrink-0 items-center justify-center rounded-full bg-surface shadow-[0_1px_2px_rgb(16_18_13/0.05),0_18px_36px_-18px_rgb(16_18_13/0.3)]">
                  <Icon className="size-9" strokeWidth={1.6} aria-hidden />
                </span>
                {delay && (
                  <span className="relative h-0.5 flex-1 overflow-hidden bg-separator" aria-hidden>
                    <span
                      className={cn("absolute inset-0 hidden bg-foreground motion-safe:block motion-safe:animate-step-line", delay)}
                    />
                  </span>
                )}
              </div>
              <h3 className="text-[28px] font-bold tracking-[-0.03em]">{step.title}</h3>
              <p className="text-[17px] leading-[1.55] text-secondary">{step.description}</p>
            </li>
          );
        })}
      </ol>
    </Band>
  );
}
