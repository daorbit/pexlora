import { Section } from "@/components/ui/Section";

type SeoIntroSectionProps = {
  heading: string;
  paragraphs: string[];
};

export function SeoIntroSection({ heading, paragraphs }: SeoIntroSectionProps) {
  return (
    <Section narrow align="left" className="border-t border-separator">
      <article className="flex flex-col gap-3 sm:gap-5">
        <h2 className="text-[22px] leading-[1.15] font-semibold tracking-[-0.025em] sm:text-[34px] sm:leading-[1.1]">{heading}</h2>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-[15px] leading-relaxed text-secondary sm:text-[17px]">
            {paragraph}
          </p>
        ))}
      </article>
    </Section>
  );
}
