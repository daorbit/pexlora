"use client";

import { optionsCopy } from "@/content/workspace";
import { COMPRESSION_LEVELS, type CompressionLevel, type CompressOptions } from "@/lib/image/options";
import { Segmented } from "@/components/ui/Segmented";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const levelOptions = COMPRESSION_LEVELS.map((level) => ({
  value: level,
  label: optionsCopy.levels[level].label,
}));

export function CompressOptionsBar({ options, onChange, disabled }: OptionsBarProps<CompressOptions>) {
  return (
    <OptionsBar>
      <OptionGroup label={optionsCopy.level}>
        <Segmented<CompressionLevel>
          label={optionsCopy.levelLabel}
          size="sm"
          value={options.level}
          options={levelOptions}
          onChange={(level) => onChange({ level })}
          disabled={disabled}
        />
      </OptionGroup>
      <OptionHint>{optionsCopy.levels[options.level].hint}</OptionHint>
    </OptionsBar>
  );
}
