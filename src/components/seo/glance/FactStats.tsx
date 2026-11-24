import type { FactStat } from "@/content/facts";

export function FactStats({ stats }: { stats: FactStat[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
      {stats.map((stat) => (
        <li key={stat.label} className="flex flex-col gap-0.5 rounded-xl bg-fill px-3 py-2.5 sm:px-4 sm:py-3.5">
          <span className="text-[19px] font-bold tracking-[-0.03em] tabular-nums sm:text-2xl">{stat.value}</span>
          <span className="text-[12px] text-secondary sm:text-[13px]">{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}
