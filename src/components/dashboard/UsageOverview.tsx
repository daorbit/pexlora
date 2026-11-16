import { CalendarClock, CreditCard, Gauge } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { getUserUsage } from "@/lib/auth/usage";
import { StatCard, StatCardFallback } from "@/components/dashboard/StatCard";

function UsageBar({ used, limit }: { used: number; limit: number }) {
  const percent = Math.min(100, Math.round((used / limit) * 100));
  return (
    <progress
      value={percent}
      max={100}
      aria-label={`${percent}% of daily limit used`}
      className="h-1.5 w-full appearance-none overflow-hidden rounded-full [&::-moz-progress-bar]:bg-foreground [&::-webkit-progress-bar]:bg-fill [&::-webkit-progress-value]:bg-foreground"
    />
  );
}

export async function UsageOverview() {
  const user = await requireUser();
  const usage = await getUserUsage(user.id);
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
