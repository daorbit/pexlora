import type { ToolStep } from "@/content/seo-pages/types";

type SeoStepsListProps = { title?: string; steps: ToolStep[] };

export function SeoStepsList({ title, steps }: SeoStepsListProps) {
  return (
    <div className="flex flex-col rounded-3xl bg-surface p-2 shadow-card sm:p-3">
      {title && <h2 className="px-3 pt-3 pb-1 text-[15px] font-semibold tracking-[-0.01em] sm:px-4 sm:pt-4 sm:text-[17px]">{title}</h2>}
      <ol className="flex flex-col divide-y divide-separator">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-3.5 px-3 py-4 sm:gap-5 sm:px-4 sm:py-5">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-bold text-primary-foreground tabular-nums sm:size-9 sm:text-sm">
              {index + 1}
            </span>
            <div className="flex min-w-0 flex-col gap-1 pt-1 sm:gap-1.5">
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] sm:text-[17px]">{step.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-secondary sm:text-[15px]">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
