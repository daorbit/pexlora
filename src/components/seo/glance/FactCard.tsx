import type { FactRow } from "@/content/facts";
import { cn } from "@/lib/utils/cn";
import { CountUp } from "@/components/ui/CountUp";
import { FactChips } from "@/components/seo/glance/FactChips";
import { factIcons } from "@/components/seo/glance/fact-icons";
import { FactStats } from "@/components/seo/glance/FactStats";

export function FactCard({ fact }: { fact: FactRow }) {
  const Icon = fact.icon && factIcons[fact.icon];

  return (
    <div
      className={cn(
        "group flex min-w-0 flex-col gap-4 rounded-[20px] p-4 transition-[translate] duration-300 sm:gap-5 sm:rounded-[22px] sm:p-6 sm:hover:-translate-y-1",
        fact.featured ? "theme-dark ink-panel text-foreground" : "bg-surface shadow-card",
        fact.wide && "sm:col-span-2",
      )}
    >
      <dt className="flex items-center gap-2.5 text-[13.5px] font-semibold text-secondary sm:text-sm">
        {Icon && (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
            <Icon className="size-4" strokeWidth={2.2} aria-hidden />
          </span>
        )}
        {fact.label}
      </dt>
      <dd className="flex flex-1 flex-col gap-3 sm:gap-4">
        {fact.highlight && (
          <span className="text-[30px] leading-none font-bold tracking-[-0.045em] sm:text-[42px]">
            <CountUp text={fact.highlight} />
          </span>
        )}
        {fact.chips && <FactChips chips={fact.chips} removed={fact.removed} />}
        {fact.stats && <FactStats stats={fact.stats} />}
        {!fact.chipsOnly && <span className="text-[14px] leading-relaxed text-secondary sm:text-[15px]">{fact.value}</span>}
      </dd>
    </div>
  );
}
