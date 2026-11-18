"use client";

import { cn } from "@/lib/utils/cn";
import { segmentedChip } from "@/components/ui/segmented-styles";

type ToggleChipsProps<T extends string> = {
  label: string;
  value: T[];
  options: { value: T; label: string }[];
  onChange: (value: T[]) => void;
  className?: string;
};

export function ToggleChips<T extends string>({ label, value, options, onChange, className }: ToggleChipsProps<T>) {
  const toggle = (option: T) =>
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);

  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {options.map((option) => {
        const active = value.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => toggle(option.value)}
            className={cn(segmentedChip(active), !active && "bg-fill")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
