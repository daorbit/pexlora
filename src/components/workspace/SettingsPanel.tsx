import type { ReactNode } from "react";

export function SettingsPanel({ children }: { children: ReactNode }) {
  return (
    <aside
      aria-label="Settings"
      className="flex flex-col gap-4 rounded-[22px] bg-surface p-5 shadow-card lg:sticky lg:top-6"
    >
      {children}
    </aside>
  );
}
