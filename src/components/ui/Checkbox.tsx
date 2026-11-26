"use client";

import { cn } from "@/lib/utils/cn";

type CheckboxProps = {
  label: string;
  checked: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
};

export function Checkbox({ label, checked, indeterminate, disabled, hideLabel, className, onChange }: CheckboxProps) {
  return (
    <label className={cn("inline-flex items-center gap-2 text-[13px] font-medium text-secondary", className)}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        ref={(input) => {
          if (input) input.indeterminate = Boolean(indeterminate) && !checked;
        }}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 cursor-pointer accent-foreground disabled:cursor-not-allowed"
      />
      <span className={cn(hideLabel && "sr-only")}>{label}</span>
    </label>
  );
}
