"use client";

import { optionsCopy } from "@/content/workspace";
import { PALETTE_SIZES, type PaletteOptions } from "@/lib/image/options";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const sizeOptions = PALETTE_SIZES.map((size) => ({ value: size, ...optionsCopy.paletteSizes[size] }));

export function PaletteOptionsBar({ options, onChange, disabled }: OptionsBarProps<PaletteOptions>) {
  return (
    <OptionsBar footer={<OptionHint>{optionsCopy.paletteHint}</OptionHint>}>
      <OptionGroup label={optionsCopy.paletteSize}>
        <OptionTiles
          label={optionsCopy.paletteSizeLabel}
          value={options.size}
          options={sizeOptions}
          onChange={(size) => onChange({ size })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
    </OptionsBar>
  );
}
