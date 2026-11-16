"use client";

import { optionsCopy } from "@/content/workspace";
import { cn } from "@/lib/utils/cn";
import { OptionGroup } from "@/components/workspace/options/OptionsBar";
import { optionFieldInput, optionFieldShell } from "@/components/workspace/options/styles";

type NumberOptionProps = {
  label: string;
  unit: string;
  value: number | null;
  max: number;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: number | null) => void;
};

export function NumberOption({
  label,
  unit,
  value,
  max,
  placeholder = optionsCopy.auto,
  disabled,
  onChange,
}: NumberOptionProps) {
  return (
    <OptionGroup as="label" label={label}>
      <span className={cn(optionFieldShell, "flex items-center gap-1 pr-3")}>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          max={max}
          step={1}
          value={value ?? ""}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value === "" ? null : Number(event.target.value))}
          className={cn(optionFieldInput, "w-full min-w-0 flex-1 pl-3 tabular-nums")}
        />
        <span className="text-xs text-secondary">{unit}</span>
      </span>
    </OptionGroup>
  );
}
