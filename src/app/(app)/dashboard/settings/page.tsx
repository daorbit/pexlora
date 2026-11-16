import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountSettings } from "@/components/dashboard/AccountSettings";
import { SkeletonCard } from "@/components/ui/Skeleton";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <Suspense fallback={<SkeletonCard lines={4} className="min-h-60" />}>
        <AccountSettings />
      </Suspense>
    </div>
  );
}
