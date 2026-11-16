"use client";

import { optionsCopy } from "@/content/workspace";
import { FORMAT_LABELS, OUTPUT_FORMATS, type OutputFormat } from "@/lib/image/formats";
import type { ConvertOptions } from "@/lib/image/options";
import { Segmented } from "@/components/ui/Segmented";
import { OptionGroup, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { RangeOption } from "@/components/workspace/options/RangeOption";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const formatOptions = OUTPUT_FORMATS.map((format) => ({
  value: format,
  label: FORMAT_LABELS[format],
}));

export function ConvertOptionsBar({ options, onChange, disabled }: OptionsBarProps<ConvertOptions>) {
  const qualityApplies = options.format !== "png";

  return (
    <OptionsBar>
      <OptionGroup label={optionsCopy.format}>
        <Segmented<OutputFormat>
          label={optionsCopy.formatLabel}
          size="sm"
          value={options.format}
          options={formatOptions}
          onChange={(format) => onChange({ ...options, format })}
          disabled={disabled}
        />
      </OptionGroup>
      <RangeOption
        label={optionsCopy.quality}
        min={40}
        max={100}
        value={options.quality}
        valueLabel={qualityApplies ? `${options.quality}%` : optionsCopy.lossless}
        disabled={disabled || !qualityApplies}
        onChange={(quality) => onChange({ ...options, quality })}
      />
    </OptionsBar>
  );
}
