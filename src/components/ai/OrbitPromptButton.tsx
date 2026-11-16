"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { OrbitMark } from "@/components/ai/OrbitMark";

type OrbitPromptButtonProps = {
  label: string;
  hint: string;
  pending: boolean;
  pendingLabel: string;
  onClick: () => void;
};

export function OrbitPromptButton({ label, hint, pending, pendingLabel, onClick }: OrbitPromptButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="group flex w-full items-center gap-3 rounded-2xl border border-separator bg-surface p-2 pr-2.5 text-left transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-progress sm:w-fit sm:min-w-90"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-subtle">
        <OrbitMark size={40} className="size-9.5" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-semibold">{pending ? pendingLabel : label}</span>
        <span className="truncate text-[12.5px] text-secondary">{hint}</span>
      </span>
      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
        {pending ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden />
        ) : (
          <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden />
        )}
      </span>
    </button>
  );
}
