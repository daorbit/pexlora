import { authCopy } from "@/content/auth";
import { cn } from "@/lib/utils/cn";

export function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div role="img" aria-label={authCopy.entry.stepsLabel(step, total)} className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={cn(
            "h-1.5 rounded-full transition-[width,background-color] duration-300",
            index + 1 === step ? "w-5.5 bg-foreground" : "w-1.5 bg-border-strong",
          )}
        />
      ))}
    </div>
  );
}
