import { FileImage, Gem, IndianRupee, MessageSquareText, ShieldCheck, Users } from "lucide-react";
import { formatPrice } from "@/config/plans";
import { adminCopy } from "@/content/admin";
import type { AdminStatsData } from "@/services/admin.service";
import { StatCard, StatCardFallback } from "@/components/dashboard/StatCard";

const STAT_COUNT = 6;

const formatCount = (value: number) => value.toLocaleString("en-US");

export function AdminStats({ stats }: { stats: AdminStatsData }) {
  const copy = adminCopy.stats;
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      <StatCard label={copy.totalUsers} value={formatCount(stats.totalUsers)} icon={Users} hint={copy.newThisWeek(stats.newThisWeek)} />
      <StatCard label={copy.proMembers} value={formatCount(stats.proMembers)} icon={Gem} hint={copy.proHint} />
      <StatCard
        label={copy.revenue}
        value={formatPrice(stats.revenue)}
        icon={IndianRupee}
        hint={copy.revenueHint(stats.paidPurchases, stats.refundedPurchases)}
      />
      <StatCard label={copy.superAdmins} value={formatCount(stats.superAdmins)} icon={ShieldCheck} />
      <StatCard label={copy.filesToday} value={formatCount(stats.filesToday)} icon={FileImage} hint={copy.filesHint} />
      <StatCard label={copy.aiToday} value={formatCount(stats.aiToday)} icon={MessageSquareText} hint={copy.aiHint} />
    </div>
  );
}

export function AdminStatsFallback() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {Array.from({ length: STAT_COUNT }, (_, index) => (
        <StatCardFallback key={index} />
      ))}
    </div>
  );
}
