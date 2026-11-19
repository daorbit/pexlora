import { stepsDemo } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { stepPhaseDelays } from "@/components/landing/steps/step-timing";
import { CleanScene, DropScene, ReadScene } from "@/components/landing/steps/StepScenes";

export function StepsStage({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[24px] bg-surface ring-1 ring-separator shadow-[0_1px_2px_rgb(16_18_13/0.05),0_40px_80px_-48px_rgb(16_18_13/0.35)] sm:rounded-[28px]",
        className,
      )}
      aria-hidden
    >
      <div className="flex items-center justify-between gap-3 border-b border-separator px-4 py-3 sm:px-6 sm:py-4">
        <span className="truncate text-[13px] font-semibold" translate="no">
          {stepsDemo.file}
        </span>
        <span className="relative inline-grid shrink-0 text-right text-[12px] font-medium text-secondary">
          {stepsDemo.status.map((label, index) => (
            <span
              key={label}
              className={cn(
                "col-start-1 row-start-1 motion-safe:animate-step-scene",
                index < stepsDemo.status.length - 1 && "motion-reduce:hidden",
                stepPhaseDelays[index],
              )}
            >
              {label}
            </span>
          ))}
        </span>
      </div>
      <div className="relative h-[260px] sm:h-[340px]">
        <DropScene />
        <ReadScene />
        <CleanScene />
      </div>
    </div>
  );
}
