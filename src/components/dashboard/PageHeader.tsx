import type { ReactNode } from "react";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

type PageHeaderProps = {
  title: string;
  description?: string;
  iconSrc?: string;
  actions?: ReactNode;
};

export function PageHeader({ title, description, iconSrc, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div className="flex items-start gap-4">
        {iconSrc && <HubItemIcon src={iconSrc} size="lg" />}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">{title}</h1>
          {description && <p className="text-[15px] text-secondary">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export function PageHeaderFallback() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-8 w-56 animate-pulse rounded-lg bg-fill" />
      <div className="h-5 w-80 animate-pulse rounded-lg bg-fill" />
    </div>
  );
}
