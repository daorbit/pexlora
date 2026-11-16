import type { ReactNode } from "react";
import { ArrowRight, CreditCard, Gauge, ShieldCheck, type LucideIcon } from "lucide-react";
import { authCopy } from "@/content/auth";

function Perk({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-lg border border-separator bg-surface px-2.5 py-1.5 text-xs font-semibold lg:text-[12.5px]">
      <Icon className="size-3.5 shrink-0 text-accent-text" aria-hidden />
      {children}
    </li>
  );
}

export function AuthPerks() {
  const { limit, card, stored } = authCopy.perks;

  return (
    <ul className="flex flex-wrap gap-2">
      <Perk icon={Gauge}>
        <span className="inline-flex items-center gap-1">
          {limit.from}
          <ArrowRight className="size-3 text-tertiary" aria-label="to" />
          {limit.to}
        </span>
      </Perk>
      <Perk icon={CreditCard}>{card}</Perk>
      <Perk icon={ShieldCheck}>{stored}</Perk>
    </ul>
  );
}
