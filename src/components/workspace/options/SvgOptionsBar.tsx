"use client";

import { optionsCopy } from "@/content/workspace";
import { FORMAT_LABELS } from "@/lib/image/formats";
import { SVG_OUTPUT_FORMATS, SVG_SIZES, type SvgRasterOptions } from "@/lib/image/options";
import { OptionGroup, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const formatOptions = SVG_OUTPUT_FORMATS.map((format) => ({
  value: format,
  label: FORMAT_LABELS[format],
  hint: optionsCopy.svgFormatHints[format],
}));

const sizeOptions = SVG_SIZES.map((size) => ({ value: size, ...optionsCopy.svgSizes[size] }));

export function SvgOptionsBar({ options, onChange, disabled }: OptionsBarProps<SvgRasterOptions>) {
  return (
    <OptionsBar>
      <OptionGroup label={optionsCopy.format}>
        <OptionTiles
          label={optionsCopy.formatLabel}
          value={options.format}
          options={formatOptions}
          onChange={(format) => onChange({ ...options, format })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
      <OptionGroup label={optionsCopy.svgSize}>
        <OptionTiles
          label={optionsCopy.svgSizeLabel}
          value={options.size}
          options={sizeOptions}
          onChange={(size) => onChange({ ...options, size })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
    </OptionsBar>
  );
}
