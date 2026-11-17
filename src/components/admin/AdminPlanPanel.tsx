import { adminCopy } from "@/content/admin";
import { hasProPerks } from "@/lib/auth/roles";
import { perksFor } from "@/lib/plan/perks";
import { formatDate } from "@/lib/utils/format-date";
import { formatMegabytes } from "@/lib/utils/format-bytes";
import { listAdminPurchases, type AdminUser } from "@/services/admin.service";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";
import { SettingsRow } from "@/components/dashboard/SettingsRow";
import { AdminPurchasesList } from "@/components/admin/AdminPurchasesList";
import { PlanBadge } from "@/components/admin/UserBadges";

const copy = adminCopy.plan;

function planDescription(user: AdminUser) {
  if (!user.plan) return user.lapsedPlan ? copy.lapsed : undefined;
  return user.plan.expiresAt ? copy.until(formatDate(user.plan.expiresAt, "long")) : copy.lifetime;
}

function perksLabel(user: AdminUser) {
  if (user.plan) return copy.perksPro;
  return user.role === "super_admin" ? copy.perksAdmin : copy.perksFree;
}

export async function AdminPlanPanel({ user }: { user: AdminUser }) {
  const purchases = await listAdminPurchases(user.id).catch(() => []);
  const perks = perksFor(hasProPerks(user));
  const sizes = perks.localSizeLimitsMb;

  return (
    <SettingsPanel title={copy.title} description={copy.description}>
      <SettingsRow label={copy.current} description={planDescription(user)}>
        <PlanBadge plan={user.plan} lapsed={user.lapsedPlan} />
      </SettingsRow>
      <SettingsRow
        label={copy.perks}
        description={copy.sizes(
          formatMegabytes(sizes.image),
          formatMegabytes(sizes.pdf),
          formatMegabytes(sizes.audio),
          formatMegabytes(sizes.video),
        )}
      >
        <span className="flex flex-col items-start gap-0.5 sm:items-end">
          <span className="font-medium">{perksLabel(user)}</span>
          <span className="text-[13px] text-secondary">
            {copy.perBatch(perks.filesPerBatch)} · {copy.parallel(perks.parallelJobs)}
          </span>
        </span>
      </SettingsRow>
      <AdminPurchasesList purchases={purchases} />
    </SettingsPanel>
  );
}
