import Link from "next/link";
import { Settings } from "lucide-react";
import { routes } from "@/config/site";
import { shellCopy } from "@/content/dashboard";
import { requireUser } from "@/lib/auth/dal";
import { cn } from "@/lib/utils/cn";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { whenCollapsed } from "@/components/dashboard/sidebar-styles";

const rowClasses = cn("flex items-center gap-2.5 rounded-xl p-1.5", whenCollapsed.centered);

export async function SidebarUser() {
  const user = await requireUser();

  return (
    <Link
      href={routes.dashboardSettings}
      data-tooltip={shellCopy.settings}
      aria-label={shellCopy.settings}
      className={cn(rowClasses, "transition-colors hover:bg-fill")}
    >
      <UserAvatar name={user.name} avatarUrl={user.avatarUrl} size="sm" />
      <span className={cn("min-w-0 flex-1", whenCollapsed.hidden)}>
        <span className="block truncate text-sm font-semibold">{user.name}</span>
        <span className="block truncate text-xs text-secondary">{user.email}</span>
      </span>
      <Settings className={cn("size-4 shrink-0 text-secondary", whenCollapsed.hidden)} aria-hidden />
    </Link>
  );
}

export function SidebarUserFallback() {
  return (
    <div className={rowClasses}>
      <span className="size-8 animate-pulse rounded-full bg-fill" />
      <span className={cn("h-8 flex-1 animate-pulse rounded-lg bg-fill", whenCollapsed.hidden)} />
    </div>
  );
}
