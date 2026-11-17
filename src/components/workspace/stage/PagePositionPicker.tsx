"use client";

import { optionsCopy } from "@/content/workspace";
import { PAGE_NUMBER_POSITIONS, type PageNumberPosition, type PageNumberStyle } from "@/lib/image/options";
import { cn } from "@/lib/utils/cn";
import { PaperPage } from "@/components/workspace/stage/PaperPage";

const SAMPLE = { page: 1, total: 9 };

const spotClasses: Record<PageNumberPosition, string> = {
  "top-left": "top-2 left-2",
  "top-center": "top-2 left-1/2 -translate-x-1/2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-center": "bottom-2 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-2 right-2",
};

type PagePositionPickerProps = {
  value: PageNumberPosition;
  style: PageNumberStyle;
  disabled: boolean;
  onChange: (position: PageNumberPosition) => void;
};

export function PagePositionPicker({ value, style, disabled, onChange }: PagePositionPickerProps) {
  const sample = optionsCopy.pageNumberLabels[style](SAMPLE.page, SAMPLE.total);

  return (
    <PaperPage>
      <div role="radiogroup" aria-label={optionsCopy.pageNumberPositionLabel} className="absolute inset-0">
        {PAGE_NUMBER_POSITIONS.map((position) => {
          const active = position === value;
          return (
            <button
              key={position}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={optionsCopy.pageNumberPositions[position].label}
              disabled={disabled}
              onClick={() => onChange(position)}
              className={cn(
                "absolute flex h-7 min-w-7 items-center justify-center rounded-md px-2 transition-colors focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed",
                spotClasses[position],
                active ? "bg-primary text-xs font-bold whitespace-nowrap text-primary-foreground" : "group/spot hover:bg-black/5",
              )}
            >
              {active ? (
                sample
              ) : (
                <span className="size-2 rounded-full bg-black/20 transition-transform group-hover/spot:scale-125" aria-hidden />
              )}
            </button>
          );
        })}
      </div>
    </PaperPage>
  );
}
