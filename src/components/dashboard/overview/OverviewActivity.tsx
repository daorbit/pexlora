"use client";

import { overviewCopy } from "@/content/dashboard";
import { useRecentResults } from "@/hooks/useRecentResults";
import { ActivityStats } from "@/components/dashboard/overview/ActivityStats";
import { OverviewSection } from "@/components/dashboard/overview/OverviewSection";
import { RecentFilesCard } from "@/components/dashboard/overview/RecentFilesCard";
import { RecentToolsCard } from "@/components/dashboard/overview/RecentToolsCard";

export function OverviewActivity() {
  const { results } = useRecentResults();

  return (
    <OverviewSection title={overviewCopy.activity.title} description={overviewCopy.activity.description}>
      <ActivityStats results={results} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <RecentFilesCard results={results} />
        <RecentToolsCard />
      </div>
    </OverviewSection>
  );
}
