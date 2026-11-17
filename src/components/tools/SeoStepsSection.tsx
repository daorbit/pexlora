import type { ToolStep } from "@/content/seo-pages/types";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
import { Section } from "@/components/ui/Section";

type SeoStepsSectionProps = { title: string; steps: ToolStep[] };

export function SeoStepsSection({ title, steps }: SeoStepsSectionProps) {
  return (
    <Section narrow align="left" eyebrow="How it works" title={title}>
      <MobileCarousel label={title} as="ol" trackClassName="gap-2 p-px sm:grid sm:grid-cols-3 sm:gap-3 sm:p-0">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex min-w-0 shrink-0 grow-0 basis-[86%] flex-col gap-2 rounded-2xl bg-surface p-4 ring-1 ring-separator sm:basis-auto sm:p-5"
          >
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-[13px] font-bold text-primary-foreground">
              {index + 1}
            </span>
            <h3 className="text-[15px] font-semibold tracking-[-0.01em] sm:text-[17px]">{step.title}</h3>
            <p className="text-[13.5px] leading-relaxed text-secondary sm:text-[14.5px]">{step.body}</p>
          </li>
        ))}
      </MobileCarousel>
    </Section>
  );
}
