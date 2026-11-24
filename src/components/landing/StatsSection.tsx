import { Suspense } from "react";
import { proofCopy, statsCopy } from "@/content/social-proof";
import { getFilesTotal, getRatingSummary } from "@/lib/stats/social-proof";
import { formatCount } from "@/lib/utils/format-count";
import { CountUp } from "@/components/ui/CountUp";
import { Band } from "@/components/ui/Band";
import { LiveFilesStat } from "@/components/landing/LiveFilesStat";

export async function StatsSection() {
  const [files, rating] = await Promise.all([getFilesTotal(), getRatingSummary()]);
  const stats = [
    { id: "tools", ...proofCopy.tools },
    files === null ? { id: "conversions", ...statsCopy.conversions } : { id: "files", value: formatCount(files), label: proofCopy.filesLabel },
    { id: "account", ...statsCopy.accountFiles },
    rating ? { id: "rating", value: rating.average.toFixed(1), label: statsCopy.ratingLabel } : { id: "price", ...statsCopy.price },
  ];

  return (
    <Band id="numbers" tone="ink" containerClassName="flex flex-col gap-6 sm:gap-10 lg:gap-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-mono text-[13px] text-tertiary">{statsCopy.eyebrow}</h2>
        <Suspense fallback={null}>
          <LiveFilesStat />
        </Suspense>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col gap-2 border-t border-border-strong pt-4 sm:gap-3 sm:pt-6">
            <dt className="order-2 text-[14px] text-secondary sm:text-[17px]">{stat.label}</dt>
            <dd className="order-1 text-[48px] leading-none font-extrabold tracking-[-0.06em] sm:text-[80px] lg:text-[104px]">
              <CountUp text={stat.value} />
            </dd>
          </div>
        ))}
      </dl>
    </Band>
  );
}
