import { factsCopy } from "@/content/facts";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FactsSection() {
  return (
    <Section id="facts">
      <div className="grid grid-cols-1 gap-5 sm:gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <SectionHeading
          eyebrow={factsCopy.eyebrow}
          title={factsCopy.title}
          className="items-start lg:sticky lg:top-28 lg:self-start"
        >
          <p className="text-[15px] leading-relaxed text-secondary sm:text-[17px]">{factsCopy.summary}</p>
        </SectionHeading>
        <table className="w-full min-w-0 overflow-hidden rounded-2xl border border-separator bg-surface text-left">
          <caption className="sr-only">{factsCopy.tableCaption}</caption>
          <tbody>
            {factsCopy.rows.map((row) => (
              <tr
                key={row.label}
                className="flex flex-col gap-1 border-b border-separator px-4 py-3.5 last:border-b-0 sm:table-row sm:p-0"
              >
                <th
                  scope="row"
                  className="text-[13px] font-semibold sm:w-48 sm:px-6 sm:py-4.5 sm:align-top sm:text-[15px]"
                >
                  {row.label}
                </th>
                <td className="text-[14px] leading-relaxed text-secondary sm:py-4.5 sm:pr-6 sm:text-[15px]">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
