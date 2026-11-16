import { hubCopy } from "@/content/landing";
import { Section } from "@/components/ui/Section";
import { ToolHub } from "@/components/home/ToolHub";

export function ToolHubSection() {
  return (
    <Section id="all-tools" tone="surface" eyebrow={hubCopy.eyebrow} title={hubCopy.title} description={hubCopy.description}>
      <ToolHub />
    </Section>
  );
}
