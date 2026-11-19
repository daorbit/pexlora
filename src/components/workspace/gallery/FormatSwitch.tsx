"use client";

import { optionsCopy, stepsCopy } from "@/content/workspace";
import { FORMAT_LABELS, OUTPUT_FORMATS, type OutputFormat } from "@/lib/image/formats";
import { Segmented } from "@/components/ui/Segmented";

type FormatSwitchProps = {
  value: OutputFormat;
  onChange: (format: OutputFormat) => void;
  disabled: boolean;
};

const options = OUTPUT_FORMATS.map((format) => ({ value: format, label: FORMAT_LABELS[format] }));

export function FormatSwitch({ value, onChange, disabled }: FormatSwitchProps) {
  return (
    <div className="flex items-center gap-2.5 max-sm:w-full">
      <span className="shrink-0 text-[13px] text-secondary">{stepsCopy.convertTo}</span>
      <Segmented
        label={optionsCopy.formatLabel}
        value={value}
        options={options}
        onChange={onChange}
        disabled={disabled}
        className="max-sm:flex-1 max-sm:[&>button]:flex-1"
      />
    </div>
  );
}
