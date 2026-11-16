import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type StatCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  hint?: ReactNode;
};

export function StatCard({ label, value, icon: Icon, hint }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-secondary">{label}</p>
        <Icon className="size-4 text-secondary" aria-hidden />
      </div>
      <p className="text-[28px] font-semibold leading-none tracking-[-0.02em] tabular-nums">{value}</p>
      {hint && <div className="text-[13px] text-secondary">{hint}</div>}
    </Card>
  );
}

export function StatCardFallback() {
  return <div className="h-[138px] animate-pulse rounded-xl border border-separator bg-fill" />;
}
