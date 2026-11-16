import { Plus } from "lucide-react";
import { routes } from "@/config/site";
import { faqCopy, faqs } from "@/content/landing";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FaqSectionProps = {
  items?: { question: string; answer: string }[];
};

export function FaqSection({ items = faqs }: FaqSectionProps) {
  return (
    <Section id="faq">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <SectionHeading
          eyebrow={faqCopy.eyebrow}
          title={faqCopy.title}
          description={faqCopy.description}
          className="items-start lg:sticky lg:top-28 lg:self-start"
        >
          <ButtonLink href={routes.contact} variant="secondary" className="mt-3">
            {faqCopy.contact}
          </ButtonLink>
        </SectionHeading>
        <div className="flex min-w-0 flex-col gap-2.5">
          {items.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-separator bg-surface px-6">
              <summary className="flex list-none items-center justify-between gap-6 py-5 text-base font-semibold">
                {faq.question}
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-fill transition-all group-open:rotate-45 group-open:bg-primary group-open:text-primary-foreground">
                  <Plus className="size-4" strokeWidth={2.5} aria-hidden />
                </span>
              </summary>
              <p className="max-w-xl pr-10 pb-6 text-[15px] leading-relaxed text-secondary">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
