import { BadgeCheck, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { heroCopy } from "@/content/landing";

const icons: Record<string, LucideIcon> = {
  free: BadgeCheck,
  private: ShieldCheck,
  fast: Zap,
};

export function HeroTrust() {
  return (
    <ul aria-label={heroCopy.trustLabel} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
      {heroCopy.trust.map((item) => {
        const Icon = icons[item.id];
        return (
          <li key={item.id} className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-secondary">
            <Icon className="size-4 text-accent-text" strokeWidth={2.2} aria-hidden />
            {item.label}
          </li>
        );
      })}
    </ul>
  );
}
