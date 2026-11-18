"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type OptionTile<T extends string> = { value: T; label: string; hint?: string; icon?: ReactNode };

type OptionTilesProps<T extends string> = {
  label: string;
  value: T | null;
  options: OptionTile<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
  columns?: 1 | 2 | 3 | 4;
};

const columnClasses = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" };

export function OptionTiles<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled,
  columns = 2,
}: OptionTilesProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("grid gap-2", columnClasses[columns])}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex min-h-11 flex-col justify-center gap-0.5 rounded-2xl px-3.5 py-2.5 text-left transition-[background-color,color,scale] duration-200 focus-visible:outline-2 motion-safe:active:scale-[0.97] focus-visible:outline-offset-1 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50",
              option.icon ? "items-center text-center" : "items-start",
              active ? "bg-primary text-primary-foreground" : "bg-fill hover:bg-fill-strong",
            )}
          >
            {option.icon && <span className="mb-1 flex h-7 items-center justify-center">{option.icon}</span>}
            <span className="text-sm font-bold">{option.label}</span>
            {option.hint && (
              <span className={cn("text-xs", active ? "text-primary-foreground/70" : "text-secondary")}>{option.hint}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
