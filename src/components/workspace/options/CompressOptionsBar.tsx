"use client";

import { optionsCopy } from "@/content/workspace";
import {
  COMPRESS_MODES,
  COMPRESSION_LEVELS,
  getCompressError,
  type CompressionLevel,
  type CompressMode,
  type CompressOptions,
} from "@/lib/image/options";
import { Segmented } from "@/components/ui/Segmented";
import { CompressTargetOptions } from "@/components/workspace/options/CompressTargetOptions";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const modeOptions = COMPRESS_MODES.map((mode) => ({ value: mode, label: optionsCopy.compressModes[mode] }));

const levelOptions = COMPRESSION_LEVELS.map((level) => ({
  value: level,
  label: optionsCopy.levels[level].label,
}));

export function CompressOptionsBar({ options, onChange, disabled }: OptionsBarProps<CompressOptions>) {
  const error = getCompressError(options);
  const set = (patch: Partial<CompressOptions>) => onChange({ ...options, ...patch });
  const hint = options.mode === "level" ? optionsCopy.levels[options.level].hint : optionsCopy.targetHint;

  return (
    <OptionsBar footer={<OptionHint tone={error ? "danger" : "muted"}>{error ?? hint}</OptionHint>}>
      <OptionGroup label={optionsCopy.compressBy}>
        <Segmented<CompressMode>
          label={optionsCopy.compressBy}
          size="sm"
          value={options.mode}
          options={modeOptions}
          onChange={(mode) => set({ mode })}
          disabled={disabled}
        />
      </OptionGroup>

      {options.mode === "level" ? (
        <OptionGroup label={optionsCopy.level}>
          <Segmented<CompressionLevel>
            label={optionsCopy.levelLabel}
            size="sm"
            value={options.level}
            options={levelOptions}
            onChange={(level) => set({ level })}
            disabled={disabled}
          />
        </OptionGroup>
      ) : (
        <CompressTargetOptions options={options} onChange={set} disabled={disabled} />
      )}
    </OptionsBar>
  );
}
