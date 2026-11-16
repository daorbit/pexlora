import type { ReactNode } from "react";

type SettingsRowProps = {
  label: string;
  description?: string;
  children: ReactNode;
};

export function SettingsRow({ label, description, children }: SettingsRowProps) {
  return (
    <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-[13px] text-secondary">{description}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2 text-sm">{children}</div>
    </div>
  );
}
