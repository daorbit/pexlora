import { formPresetIconSrc, formPresetPath, type FormPreset } from "@/config/form-presets";
import { LinkTile } from "@/components/tools/LinkTile";

type FormPresetLinksProps = { presets: FormPreset[]; current?: string };

export function FormPresetLinks({ presets, current }: FormPresetLinksProps) {
  return (
    <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {presets.map((preset) => (
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
  );
}
