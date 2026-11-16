"use client";

import { optionsCopy } from "@/content/workspace";
import { OptionGroup } from "@/components/workspace/options/OptionsBar";

type NumberOptionProps = {
  label: string;
  unit: string;
  value: number | null;
  max: number;
  disabled?: boolean;
  onChange: (value: number | null) => void;
};

export function NumberOption({ label, unit, value, max, disabled, onChange }: NumberOptionProps) {
  return (
    <OptionGroup as="label" label={label}>
      <span className="inline-flex h-8 items-center gap-1 rounded-full border border-separator bg-surface pr-3 transition-colors focus-within:border-foreground hover:border-border-strong">
        <input
          type="number"
          inputMode="numeric"
          min={1}
          max={max}
          step={1}
          value={value ?? ""}
          placeholder={optionsCopy.auto}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value === "" ? null : Number(event.target.value))}
          className="h-full w-20 bg-transparent pl-3 text-[13px] tabular-nums outline-none placeholder:text-secondary disabled:opacity-50"
        />
        <span className="text-xs text-secondary">{unit}</span>
      </span>
    </OptionGroup>
  );
}
