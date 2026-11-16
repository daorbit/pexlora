"use client";

import { COMPRESS_TARGET_PRESETS_KB } from "@/config/compress-targets";
import { COMPRESS_TARGET_KB_RANGE } from "@/config/limits";
import { optionsCopy } from "@/content/workspace";
import type { CompressOptions } from "@/lib/image/options";
import { formatKilobytes } from "@/lib/utils/format-bytes";
import { CheckboxOption } from "@/components/workspace/options/CheckboxOption";
import { NumberOption } from "@/components/workspace/options/NumberOption";
import { OptionGroup } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";

const presetOptions = COMPRESS_TARGET_PRESETS_KB.map((kb) => ({ value: String(kb), label: formatKilobytes(kb) }));

type CompressTargetOptionsProps = {
  options: CompressOptions;
  onChange: (patch: Partial<CompressOptions>) => void;
  disabled?: boolean;
};

export function CompressTargetOptions({ options, onChange, disabled }: CompressTargetOptionsProps) {
  return (
    <>
      <OptionGroup label={optionsCopy.target}>
        <OptionTiles
          label={optionsCopy.targetLabel}
          value={String(options.targetKb)}
          options={presetOptions}
          onChange={(value) => onChange({ targetKb: Number(value) })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
      <NumberOption
        label={optionsCopy.custom}
        unit={optionsCopy.kilobytes}
        value={options.targetKb}
        max={COMPRESS_TARGET_KB_RANGE.max}
        placeholder=""
        disabled={disabled}
        onChange={(targetKb) => onChange({ targetKb })}
      />
      <CheckboxOption
        label={optionsCopy.allowFormatChange}
        checked={options.allowFormatChange}
        disabled={disabled}
        onChange={(allowFormatChange) => onChange({ allowFormatChange })}
      />
    </>
  );
}
