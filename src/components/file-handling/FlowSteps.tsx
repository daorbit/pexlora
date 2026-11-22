import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type FlowStepsProps = {
  steps: string[];
  highlight?: boolean;
};

export function FlowSteps({ steps, highlight }: FlowStepsProps) {
  return (
    <ol className="flex flex-wrap items-center gap-1.5">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-1.5">
          {index > 0 && <ArrowRight aria-hidden className="size-3.5 shrink-0 text-tertiary" />}
          <span
            className={cn(
              "rounded-md px-2 py-1 text-[12px] font-semibold whitespace-nowrap sm:text-[12.5px]",
              index === 1 && highlight ? "bg-primary text-primary-foreground" : "bg-fill text-foreground",
            )}
          >
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}
