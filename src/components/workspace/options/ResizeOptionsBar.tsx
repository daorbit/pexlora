"use client";

import { MAX_RESIZE_DIMENSION, RESIZE_PERCENT_RANGE } from "@/config/limits";
import { optionsCopy } from "@/content/workspace";
import { getResizeError, RESIZE_MODES, type ResizeMode, type ResizeOptions } from "@/lib/image/options";
import { Segmented } from "@/components/ui/Segmented";
import { NumberOption } from "@/components/workspace/options/NumberOption";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { RangeOption } from "@/components/workspace/options/RangeOption";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const modeOptions = RESIZE_MODES.map((mode) => ({ value: mode, label: optionsCopy.modes[mode] }));

export function ResizeOptionsBar({ options, onChange, disabled }: OptionsBarProps<ResizeOptions>) {
  const error = getResizeError(options);
  const set = (patch: Partial<ResizeOptions>) => onChange({ ...options, ...patch });

  return (
    <OptionsBar footer={error && <OptionHint tone="danger">{error}</OptionHint>}>
      <OptionGroup label={optionsCopy.resizeBy}>
        <Segmented<ResizeMode>
          label={optionsCopy.resizeBy}
          size="sm"
          value={options.mode}
          options={modeOptions}
          onChange={(mode) => set({ mode })}
          disabled={disabled}
        />
      </OptionGroup>

      {options.mode === "percent" ? (
        <RangeOption
          label={optionsCopy.scale}
          min={RESIZE_PERCENT_RANGE.min}
          max={RESIZE_PERCENT_RANGE.max}
          step={RESIZE_PERCENT_RANGE.step}
          value={options.percent}
          valueLabel={`${options.percent}%`}
          disabled={disabled}
          onChange={(percent) => set({ percent })}
        />
      ) : (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <NumberOption
            label={optionsCopy.width}
            unit={optionsCopy.pixels}
            value={options.width}
            max={MAX_RESIZE_DIMENSION}
            disabled={disabled}
            onChange={(width) => set({ width })}
          />
          <NumberOption
            label={optionsCopy.height}
            unit={optionsCopy.pixels}
            value={options.height}
            max={MAX_RESIZE_DIMENSION}
            disabled={disabled}
            onChange={(height) => set({ height })}
          />
          <label className="inline-flex items-center gap-2 text-[13px] font-medium text-secondary">
            <input
              type="checkbox"
              checked={options.keepAspect}
              disabled={disabled}
              onChange={(event) => set({ keepAspect: event.target.checked })}
              className="size-4 cursor-pointer accent-foreground disabled:cursor-not-allowed"
            />
            {optionsCopy.keepAspect}
          </label>
        </div>
      )}
    </OptionsBar>
  );
}
