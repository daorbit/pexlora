import { formatGroups, formatsCopy, formatsDescription } from "@/content/landing";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FormatsSection() {
  return (
    <Section id="formats" tone="surface">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <SectionHeading eyebrow={formatsCopy.eyebrow} title={formatsCopy.title} description={formatsDescription} />
        <ul className="flex min-w-0 flex-col border-t border-separator">
          {formatGroups.map((group) => (
            <li
              key={group.title}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-separator py-5"
            >
              <div className="flex min-w-44 flex-col">
                <h3 className="text-base font-semibold">{group.title}</h3>
                <p className="text-[13px] text-tertiary">{group.note}</p>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {group.formats.map((format) => (
                  <li key={format} className="rounded-md bg-background px-3 py-1.5 font-mono text-[12.5px]">
                    .{format.toLowerCase()}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
