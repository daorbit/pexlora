import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function OptionsBar({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      {children}
      {footer}
    </div>
  );
}

type OptionGroupProps = {
  label: string;
  as?: "div" | "label";
  className?: string;
  children: ReactNode;
};

export function OptionGroup({ label, as: Tag = "div", className, children }: OptionGroupProps) {
  return (
    <Tag className={cn("flex flex-col gap-2", className)}>
      <span className="text-[13px] font-semibold text-secondary">{label}</span>
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
