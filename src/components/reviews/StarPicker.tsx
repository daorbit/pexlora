"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { MAX_RATING } from "@/config/reviews";
import { reviewCopy } from "@/content/reviews";
import { cn } from "@/lib/utils/cn";

const values = Array.from({ length: MAX_RATING }, (_, index) => index + 1);

type StarPickerProps = {
  value: number;
  disabled?: boolean;
  onPick: (value: number) => void;
};

export function StarPicker({ value, disabled, onPick }: StarPickerProps) {
  const [hovered, setHovered] = useState(0);
  const shown = hovered || value;

  return (
    <div role="group" aria-label={reviewCopy.groupLabel} onPointerLeave={() => setHovered(0)} className="flex">
      {values.map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          aria-label={reviewCopy.star(star)}
          aria-pressed={star === value}
          onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(star)}
          onClick={() => onPick(star)}
          className="flex size-11 items-center justify-center rounded-xl transition-transform focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-60 motion-safe:active:scale-90"
        >
          <Star
            className={cn("size-7 transition-colors", star <= shown ? "fill-rating text-rating" : "fill-fill-strong text-fill-strong")}
            strokeWidth={1.5}
            aria-hidden
          />
        </button>
      ))}
    </div>
  );
}
