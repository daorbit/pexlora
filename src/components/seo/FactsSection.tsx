import type { FactRow } from "@/content/facts";
import { pageUpdatedAt } from "@/lib/seo/page-updated";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactsTable } from "@/components/seo/FactsTable";
import { UpdatedDate } from "@/components/seo/UpdatedDate";

type FactsSectionProps = {
  eyebrow: string;
  title: string;
  summary: string;
  caption: string;
  rows: FactRow[];
  path: string;
};

export function FactsSection({ eyebrow, title, summary, caption, rows, path }: FactsSectionProps) {
  return (
    <Section id="facts" className="border-t border-separator">
      <div className="grid grid-cols-1 gap-5 sm:gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <SectionHeading eyebrow={eyebrow} title={title} className="items-start lg:sticky lg:top-28 lg:self-start">
          <p className="text-[15px] leading-relaxed text-secondary sm:text-[17px]">{summary}</p>
          <UpdatedDate date={pageUpdatedAt(path)} className="sm:mt-1" />
        </SectionHeading>
        <FactsTable caption={caption} rows={rows} />
      </div>
    </Section>
  );
}
