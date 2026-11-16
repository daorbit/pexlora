import { CalendarClock, CreditCard, Gauge } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { getUserUsage } from "@/lib/auth/usage";
import { StatCard, StatCardFallback } from "@/components/dashboard/StatCard";
import { UsageBar } from "@/components/dashboard/UsageBar";

export async function UsageOverview() {
  const user = await requireUser();
  const usage = await getUserUsage(user);
  const memberSince = new Date(user.memberSince).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        label="Files processed today"
        value={`${usage.used} / ${usage.limit}`}
        icon={Gauge}
        hint={<UsageBar used={usage.used} limit={usage.limit} />}
      />
      <StatCard
        label="Remaining today"
        value={String(usage.remaining)}
        icon={CalendarClock}
        hint="Resets at midnight UTC"
      />
      <StatCard label="Plan" value="Free" icon={CreditCard} hint={`Member since ${memberSince}`} />
    </div>
  );
}

export function UsageOverviewFallback() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCardFallback />
      <StatCardFallback />
      <StatCardFallback />
    </div>
  );
}
