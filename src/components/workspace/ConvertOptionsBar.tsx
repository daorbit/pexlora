"use client";

import { FORMAT_LABELS, OUTPUT_FORMATS, type OutputFormat } from "@/lib/image/formats";
import { Segmented } from "@/components/ui/Segmented";
import type { ConvertOptions } from "@/components/workspace/toolBehaviors";

const formatOptions = OUTPUT_FORMATS.map((format) => ({
  value: format,
  label: FORMAT_LABELS[format],
}));

type ConvertOptionsBarProps = {
  options: ConvertOptions;
  onChange: (options: ConvertOptions) => void;
  disabled: boolean;
};

export function ConvertOptionsBar({ options, onChange, disabled }: ConvertOptionsBarProps) {
  const qualityApplies = options.format !== "png";

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-[20px] bg-subtle px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="text-[13px] font-semibold text-secondary">Format</span>
        <Segmented<OutputFormat>
          label="Output format"
          size="sm"
          value={options.format}
          options={formatOptions}
          onChange={(format) => onChange({ ...options, format })}
          disabled={disabled}
        />
      </div>
      <label className="flex min-w-56 flex-1 items-center gap-3">
        <span className="text-[13px] font-semibold text-secondary">Quality</span>
        <input
          type="range"
          min={40}
          max={100}
          step={1}
          value={options.quality}
          disabled={disabled || !qualityApplies}
          onChange={(event) => onChange({ ...options, quality: Number(event.target.value) })}
          className="h-1 w-full max-w-60 cursor-pointer accent-foreground disabled:cursor-not-allowed disabled:opacity-40"
        />
        <span className="w-16 text-[13px] tabular-nums text-secondary">
          {qualityApplies ? `${options.quality}%` : "Lossless"}
        </span>
      </label>
    </div>
  );
}
