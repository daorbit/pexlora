"use client";

import { optionsCopy } from "@/content/workspace";
import { PHOTO_SIGN_LAYOUTS, PHOTO_SIGN_SIZES, type PhotoSignOptions } from "@/lib/image/options";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const layoutOptions = PHOTO_SIGN_LAYOUTS.map((layout) => ({ value: layout, ...optionsCopy.photoSignLayouts[layout] }));
const sizeOptions = PHOTO_SIGN_SIZES.map((size) => ({ value: size, ...optionsCopy.photoSignSizes[size] }));

export function PhotoSignOptionsBar({ options, onChange, disabled }: OptionsBarProps<PhotoSignOptions>) {
  const set = (patch: Partial<PhotoSignOptions>) => onChange({ ...options, ...patch });

  return (
    <OptionsBar footer={<OptionHint>{optionsCopy.photoSignHint}</OptionHint>}>
      <OptionGroup label={optionsCopy.photoSignLayout}>
        <OptionTiles
          label={optionsCopy.photoSignLayoutLabel}
          value={options.layout}
          options={layoutOptions}
          onChange={(layout) => set({ layout })}
          disabled={disabled}
          columns={2}
        />
      </OptionGroup>
      <OptionGroup label={optionsCopy.photoSignSize}>
        <OptionTiles
          label={optionsCopy.photoSignSizeLabel}
          value={options.maxKb}
          options={sizeOptions}
          onChange={(maxKb) => set({ maxKb })}
          disabled={disabled}
          columns={2}
        />
      </OptionGroup>
    </OptionsBar>
  );
}
