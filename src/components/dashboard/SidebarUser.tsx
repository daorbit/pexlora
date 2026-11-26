import Link from "next/link";
import { Settings } from "lucide-react";
import { routes } from "@/config/site";
import { shellCopy } from "@/content/dashboard";
import { requireUser } from "@/lib/auth/dal";
import { PlanAvatar } from "@/components/plan/PlanAvatar";

const rowClasses = "flex items-center gap-2.5 rounded-xl p-1.5";

export async function SidebarUser() {
  const user = await requireUser();

  return (
    <Link href={routes.dashboardSettings} aria-label={shellCopy.settings} className={`${rowClasses} transition-colors hover:bg-fill`}>
      <PlanAvatar name={user.name} avatarUrl={user.avatarUrl} plan={user.plan} size="sm" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{user.name}</span>
        <span className="block truncate text-xs text-secondary">{user.email}</span>
      </span>
      <Settings className="size-4 shrink-0 text-secondary" aria-hidden />
    </Link>
  );
}

export function SidebarUserFallback() {
  return (
    <div className={rowClasses}>
      <span className="size-8 animate-pulse rounded-full bg-fill" />
      <span className="h-8 flex-1 animate-pulse rounded-lg bg-fill" />
    </div>
  );
}
