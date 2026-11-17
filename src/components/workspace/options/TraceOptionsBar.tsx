"use client";

import { optionsCopy } from "@/content/workspace";
import { TRACE_COLORS, TRACE_DETAILS, type TraceOptions } from "@/lib/image/options";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const detailOptions = TRACE_DETAILS.map((detail) => ({ value: detail, ...optionsCopy.traceDetails[detail] }));

const colorOptions = TRACE_COLORS.map((colors) => ({ value: colors, label: optionsCopy.traceColorLabels[colors] }));

export function TraceOptionsBar({ options, onChange, disabled }: OptionsBarProps<TraceOptions>) {
  return (
    <OptionsBar footer={<OptionHint>{optionsCopy.traceHint}</OptionHint>}>
      <OptionGroup label={optionsCopy.traceDetail}>
        <OptionTiles
          label={optionsCopy.traceDetailLabel}
          value={options.detail}
          options={detailOptions}
          onChange={(detail) => onChange({ ...options, detail })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
      <OptionGroup label={optionsCopy.traceColors}>
        <OptionTiles
          label={optionsCopy.traceColorsLabel}
          value={options.colors}
          options={colorOptions}
          onChange={(colors) => onChange({ ...options, colors })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
    </OptionsBar>
  );
}
