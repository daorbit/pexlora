import type { HubItem } from "@/config/tool-hub";
import { Section } from "@/components/ui/Section";
import { HubCard } from "@/components/home/HubCard";

type HubGridSectionProps = {
  eyebrow: string;
  title: string;
  items: HubItem[];
};

export function HubGridSection({ eyebrow, title, items }: HubGridSectionProps) {
  if (!items.length) return null;

  return (
    <Section eyebrow={eyebrow} title={title} tone="surface">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.key}>
            <HubCard item={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
