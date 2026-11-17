"use client";

import { useEffect } from "react";
import { Check, Info, X } from "lucide-react";
import { toastCopy } from "@/content/toasts";
import { useFlashToast } from "@/hooks/useFlashToast";
import { useToasts } from "@/hooks/useToasts";
import { dismissToast, type Toast, type ToastTone } from "@/lib/toast/store";
import { cn } from "@/lib/utils/cn";

const DISMISS_AFTER_MS = 4500;
const ACTION_DISMISS_AFTER_MS = 7000;

const toneStyles: Record<ToastTone, { disc: string; Icon: typeof Check }> = {
  success: { disc: "bg-primary text-primary-foreground", Icon: Check },
  error: { disc: "bg-danger text-white", Icon: X },
  info: { disc: "bg-fill-strong text-foreground", Icon: Info },
};

function ToastCard({ item }: { item: Toast }) {
  const { disc, Icon } = toneStyles[item.tone];

  const { action } = item;

  useEffect(() => {
    const timer = window.setTimeout(() => dismissToast(item.id), action ? ACTION_DISMISS_AFTER_MS : DISMISS_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [item.id, action]);

  const runAction = () => {
    dismissToast(item.id);
    action?.onAction();
  };

  return (
    <li
      role={item.tone === "error" ? "alert" : "status"}
      className="theme-dark pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl bg-surface py-3 pr-2.5 pl-3.5 text-foreground shadow-card ring-1 ring-separator motion-safe:animate-fade-up motion-safe:[animation-duration:0.3s]"
    >
      <span className={cn("inline-flex size-6 shrink-0 items-center justify-center rounded-full", disc)}>
        <Icon className="size-3.5" strokeWidth={3} aria-hidden />
      </span>
      <p className="min-w-0 flex-1 text-sm font-medium">{item.message}</p>
      {action && (
        <button
          type="button"
          onClick={runAction}
          className="inline-flex h-8 shrink-0 items-center rounded-lg bg-primary px-3 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring"
        >
          {action.label}
        </button>
      )}
      <button
        type="button"
        onClick={() => dismissToast(item.id)}
        aria-label={toastCopy.dismiss}
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-fill hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
      >
        <X className="size-4" aria-hidden />
      </button>
    </li>
  );
}

export function Toaster() {
  const toasts = useToasts();
  useFlashToast();

  return (
    <section aria-label={toastCopy.region} className="pointer-events-none fixed inset-x-0 top-3 z-[100] px-4 sm:inset-x-auto sm:top-auto sm:right-5 sm:bottom-5 sm:px-0">
      <ol className="flex flex-col items-center gap-2 sm:items-end">
        {toasts.map((item) => (
          <ToastCard key={item.id} item={item} />
        ))}
      </ol>
    </section>
  );
}
