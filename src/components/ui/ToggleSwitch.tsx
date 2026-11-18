"use client";

import { cn } from "@/lib/utils/cn";

type ToggleSwitchProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export function ToggleSwitch({ label, checked, onChange, className }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg text-[13px] font-medium text-secondary transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      {label}
      <span
        aria-hidden
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors duration-300",
          checked ? "bg-primary" : "bg-fill-strong",
        )}
      >
        <span
          className={cn(
            "size-4 rounded-full bg-surface shadow-thumb transition-transform duration-300",
            checked ? "translate-x-4" : "translate-x-0",
          )}
        />
      </span>
    </button>
  );
}
