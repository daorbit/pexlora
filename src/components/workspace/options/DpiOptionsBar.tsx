"use client";

import { DPI_RANGE } from "@/config/limits";
import { optionsCopy } from "@/content/workspace";
import { DPI_PRESETS, getDpiError, isOneOf, type DpiOptions } from "@/lib/image/options";
import { NumberOption } from "@/components/workspace/options/NumberOption";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const presetOptions = DPI_PRESETS.map((preset) => ({ value: preset, ...optionsCopy.dpiPresets[preset] }));

export function DpiOptionsBar({ options, onChange, disabled }: OptionsBarProps<DpiOptions>) {
  const error = getDpiError(options);
  const current = String(options.dpi);
  const preset = isOneOf(DPI_PRESETS, current) ? current : null;

  return (
    <OptionsBar footer={error ? <OptionHint tone="danger">{error}</OptionHint> : <OptionHint>{optionsCopy.dpiHint}</OptionHint>}>
      <OptionGroup label={optionsCopy.dpi}>
        <OptionTiles
          label={optionsCopy.dpiLabel}
          value={preset}
          options={presetOptions}
          onChange={(value) => onChange({ dpi: Number(value) })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
      <NumberOption
        label={optionsCopy.dpiCustom}
        unit={optionsCopy.dpiUnit}
        value={options.dpi}
        max={DPI_RANGE.max}
        placeholder="300"
        disabled={disabled}
        onChange={(dpi) => onChange({ dpi })}
      />
    </OptionsBar>
  );
}
