import { howToSteps } from "@/content/seo-pages/shared";
import type { SeoPage } from "@/content/seo-pages";
import { Section } from "@/components/ui/Section";

export function SeoStepsSection({ page }: { page: SeoPage }) {
  const steps = howToSteps[page.tool];

  return (
    <Section narrow align="left" eyebrow="How it works" title={`How to use the ${page.name}`}>
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
