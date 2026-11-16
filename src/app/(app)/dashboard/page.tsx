import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardGreeting } from "@/components/dashboard/DashboardGreeting";
import { ModuleGrid } from "@/components/dashboard/ModuleGrid";
import { overviewCopy } from "@/content/dashboard";
import { PageHeaderFallback } from "@/components/dashboard/PageHeader";
import { QuickLinks } from "@/components/dashboard/QuickLinks";
import { UsageOverview, UsageOverviewFallback } from "@/components/dashboard/UsageOverview";

export const metadata: Metadata = { title: "Overview" };

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      <Suspense fallback={<PageHeaderFallback />}>
        <DashboardGreeting />
      </Suspense>
      <Suspense fallback={<UsageOverviewFallback />}>
        <UsageOverview />
      </Suspense>
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold">{overviewCopy.toolsTitle}</h2>
        <ModuleGrid />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-base font-semibold">{overviewCopy.quickLinksTitle}</h2>
        <QuickLinks />
      </section>
    </div>
  );
}
