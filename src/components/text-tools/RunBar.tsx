"use client";

import type { ReactNode } from "react";
import { AI_TEXT_LIMITS } from "@/config/limits";
import { aiCopy, textToolCopy } from "@/content/ai";
import { cn } from "@/lib/utils/cn";
import { AiButton } from "@/components/ai/AiButton";
import { barWidth } from "@/components/text-tools/bar-widths";

type RunBarProps = {
  label: string;
  pendingLabel: string;
  pending: boolean;
  words: number;
  onRun: () => void;
  children?: ReactNode;
};

export function RunBar({ label, pendingLabel, pending, words, onRun, children }: RunBarProps) {
  const missing = Math.max(0, AI_TEXT_LIMITS.minWords - words);
  const ready = missing === 0;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-col gap-2">
        {children}
        {ready || !words ? (
          <p className="text-[12.5px] text-tertiary">{ready ? aiCopy.limitNote : textToolCopy.minimum}</p>
        ) : (
          <div className="flex items-center gap-2.5" role="status">
            <span className="h-1.5 w-28 overflow-hidden rounded-full bg-fill-strong" aria-hidden>
              <span
                className={cn("block h-full rounded-full bg-primary transition-[width] duration-300", barWidth((words / AI_TEXT_LIMITS.minWords) * 100))}
              />
            </span>
            <span className="text-[12.5px] font-medium text-secondary tabular-nums">
              {textToolCopy.wordProgress(words, AI_TEXT_LIMITS.minWords)}
            </span>
          </div>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <kbd className="hidden rounded-md border border-separator px-1.5 py-0.5 font-sans text-[11.5px] text-tertiary lg:inline">
          {textToolCopy.shortcut}
        </kbd>
        <AiButton
          size="xl"
          pending={pending}
          label={ready || !words ? label : textToolCopy.moreWords(missing)}
          pendingLabel={pendingLabel}
          disabled={!ready}
          onClick={onRun}
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
}
