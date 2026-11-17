import type { ReactNode } from "react";
import { adminCopy } from "@/content/admin";
import { formatDate } from "@/lib/utils/format-date";
import type { AdminUser } from "@/services/admin.service";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { PlanBadge, RoleBadge, SignInMethods } from "@/components/admin/UserBadges";

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="text-xs font-medium text-tertiary">{label}</dt>
      <dd className="text-sm">{children}</dd>
    </div>
  );
}

export function AdminUserHeader({ user, isSelf }: { user: AdminUser; isSelf: boolean }) {
  return (
    <Card className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      <div className="flex min-w-0 items-center gap-4">
        <UserAvatar name={user.name} avatarUrl={user.avatarUrl} size="lg" />
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="flex min-w-0 items-center gap-2 text-xl font-semibold tracking-[-0.02em]">
            <span className="truncate">{user.name}</span>
            {isSelf && <Badge>{adminCopy.you}</Badge>}
          </h2>
          <p className="truncate text-sm text-secondary">{user.email}</p>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-separator pt-5 sm:grid-cols-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
        <Fact label={adminCopy.role.title}>
          <RoleBadge role={user.role} owner={user.owner} />
        </Fact>
        <Fact label={adminCopy.plan.current}>
          <PlanBadge plan={user.plan} lapsed={user.lapsedPlan} />
        </Fact>
        <Fact label={adminCopy.profile.joined}>{formatDate(user.joined, "long")}</Fact>
        <Fact label={adminCopy.profile.signIn}>
          <SignInMethods hasGoogle={user.hasGoogle} hasPassword={user.hasPassword} />
        </Fact>
      </dl>
    </Card>
  );
}
