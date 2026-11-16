import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountSettings } from "@/components/dashboard/AccountSettings";
import { UsageOverviewFallback } from "@/components/dashboard/UsageOverview";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <Suspense fallback={<UsageOverviewFallback />}>
        <AccountSettings />
      </Suspense>
    </div>
  );
}
