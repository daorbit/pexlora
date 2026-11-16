import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";

type ChecklistSectionProps = {
  eyebrow: string;
  title: string;
  items: string[];
};

export function ChecklistSection({ eyebrow, title, items }: ChecklistSectionProps) {
  return (
    <Section eyebrow={eyebrow} title={title} narrow className="border-t border-separator">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-2xl border border-separator bg-surface p-5 text-[15px]"
          >
            <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={2.5} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
