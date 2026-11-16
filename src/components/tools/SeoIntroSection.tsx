import { Section } from "@/components/ui/Section";

type SeoIntroSectionProps = {
  heading: string;
  paragraphs: string[];
};

export function SeoIntroSection({ heading, paragraphs }: SeoIntroSectionProps) {
  return (
    <Section narrow align="left" className="border-t border-separator">
      <article className="flex flex-col gap-5">
        <h2 className="text-[28px] leading-[1.1] font-semibold tracking-[-0.025em] sm:text-[34px]">{heading}</h2>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-[17px] leading-relaxed text-secondary">
            {paragraph}
          </p>
        ))}
      </article>
    </Section>
  );
}
