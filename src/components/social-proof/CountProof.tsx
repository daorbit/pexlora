import type { ReactNode } from "react";
import { Zap, type LucideIcon } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";

type CountProofProps = {
  value: string;
  label: string;
  icon?: LucideIcon;
  visual?: ReactNode;
};

export function CountProof({ value, label, icon: Icon = Zap, visual }: CountProofProps) {
  return (
    <p className="flex items-center gap-2 sm:gap-3">
      {visual ?? (
        <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground sm:size-8">
          <span aria-hidden className="absolute inset-0 rounded-full bg-primary opacity-0 motion-safe:animate-celebrate-ring" />
          <Icon className="relative size-4" strokeWidth={2.3} aria-hidden />
        </span>
      )}
      <span className="flex flex-col text-left leading-tight sm:flex-row sm:items-baseline sm:gap-1.5">
        <span className="text-[15px] font-bold tracking-[-0.02em] text-foreground sm:text-[17px]">
          <CountUp text={value} />
        </span>
        <span className="text-[12px] text-secondary sm:text-[14.5px]">{label}</span>
      </span>
    </p>
  );
}
