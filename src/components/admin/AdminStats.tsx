import { FileImage, MessageSquareText, ShieldCheck, Users } from "lucide-react";
import { adminCopy } from "@/content/admin";
import { StatCard, StatCardFallback } from "@/components/dashboard/StatCard";

type AdminStatsProps = {
  stats: { totalUsers: number; newThisWeek: number; superAdmins: number; filesToday: number; aiToday: number };
};

const formatCount = (value: number) => value.toLocaleString("en-US");

export function AdminStats({ stats }: AdminStatsProps) {
  const copy = adminCopy.stats;
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <StatCard label={copy.totalUsers} value={formatCount(stats.totalUsers)} icon={Users} hint={copy.newThisWeek(stats.newThisWeek)} />
      <StatCard label={copy.superAdmins} value={formatCount(stats.superAdmins)} icon={ShieldCheck} />
      <StatCard label={copy.filesToday} value={formatCount(stats.filesToday)} icon={FileImage} hint={copy.filesHint} />
      <StatCard label={copy.aiToday} value={formatCount(stats.aiToday)} icon={MessageSquareText} hint={copy.aiHint} />
    </div>
  );
}

export function AdminStatsFallback() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <StatCardFallback key={index} />
      ))}
    </div>
  );
}
