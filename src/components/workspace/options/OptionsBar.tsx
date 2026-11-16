import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function OptionsBar({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-[20px] bg-subtle px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">{children}</div>
      {footer}
    </div>
  );
}

type OptionGroupProps = {
  label: string;
  as?: "div" | "label";
  className?: string;
  labelClassName?: string;
  children: ReactNode;
};

export function OptionGroup({ label, as: Tag = "div", className, labelClassName, children }: OptionGroupProps) {
  return (
    <Tag className={cn("flex items-center gap-3", className)}>
      <span className={cn("text-[13px] font-semibold text-secondary", labelClassName)}>{label}</span>
      {children}
    </Tag>
  );
}

export function OptionHint({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "danger" }) {
  return (
    <p className={cn("text-[13px]", tone === "danger" ? "text-danger" : "text-secondary")} role={tone === "danger" ? "alert" : undefined}>
      {children}
    </p>
  );
}
