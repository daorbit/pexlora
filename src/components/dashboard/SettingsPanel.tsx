import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type SettingsPanelProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function SettingsPanel({ title, description, children }: SettingsPanelProps) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-separator px-5 py-4">
        <h2 className="text-[15px] font-semibold">{title}</h2>
        {description && <p className="mt-0.5 text-[13px] text-secondary">{description}</p>}
      </div>
      <div className="divide-y divide-separator">{children}</div>
    </Card>
  );
}
