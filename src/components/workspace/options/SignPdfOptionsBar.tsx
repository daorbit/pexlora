"use client";

import { optionsCopy } from "@/content/workspace";
import { getSignPdfError, PAGE_NUMBER_POSITIONS, SIGN_PAGES, SIGN_SIZES, type SignPdfOptions } from "@/lib/image/options";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const positionOptions = PAGE_NUMBER_POSITIONS.map((position) => ({ value: position, ...optionsCopy.signPositions[position] }));
const sizeOptions = SIGN_SIZES.map((size) => ({ value: size, ...optionsCopy.signSizes[size] }));
const pageOptions = SIGN_PAGES.map((pages) => ({ value: pages, ...optionsCopy.signPageChoices[pages] }));

export function SignPdfOptionsBar({ options, onChange, disabled }: OptionsBarProps<SignPdfOptions>) {
  const error = getSignPdfError(options);
  const set = (patch: Partial<SignPdfOptions>) => onChange({ ...options, ...patch });

  return (
    <OptionsBar footer={error ? <OptionHint tone="danger">{error}</OptionHint> : <OptionHint>{optionsCopy.signHint}</OptionHint>}>
      <OptionGroup label={optionsCopy.signPages}>
        <OptionTiles
          label={optionsCopy.signPagesLabel}
          value={options.pages}
          options={pageOptions}
          onChange={(pages) => set({ pages })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
      <OptionGroup label={optionsCopy.signPosition}>
        <OptionTiles
          label={optionsCopy.signPositionLabel}
          value={options.position}
          options={positionOptions}
          onChange={(position) => set({ position })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
      <OptionGroup label={optionsCopy.signSize}>
        <OptionTiles
          label={optionsCopy.signSizeLabel}
          value={options.size}
          options={sizeOptions}
          onChange={(size) => set({ size })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
    </OptionsBar>
  );
}
