import type { ToolStep } from "@/content/seo-pages/types";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SeoStepsList } from "@/components/tools/SeoStepsList";

type SeoIntro = { heading: string; paragraphs: string[] };
type SeoStepsSectionProps = { title: string; steps: ToolStep[]; intro?: SeoIntro };

const STEPS_EYEBROW = "How it works";

export function SeoStepsSection({ title, steps, intro }: SeoStepsSectionProps) {
  return (
    <Section align="left" className="border-t border-separator">
      <div className="grid grid-cols-1 gap-6 sm:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
        <SectionHeading eyebrow={STEPS_EYEBROW} title={intro?.heading ?? title} className="max-w-none lg:sticky lg:top-24 lg:self-start">
          {intro?.paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-[62ch] text-[15px] leading-relaxed text-secondary sm:mt-1 sm:text-[17px]">
              {paragraph}
            </p>
          ))}
        </SectionHeading>
        <SeoStepsList title={intro ? title : undefined} steps={steps} />
      </div>
    </Section>
  );
}
