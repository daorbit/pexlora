"use client";

import { converterOptionsCopy } from "@/content/converters";
import { PAGE_ORIENTATIONS, PDF_PAGE_SIZES, type PdfPageOptions } from "@/lib/image/options";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const sizeOptions = PDF_PAGE_SIZES.map((size) => ({ value: size, ...converterOptionsCopy.pageSizes[size] }));
const orientationOptions = PAGE_ORIENTATIONS.map((orientation) => ({
  value: orientation,
  ...converterOptionsCopy.orientations[orientation],
}));

type PdfPageOptionsBarProps = OptionsBarProps<PdfPageOptions> & { hint: string };

export function PdfPageOptionsBar({ options, onChange, disabled, hint }: PdfPageOptionsBarProps) {
  return (
    <OptionsBar footer={<OptionHint>{hint}</OptionHint>}>
      <OptionGroup label={converterOptionsCopy.pageSize}>
        <OptionTiles
          label={converterOptionsCopy.pageSizeLabel}
          value={options.size}
          options={sizeOptions}
          onChange={(size) => onChange({ ...options, size })}
          disabled={disabled}
          columns={2}
        />
      </OptionGroup>
      <OptionGroup label={converterOptionsCopy.orientation}>
        <OptionTiles
          label={converterOptionsCopy.orientationLabel}
          value={options.orientation}
          options={orientationOptions}
          onChange={(orientation) => onChange({ ...options, orientation })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
    </OptionsBar>
  );
}
