import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";

type GroupCardProps = { title: string; description?: string; children: ReactNode; className?: string };

export function GroupCard({ title, description, children, className }: GroupCardProps) {
  return (
    <Card className={cn("flex flex-col overflow-hidden", className)}>
      <div className="flex flex-col gap-0.5 px-4 pt-4 pb-2">
        <h3 className="text-[11px] font-semibold tracking-[0.06em] text-tertiary uppercase">{title}</h3>
        {description && <p className="text-[13px] text-secondary">{description}</p>}
      </div>
      {children}
    </Card>
  );
}

export function GroupRows({ children }: { children: ReactNode }) {
  return <ul className="divide-y divide-separator pb-1.5">{children}</ul>;
}
