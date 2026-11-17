"use client";

import { FORM_PHOTO_KB_RANGE, MAX_RESIZE_DIMENSION } from "@/config/limits";
import { optionsCopy } from "@/content/workspace";
import { getFormPhotoError, type FormPhotoOptions } from "@/lib/image/options";
import { NumberOption } from "@/components/workspace/options/NumberOption";
import { OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import type { OptionsBarProps } from "@/components/workspace/options/types";

export function FormPhotoOptionsBar({ options, onChange, disabled }: OptionsBarProps<FormPhotoOptions>) {
  const error = getFormPhotoError(options);
  const set = (patch: Partial<FormPhotoOptions>) => onChange({ ...options, ...patch });

  return (
    <OptionsBar
      footer={error ? <OptionHint tone="danger">{error}</OptionHint> : <OptionHint>{optionsCopy.formHint}</OptionHint>}
    >
      <div className="grid grid-cols-2 gap-3">
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
        <NumberOption
          label={optionsCopy.formMinKb}
          unit={optionsCopy.kilobytesUnit}
          value={options.minKb}
          max={FORM_PHOTO_KB_RANGE.max}
          placeholder="0"
          disabled={disabled}
          onChange={(minKb) => set({ minKb })}
        />
        <NumberOption
          label={optionsCopy.formMaxKb}
          unit={optionsCopy.kilobytesUnit}
          value={options.maxKb}
          max={FORM_PHOTO_KB_RANGE.max}
          placeholder="50"
          disabled={disabled}
          onChange={(maxKb) => set({ maxKb })}
        />
      </div>
    </OptionsBar>
  );
}
