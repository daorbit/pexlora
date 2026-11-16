import { Section } from "@/components/ui/Section";
import { ToolGrid } from "@/components/tools/ToolGrid";

export function ToolsSection() {
  return (
    <Section
      eyebrow="More tools"
      title="Every metadata tool you need, in one place."
      description="Pick a tool, drop your files and download the result. Free, with no sign-up."
    >
      <ToolGrid />
    </Section>
  );
}
