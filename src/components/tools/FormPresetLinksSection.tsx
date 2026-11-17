import { formPresetIconSrc, formPresetPath, formPresets } from "@/config/form-presets";
import { formPresetCopy } from "@/content/tool-pages";
import { Section } from "@/components/ui/Section";
import { LinkTile } from "@/components/tools/LinkTile";

export function FormPresetLinksSection({ current }: { current?: string }) {
  return (
    <Section eyebrow={formPresetCopy.section.eyebrow} title={formPresetCopy.section.title}>
      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {formPresets.map((preset) => (
          <li key={preset.slug}>
            <LinkTile
              href={formPresetPath(preset.slug)}
              iconSrc={formPresetIconSrc}
              label={preset.name}
              active={preset.slug === current}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
