"use client";

import { OptionGroup } from "@/components/workspace/options/OptionsBar";

type RangeOptionProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  valueLabel: string;
  disabled?: boolean;
  onChange: (value: number) => void;
};

export function RangeOption({ label, value, min, max, step = 1, valueLabel, disabled, onChange }: RangeOptionProps) {
  return (
    <OptionGroup as="label" label={label}>
      <span className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-1 flex-1 cursor-pointer accent-foreground disabled:cursor-not-allowed disabled:opacity-40"
        />
        <span className="w-12 text-right text-sm font-semibold tabular-nums">{valueLabel}</span>
      </span>
    </OptionGroup>
  );
}
