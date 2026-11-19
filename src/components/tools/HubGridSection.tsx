import type { HubItem } from "@/config/tool-hub";
import { Section } from "@/components/ui/Section";
import { HubCardGrid } from "@/components/home/HubCardGrid";

type HubGridSectionProps = {
  eyebrow: string;
  title: string;
  items: HubItem[];
};

export function HubGridSection({ eyebrow, title, items }: HubGridSectionProps) {
  if (!items.length) return null;

  return (
    <Section eyebrow={eyebrow} title={title} tone="surface">
      <HubCardGrid label={title} items={items} />
    </Section>
  );
}
