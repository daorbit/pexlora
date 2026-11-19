import { steps } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { stepPhaseDelays } from "@/components/landing/steps/step-timing";

export function StepsList({ className }: { className?: string }) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={cn(
            "grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 py-4 motion-safe:animate-step-row sm:gap-x-5 sm:py-6",
            stepPhaseDelays[index],
          )}
        >
          <span
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full bg-fill font-mono text-[13px] font-semibold text-secondary motion-safe:animate-step-disc sm:size-12 sm:text-sm",
              stepPhaseDelays[index],
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="text-[20px] font-bold tracking-[-0.02em] sm:text-[26px]">{step.title}</h3>
            <p className="text-[14px] leading-[1.5] text-secondary sm:text-[15.5px]">{step.description}</p>
          </div>
          <span className="col-span-2 h-0.5 overflow-hidden rounded-full bg-separator" aria-hidden>
            <span
              className={cn(
                "block h-full origin-left rounded-full bg-primary motion-safe:animate-step-bar motion-reduce:hidden",
                stepPhaseDelays[index],
              )}
            />
          </span>
        </li>
      ))}
    </ol>
  );
}
