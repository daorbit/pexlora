import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { routes } from "@/config/site";
import { adminCopy } from "@/content/admin";
import { requireSuperAdmin } from "@/lib/auth/dal";
import { getAdminUser } from "@/services/admin.service";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";
import { AdminUserHeader } from "@/components/admin/AdminUserHeader";
import { DeleteUserForm } from "@/components/admin/DeleteUserForm";
import { LimitsForm } from "@/components/admin/LimitsForm";
import { ResetUsageForm } from "@/components/admin/ResetUsageForm";
import { RoleForm } from "@/components/admin/RoleForm";
import { UsageMeters } from "@/components/admin/UsageMeters";
import { SkeletonCard } from "@/components/ui/Skeleton";

export async function AdminUserView({ params }: { params: Promise<{ id: string }> }) {
  const [admin, { id }] = await Promise.all([requireSuperAdmin(), params]);
  const user = await getAdminUser(id);
  if (!user) notFound();

  const isSelf = user.id === admin.id;
  const roleLock = user.owner ? adminCopy.role.ownerLocked : undefined;
  const canDelete = !user.owner && !isSelf;

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <Link
        href={routes.dashboardAdmin}
        className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-secondary hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {adminCopy.back}
      </Link>

      <AdminUserHeader user={user} isSelf={isSelf} />

      <div className="grid items-start gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4 sm:gap-5">
          <SettingsPanel title={adminCopy.usage.title} description={adminCopy.usage.description}>
            <div>
              <UsageMeters user={user} />
              <ResetUsageForm userId={user.id} />
            </div>
          </SettingsPanel>
          <SettingsPanel title={adminCopy.limits.title} description={adminCopy.limits.description}>
            <LimitsForm userId={user.id} custom={user.custom} />
          </SettingsPanel>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5">
          <SettingsPanel title={adminCopy.role.title} description={adminCopy.role.description}>
            <RoleForm userId={user.id} role={user.role} lockedReason={roleLock} />
          </SettingsPanel>
          {canDelete && (
            <SettingsPanel title={adminCopy.danger.title} description={adminCopy.danger.description}>
              <DeleteUserForm userId={user.id} email={user.email} />
            </SettingsPanel>
          )}
        </div>
      </div>
    </div>
  );
}

export function AdminUserFallback() {
  return (
    <div className="flex flex-col gap-5">
      <SkeletonCard lines={2} />
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <SkeletonCard lines={6} />
        <SkeletonCard lines={3} />
      </div>
    </div>
  );
}
