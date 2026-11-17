import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountSettings } from "@/components/dashboard/AccountSettings";
import { AccountSettingsSkeleton } from "@/components/dashboard/AccountSettingsSkeleton";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <Suspense fallback={<AccountSettingsSkeleton />}>
        <AccountSettings />
      </Suspense>
    </div>
  );
}
