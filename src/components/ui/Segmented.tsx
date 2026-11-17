"use client";

import { cn } from "@/lib/utils/cn";
import {
  segmentedChip,
  segmentedChipsTrack,
  segmentedItem,
  segmentedTrack,
} from "@/components/ui/segmented-styles";

type SegmentedProps<T extends string> = {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  layout?: "track" | "chips";
  className?: string;
};

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled,
  size = "md",
  layout = "track",
  className,
}: SegmentedProps<T>) {
  const chips = layout === "chips";

  return (
    <div role="radiogroup" aria-label={label} className={cn(chips ? segmentedChipsTrack : segmentedTrack, className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          disabled={disabled}
          onClick={() => onChange(option.value)}
          className={chips ? segmentedChip(option.value === value) : segmentedItem(option.value === value, size)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
