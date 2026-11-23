import { formPresets } from "@/config/form-presets";
import { formPresetCopy } from "@/content/tool-pages";
import { Section } from "@/components/ui/Section";
import { FormPresetLinks } from "@/components/tools/FormPresetLinks";

export function FormPresetLinksSection({ current }: { current?: string }) {
  return (
    <Section eyebrow={formPresetCopy.section.eyebrow} title={formPresetCopy.section.title}>
      <FormPresetLinks presets={formPresets} current={current} />
    </Section>
  );
}
