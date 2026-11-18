import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardGreeting } from "@/components/dashboard/DashboardGreeting";
import { OverviewTools } from "@/components/dashboard/overview/OverviewTools";
import { UsageCard, UsageCardFallback } from "@/components/dashboard/overview/UsageCard";
import { SkeletonCard } from "@/components/ui/Skeleton";

export const metadata: Metadata = { title: "Overview" };

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-7 sm:gap-10">
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Suspense fallback={<SkeletonCard lines={3} className="min-h-60" />}>
          <DashboardGreeting />
        </Suspense>
        <Suspense fallback={<UsageCardFallback />}>
          <UsageCard />
        </Suspense>
      </div>
      <OverviewTools />
    </div>
  );
}
