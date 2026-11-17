"use client";

import { optionsCopy } from "@/content/workspace";
import { PAGE_NUMBER_STYLES, type PageNumberOptions } from "@/lib/image/options";
import { CheckboxOption } from "@/components/workspace/options/CheckboxOption";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const styleOptions = PAGE_NUMBER_STYLES.map((style) => ({ value: style, ...optionsCopy.pageNumberStyles[style] }));

export function PageNumberOptionsBar({ options, onChange, disabled }: OptionsBarProps<PageNumberOptions>) {
  const set = (patch: Partial<PageNumberOptions>) => onChange({ ...options, ...patch });

  return (
    <OptionsBar footer={<OptionHint>{optionsCopy.pageNumberPositionNow(optionsCopy.pageNumberPositions[options.position].label)}</OptionHint>}>
      <OptionGroup label={optionsCopy.pageNumberStyle}>
        <OptionTiles
          label={optionsCopy.pageNumberStyleLabel}
          value={options.style}
          options={styleOptions}
          onChange={(style) => set({ style })}
          disabled={disabled}
        />
      </OptionGroup>
      <CheckboxOption
        label={optionsCopy.skipFirstPage}
        checked={options.skipFirst}
        disabled={disabled}
        onChange={(skipFirst) => set({ skipFirst })}
      />
    </OptionsBar>
  );
}
