"use client";

import { optionsCopy } from "@/content/workspace";
import { FORMAT_LABELS, OUTPUT_FORMATS, type OutputFormat } from "@/lib/image/formats";
import { cn } from "@/lib/utils/cn";

type FormatStripProps = {
  value: OutputFormat;
  onChange: (format: OutputFormat) => void;
  disabled: boolean;
};

export function FormatStrip({ value, onChange, disabled }: FormatStripProps) {
  return (
    <div role="radiogroup" aria-label={optionsCopy.formatLabel} className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
      {OUTPUT_FORMATS.map((format) => {
        const active = format === value;
        return (
          <button
            key={format}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange(format)}
            className={cn(
              "group/format relative flex min-h-[4.5rem] flex-col items-start justify-between gap-1 overflow-hidden rounded-2xl border-[1.5px] px-4 py-3 text-left transition-[background-color,border-color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-60 motion-safe:active:scale-[0.97] sm:min-h-20",
              active ? "border-primary bg-primary text-primary-foreground" : "border-separator bg-subtle hover:border-border-strong",
            )}
          >
            <span className="text-lg font-bold tracking-[-0.02em] sm:text-xl">{FORMAT_LABELS[format]}</span>
            <span className={cn("text-xs sm:text-[13px]", active ? "text-primary-foreground/75" : "text-secondary")}>
              {optionsCopy.formatHints[format]}
            </span>
            {active && <span aria-hidden className="absolute top-3 right-3 size-2 rounded-full bg-primary-foreground motion-safe:animate-pop" />}
          </button>
        );
      })}
    </div>
  );
}
