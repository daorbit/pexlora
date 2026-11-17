"use client";

import { optionsCopy } from "@/content/workspace";
import { FORMAT_LABELS } from "@/lib/image/formats";
import { RASTER_FORMATS, type HeicOptions } from "@/lib/image/options";
import { OptionGroup, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const formatOptions = RASTER_FORMATS.map((format) => ({
  value: format,
  label: FORMAT_LABELS[format],
  hint: optionsCopy.heicHints[format],
}));

export function HeicOptionsBar({ options, onChange, disabled }: OptionsBarProps<HeicOptions>) {
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
