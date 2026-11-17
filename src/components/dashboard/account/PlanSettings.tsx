import { formatPrice } from "@/config/plans";
import { routes } from "@/config/site";
import { billingCopy, planCopy } from "@/content/pricing";
import type { CurrentUser } from "@/lib/auth/dal";
import { formatDate } from "@/lib/utils/format-date";
import { listBillingHistory } from "@/services/payment.service";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";
import { SettingsRow } from "@/components/dashboard/SettingsRow";
import { ProBadge } from "@/components/plan/ProBadge";

export async function PlanSettings({ user }: { user: CurrentUser }) {
  const history = await listBillingHistory(user.id).catch(() => []);
  const { plan } = user;
  const lifetime = plan && plan.expiresAt === null;
  const planDescription = plan ? (plan.expiresAt ? billingCopy.until(formatDate(plan.expiresAt, "long")) : billingCopy.lifetime) : undefined;

  return (
    <SettingsPanel title={billingCopy.title}>
      <SettingsRow label={billingCopy.currentPlan} description={planDescription}>
        {plan ? <ProBadge plan={plan} href={routes.pricing} className="px-2 py-1 text-xs" /> : <Badge tone="success">{billingCopy.free}</Badge>}
        {!lifetime && (
          <ButtonLink href={routes.pricing} variant={plan ? "secondary" : "primary"} size="sm">
            {plan ? billingCopy.extend : billingCopy.upgrade}
          </ButtonLink>
        )}
      </SettingsRow>
      <SettingsRow label={billingCopy.dailyLimit} description={billingCopy.resets}>
        <span className="font-medium tabular-nums">{billingCopy.files(user.limits.files)}</span>
      </SettingsRow>
      <div className="flex flex-col gap-3 px-5 py-4">
        <p className="text-sm font-medium">{billingCopy.history}</p>
        {history.length ? (
          <ul className="flex flex-col divide-y divide-separator rounded-xl border border-separator">
            {history.map((entry) => (
              <li key={entry.id} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                <div className="flex min-w-0 flex-col">
                  <span className="font-medium">{planCopy[entry.plan].name}</span>
                  <span className="text-[13px] text-secondary">{formatDate(entry.paidAt, "long")}</span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="tabular-nums">{formatPrice(entry.amount)}</span>
                  <Badge tone={entry.status === "paid" ? "success" : "neutral"}>
                    {entry.status === "paid" ? billingCopy.paid : billingCopy.refunded}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[13px] text-secondary">{billingCopy.historyEmpty}</p>
        )}
      </div>
    </SettingsPanel>
  );
}
