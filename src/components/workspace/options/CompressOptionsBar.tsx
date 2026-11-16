"use client";

import { optionsCopy } from "@/content/workspace";
import {
  COMPRESS_MODES,
  COMPRESSION_LEVELS,
  getCompressError,
  type CompressOptions,
} from "@/lib/image/options";
import { CompressTargetOptions } from "@/components/workspace/options/CompressTargetOptions";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const modeOptions = COMPRESS_MODES.map((mode) => ({
  value: mode,
  label: optionsCopy.compressModes[mode],
  hint: optionsCopy.compressModeHints[mode],
}));

const levelOptions = COMPRESSION_LEVELS.map((level) => ({
  value: level,
  label: optionsCopy.levels[level].label,
  hint: optionsCopy.levels[level].hint,
}));

export function CompressOptionsBar({ options, onChange, disabled }: OptionsBarProps<CompressOptions>) {
  const error = getCompressError(options);
  const set = (patch: Partial<CompressOptions>) => onChange({ ...options, ...patch });
  const byLevel = options.mode === "level";

  return (
    <OptionsBar
      footer={
        error ? <OptionHint tone="danger">{error}</OptionHint> : !byLevel && <OptionHint>{optionsCopy.targetHint}</OptionHint>
      }
    >
      <OptionGroup label={optionsCopy.compressBy}>
        <OptionTiles
          label={optionsCopy.compressBy}
          value={options.mode}
          options={modeOptions}
          onChange={(mode) => set({ mode })}
          disabled={disabled}
        />
      </OptionGroup>

      {byLevel ? (
        <OptionGroup label={optionsCopy.level}>
          <OptionTiles
            label={optionsCopy.levelLabel}
            value={options.level}
            options={levelOptions}
            onChange={(level) => set({ level })}
            disabled={disabled}
            columns={1}
          />
        </OptionGroup>
      ) : (
        <CompressTargetOptions options={options} onChange={set} disabled={disabled} />
      )}
    </OptionsBar>
  );
}
