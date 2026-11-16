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
    <OptionGroup as="label" label={label} className="min-w-56 flex-1">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1 w-full max-w-60 cursor-pointer accent-foreground disabled:cursor-not-allowed disabled:opacity-40"
      />
      <span className="w-16 text-[13px] tabular-nums text-secondary">{valueLabel}</span>
    </OptionGroup>
  );
}
