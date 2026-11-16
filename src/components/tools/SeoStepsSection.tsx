import type { ToolStep } from "@/content/seo-pages/types";
import { Section } from "@/components/ui/Section";

type SeoStepsSectionProps = { title: string; steps: ToolStep[] };

export function SeoStepsSection({ title, steps }: SeoStepsSectionProps) {
  return (
    <Section narrow align="left" eyebrow="How it works" title={title}>
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-2 rounded-2xl bg-surface p-5 ring-1 ring-separator">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-[13px] font-bold text-primary-foreground">
              {index + 1}
            </span>
            <h3 className="text-[17px] font-semibold tracking-[-0.01em]">{step.title}</h3>
            <p className="text-[14.5px] leading-relaxed text-secondary">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
