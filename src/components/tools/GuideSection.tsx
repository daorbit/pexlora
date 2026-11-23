import type { GuideContent } from "@/content/seo-pages/types";
import { Section } from "@/components/ui/Section";
import { textLinkClass } from "@/components/ui/text-link-styles";

const SOURCES_LABEL = "Sources";

export function GuideSection({ eyebrow, title, blocks, sources = [] }: GuideContent) {
  return (
    <Section eyebrow={eyebrow} title={title} align="left" className="border-t border-separator">
      <div className="flex flex-col gap-6 sm:gap-10">
        <div className="grid grid-cols-1 gap-x-16 gap-y-7 sm:gap-y-10 lg:grid-cols-2">
          {blocks.map((block) => (
            <div key={block.heading} className="flex min-w-0 flex-col gap-2 sm:gap-3">
              <h3 className="text-[17px] font-semibold tracking-[-0.015em] sm:text-[20px]">{block.heading}</h3>
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[14px] leading-relaxed text-secondary sm:text-[16px]">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
        {sources.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-secondary">
            <span>{SOURCES_LABEL}</span>
            {sources.map((source) => (
              <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className={textLinkClass}>
                {source.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
