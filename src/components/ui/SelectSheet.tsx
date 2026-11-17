"use client";

import { useCallback, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, X } from "lucide-react";
import { useOverlayLock } from "@/hooks/useOverlayLock";
import { cn } from "@/lib/utils/cn";

type SelectSheetProps<T extends string> = {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  closeLabel: string;
  className?: string;
};

export function SelectSheet<T extends string>({ label, value, options, onChange, closeLabel, className }: SelectSheetProps<T>) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const titleId = useId();
  useOverlayLock(open, close, "(min-width: 640px)");
  const current = options.find((option) => option.value === value);

  const select = (next: T) => {
    onChange(next);
    close();
  };

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={cn(
          "flex h-12 w-full items-center justify-between gap-3 rounded-xl border-[1.5px] border-border-strong bg-fill px-4 text-left transition-colors active:bg-background focus-visible:outline-2 focus-visible:outline-ring",
          className,
        )}
      >
        <span className="flex min-w-0 items-baseline gap-1.5 text-[15px]">
          <span className="text-secondary">{label}:</span>
          <span className="truncate font-semibold">{current?.label}</span>
        </span>
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-ink text-ink-foreground">
          <ChevronDown className="size-4" strokeWidth={2.4} aria-hidden />
        </span>
      </button>
      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex flex-col justify-end text-foreground">
            <button
              type="button"
              aria-label={closeLabel}
              onClick={close}
              className="absolute inset-0 bg-black/40 motion-safe:animate-fade-in"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative flex max-h-[80dvh] flex-col gap-2 overflow-y-auto rounded-t-3xl bg-surface px-3 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] motion-safe:animate-fade-up"
            >
              <div className="flex items-center justify-between px-2 py-1">
                <p id={titleId} className="text-[15px] font-semibold">
                  {label}
                </p>
                <button
                  type="button"
                  aria-label={closeLabel}
                  onClick={close}
                  className="flex size-9 items-center justify-center rounded-full bg-fill"
                >
                  <X className="size-4.5" aria-hidden />
                </button>
              </div>
              <ul role="radiogroup" aria-labelledby={titleId} className="flex flex-col">
                {options.map((option) => {
                  const active = option.value === value;
                  return (
                    <li key={option.value}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => select(option.value)}
                        className={cn(
                          "flex h-13 w-full items-center justify-between gap-3 rounded-xl px-3 text-left text-[16px] active:bg-fill",
                          active ? "font-semibold" : "font-medium text-secondary",
                        )}
                      >
                        {option.label}
                        {active && (
                          <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="size-3.5" strokeWidth={3} aria-hidden />
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
