"use client";

import { optionsCopy } from "@/content/workspace";
import { FORMAT_LABELS, OUTPUT_FORMATS, type OutputFormat } from "@/lib/image/formats";
import type { ConvertOptions } from "@/lib/image/options";
import { Segmented } from "@/components/ui/Segmented";
import { OptionGroup, OptionsBar } from "@/components/workspace/options/OptionsBar";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const formatOptions = OUTPUT_FORMATS.map((format) => ({
  value: format,
  label: FORMAT_LABELS[format],
}));

export function ConvertOptionsBar({ options, onChange, disabled }: OptionsBarProps<ConvertOptions>) {
  return (
    <OptionsBar>
      <OptionGroup label={optionsCopy.format}>
        <Segmented<OutputFormat>
          label={optionsCopy.formatLabel}
          size="sm"
          value={options.format}
          options={formatOptions}
          onChange={(format) => onChange({ format })}
          disabled={disabled}
        />
      </OptionGroup>
    </OptionsBar>
  );
}
