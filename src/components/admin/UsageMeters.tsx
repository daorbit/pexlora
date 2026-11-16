import { adminCopy } from "@/content/admin";
import type { AdminUser } from "@/services/admin.service";
import { UsageBar } from "@/components/dashboard/UsageBar";
import { UsageCount } from "@/components/admin/UserBadges";

function Meter({ label, used, limit, custom }: { label: string; used: number; limit: number; custom: boolean }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl bg-subtle p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-medium text-secondary">{label}</p>
        <span className="text-[11px] font-medium text-tertiary uppercase">
          {custom ? adminCopy.limits.custom : adminCopy.limits.default}
        </span>
      </div>
      <p className="text-2xl font-semibold tracking-[-0.02em]">
        <UsageCount used={used} limit={limit} />
      </p>
      <UsageBar used={used} limit={limit} />
    </div>
  );
}

export function UsageMeters({ user }: { user: AdminUser }) {
  return (
    <div className="grid gap-3 px-5 pt-4 sm:grid-cols-2">
      <Meter label={adminCopy.usage.files} used={user.usage.files} limit={user.limits.files} custom={user.custom.files !== null} />
      <Meter label={adminCopy.usage.ai} used={user.usage.ai} limit={user.limits.ai} custom={user.custom.ai !== null} />
    </div>
  );
}
