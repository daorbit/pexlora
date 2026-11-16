"use client";

import { cn } from "@/lib/utils/cn";
import { segmentedItem, segmentedTrack } from "@/components/ui/segmented-styles";

type SegmentedProps<T extends string> = {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
};

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled,
  size = "md",
  className,
}: SegmentedProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className={cn(segmentedTrack, className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          disabled={disabled}
          onClick={() => onChange(option.value)}
          className={segmentedItem(option.value === value, size)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
