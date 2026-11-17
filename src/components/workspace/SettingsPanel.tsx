import type { ReactNode } from "react";

export function SettingsPanel({ children }: { children: ReactNode }) {
  return (
    <aside
      aria-label="Settings"
      className="flex flex-col gap-3.5 rounded-[20px] bg-surface p-4 shadow-card sm:gap-4 sm:rounded-[22px] sm:p-5 lg:sticky lg:top-(--panel-top,5rem) lg:max-h-[calc(100dvh-var(--panel-top,5rem)-1rem)] lg:overflow-y-auto"
    >
      {children}
    </aside>
  );
}
