import type { FactRow } from "@/content/facts";
import { pageUpdatedAt } from "@/lib/seo/page-updated";
import { cn } from "@/lib/utils/cn";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactCard } from "@/components/seo/glance/FactCard";
import { UpdatedDate } from "@/components/seo/UpdatedDate";

type GlanceSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  summary: string;
  caption: string;
  rows: FactRow[];
  path?: string;
};

function gridColumns(count: number) {
  if (count === 3) return "sm:grid-cols-3";
  return count % 3 === 0 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
}

export function GlanceSection({ id = "facts", eyebrow, title, summary, caption, rows, path }: GlanceSectionProps) {
  return (
    <Section id={id}>
      <div className="flex flex-col gap-5 sm:gap-10">
        <div className="grid grid-cols-1 items-end gap-3 sm:gap-6 lg:grid-cols-2 lg:gap-16">
          <SectionHeading eyebrow={eyebrow} title={title} className="items-start" />
          <div className="flex flex-col gap-2.5">
            <p className="text-[15px] leading-relaxed text-secondary sm:text-[16.5px]">{summary}</p>
            {path && <UpdatedDate date={pageUpdatedAt(path)} />}
          </div>
        </div>
        <dl
          aria-label={caption}
          className={cn("grid grid-flow-dense grid-cols-1 gap-3 sm:gap-4", gridColumns(rows.length))}
        >
          {rows.map((fact) => (
            <FactCard key={fact.label} fact={fact} />
          ))}
        </dl>
      </div>
    </Section>
  );
}
