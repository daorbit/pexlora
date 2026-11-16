"use client";

import type { ReactNode } from "react";
import { aiCopy, textToolCopy } from "@/content/ai";
import { AiButton } from "@/components/ai/AiButton";

type RunBarProps = {
  label: string;
  pendingLabel: string;
  pending: boolean;
  ready: boolean;
  onRun: () => void;
  children?: ReactNode;
};

export function RunBar({ label, pendingLabel, pending, ready, onRun, children }: RunBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-col gap-1.5">
        {children}
        <p className="text-[12.5px] text-tertiary">{ready ? aiCopy.limitNote : textToolCopy.minimum}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <kbd className="hidden rounded-md border border-separator px-1.5 py-0.5 font-sans text-[11.5px] text-tertiary lg:inline">
          {textToolCopy.shortcut}
        </kbd>
        <AiButton
          size="xl"
          pending={pending}
          label={label}
          pendingLabel={pendingLabel}
          disabled={!ready}
          onClick={onRun}
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
}
