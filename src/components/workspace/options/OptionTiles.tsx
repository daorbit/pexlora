"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { tileClasses, tileHint } from "@/components/workspace/options/tile-styles";
import { TileCheck } from "@/components/workspace/options/TileCheck";

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
            className={tileClasses(
              active,
              cn(
                "flex min-h-11 flex-col justify-center gap-0.5 rounded-xl px-3.5 py-2.5",
                option.icon ? "items-center text-center" : "items-start",
              ),
            )}
          >
            {option.icon && <span className="mb-1 flex h-7 items-center justify-center">{option.icon}</span>}
            <span className="text-sm font-bold">{option.label}</span>
            {option.hint && <span className={cn("text-xs", tileHint)}>{option.hint}</span>}
            {active && <TileCheck className="top-1.5 right-1.5 size-4" />}
          </button>
        );
      })}
    </div>
  );
}
