import { routes } from "@/config/site";
import { shellCopy } from "@/content/dashboard";
import { billingCopy } from "@/content/pricing";
import { requireUser } from "@/lib/auth/dal";
import { hasProPerks } from "@/lib/auth/roles";
import { ButtonLink } from "@/components/ui/Button";
import { getUserUsage } from "@/lib/auth/usage";
import { UsageRing } from "@/components/dashboard/UsageRing";

const cardClasses = "flex items-center gap-3 rounded-2xl bg-background p-3";

export async function SidebarUsage() {
  const user = await requireUser();
  const { used, limit } = await getUserUsage(user);
  const left = Math.max(0, limit - used);

  return (
    <div className="flex flex-col gap-2">
      <div className={cardClasses}>
        <UsageRing used={used} limit={limit} />
        <div className="flex flex-col">
          <span className="text-sm font-semibold tabular-nums">{shellCopy.filesLeft(left)}</span>
          <span className="text-xs text-secondary">{shellCopy.ofToday(limit)}</span>
        </div>
      </div>
      {!hasProPerks(user) && (
        <ButtonLink href={routes.pricing} variant="primary" size="sm" className="w-full">
          {billingCopy.upgrade}
        </ButtonLink>
      )}
    </div>
  );
}

export function SidebarUsageFallback() {
  return (
    <div className={cardClasses}>
      <span className="size-9 animate-pulse rounded-full bg-fill" />
      <span className="h-8 flex-1 animate-pulse rounded-lg bg-fill" />
    </div>
  );
}
