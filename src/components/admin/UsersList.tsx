import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { adminUserPath } from "@/config/admin";
import { adminCopy } from "@/content/admin";
import { formatDate } from "@/lib/utils/format-date";
import type { AdminUser } from "@/services/admin.service";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { PlanBadge, RoleBadge, SignInMethods, UsageCount } from "@/components/admin/UserBadges";

type UsersListProps = { users: AdminUser[]; currentUserId: string };

const columns = adminCopy.users.columns;

function UserIdentity({ user, isYou }: { user: AdminUser; isYou: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <UserAvatar name={user.name} avatarUrl={user.avatarUrl} size="md" />
      <span className="min-w-0">
        <span className="flex items-center gap-1.5">
          <span className="truncate text-sm font-semibold">{user.name}</span>
          {isYou && <Badge>{adminCopy.you}</Badge>}
        </span>
        <span className="block truncate text-[13px] text-secondary">{user.email}</span>
      </span>
    </span>
  );
}

function MobileUserCard({ user, isYou }: { user: AdminUser; isYou: boolean }) {
  return (
    <Link href={adminUserPath(user.id)} className="flex flex-col gap-3 px-4 py-3.5 transition-colors hover:bg-fill">
      <span className="flex items-center gap-2">
        <span className="min-w-0 flex-1">
          <UserIdentity user={user} isYou={isYou} />
        </span>
        <ChevronRight className="size-4 shrink-0 text-tertiary" aria-hidden />
      </span>
      <span className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-secondary">
        <RoleBadge role={user.role} owner={user.owner} />
        <PlanBadge plan={user.plan} lapsed={user.lapsedPlan} />
        <span>
          {columns.files}: <UsageCount used={user.usage.files} limit={user.limits.files} />
        </span>
        <span>
          {columns.ai}: <UsageCount used={user.usage.ai} limit={user.limits.ai} />
        </span>
      </span>
    </Link>
  );
}

export function UsersList({ users, currentUserId }: UsersListProps) {
  if (!users.length) {
    return (
      <Card className="px-5 py-10 text-center text-sm text-secondary">{adminCopy.users.empty}</Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <ul className="divide-y divide-separator md:hidden">
        {users.map((user) => (
          <li key={user.id}>
            <MobileUserCard user={user} isYou={user.id === currentUserId} />
          </li>
        ))}
      </ul>
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="border-b border-separator text-xs font-medium text-tertiary">
          <tr>
            <th scope="col" className="px-5 py-3 font-medium">{columns.user}</th>
            <th scope="col" className="px-3 py-3 font-medium">{columns.role}</th>
            <th scope="col" className="px-3 py-3 font-medium">{columns.plan}</th>
            <th scope="col" className="hidden px-3 py-3 font-medium xl:table-cell">{columns.signIn}</th>
            <th scope="col" className="px-3 py-3 font-medium">{columns.files}</th>
            <th scope="col" className="px-3 py-3 font-medium">{columns.ai}</th>
            <th scope="col" className="hidden px-3 py-3 font-medium lg:table-cell">{columns.joined}</th>
            <th scope="col" className="px-5 py-3">
              <span className="sr-only">{adminCopy.users.manage}</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-separator">
          {users.map((user) => (
            <tr key={user.id} className="transition-colors hover:bg-fill">
              <td className="max-w-72 px-5 py-3">
                <UserIdentity user={user} isYou={user.id === currentUserId} />
              </td>
              <td className="px-3 py-3">
                <RoleBadge role={user.role} owner={user.owner} />
              </td>
              <td className="px-3 py-3">
                <PlanBadge plan={user.plan} lapsed={user.lapsedPlan} />
              </td>
              <td className="hidden px-3 py-3 xl:table-cell">
                <SignInMethods hasGoogle={user.hasGoogle} hasPassword={user.hasPassword} />
              </td>
              <td className="px-3 py-3">
                <UsageCount used={user.usage.files} limit={user.limits.files} />
              </td>
              <td className="px-3 py-3">
                <UsageCount used={user.usage.ai} limit={user.limits.ai} />
              </td>
              <td className="hidden px-3 py-3 text-secondary lg:table-cell">{formatDate(user.joined)}</td>
              <td className="px-5 py-3 text-right">
                <Link
                  href={adminUserPath(user.id)}
                  className="inline-flex items-center gap-1 text-[13px] font-semibold text-foreground hover:underline"
                >
                  {adminCopy.users.manage}
                  <ChevronRight className="size-3.5" aria-hidden />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
