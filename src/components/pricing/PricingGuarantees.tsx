import { CalendarCheck, RotateCcw, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { pricingCopy } from "@/content/pricing";

const icons: Record<(typeof pricingCopy.guarantees)[number]["id"], LucideIcon> = {
  once: CalendarCheck,
  instant: Zap,
  refund: RotateCcw,
  secure: ShieldCheck,
};

export function PricingGuarantees() {
  return (
    <div className="flex flex-col gap-3">
      <ul aria-label={pricingCopy.guaranteesLabel} className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
        {pricingCopy.guarantees.map((item) => {
          const Icon = icons[item.id];
          return (
            <li key={item.id} className="flex flex-col gap-2.5 rounded-2xl bg-surface p-4 shadow-card sm:flex-row sm:gap-3.5 sm:p-5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-fill">
                <Icon className="size-4.5 text-foreground" strokeWidth={2.1} aria-hidden />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">{item.title}</span>
                <span className="text-[12.5px] leading-snug text-secondary sm:text-[13px]">{item.body}</span>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="text-center text-[13px] text-tertiary">{pricingCopy.extend}</p>
    </div>
  );
}
