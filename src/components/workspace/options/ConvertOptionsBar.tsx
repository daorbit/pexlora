"use client";

import { optionsCopy } from "@/content/workspace";
import { FORMAT_LABELS, OUTPUT_FORMATS } from "@/lib/image/formats";
import type { ConvertOptions } from "@/lib/image/options";
import { OptionGroup, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const formatOptions = OUTPUT_FORMATS.map((format) => ({
  value: format,
  label: FORMAT_LABELS[format],
  hint: optionsCopy.formatHints[format],
}));

export function ConvertOptionsBar({ options, onChange, disabled }: OptionsBarProps<ConvertOptions>) {
  return (
    <OptionsBar>
      <OptionGroup label={optionsCopy.format}>
        <OptionTiles
          label={optionsCopy.formatLabel}
          value={options.format}
          options={formatOptions}
          onChange={(format) => onChange({ format })}
          disabled={disabled}
        />
      </OptionGroup>
    </OptionsBar>
  );
}
