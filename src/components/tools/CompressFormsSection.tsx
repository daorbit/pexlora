import type { CompressTarget } from "@/config/compress-targets";
import { compressGuideCopy } from "@/content/compress-target-guides";
import { formPresetsForTarget } from "@/lib/seo/compress-guide";
import { Section } from "@/components/ui/Section";
import { FormPresetLinks } from "@/components/tools/FormPresetLinks";

export function CompressFormsSection({ target }: { target: CompressTarget }) {
  const presets = formPresetsForTarget(target);
  if (!presets.length) return null;

  const { forms } = compressGuideCopy;
  return (
    <Section eyebrow={forms.eyebrow} title={forms.title(target.label)} description={forms.description}>
      <FormPresetLinks presets={presets} />
    </Section>
  );
}
