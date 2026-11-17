import { formatPrice, type PurchaseStatus } from "@/config/plans";
import { adminCopy } from "@/content/admin";
import { planCopy } from "@/content/pricing";
import { formatDate } from "@/lib/utils/format-date";
import type { AdminPurchase } from "@/services/admin.service";
import { Badge } from "@/components/ui/Badge";

const copy = adminCopy.plan;

const statusTone: Record<PurchaseStatus, "success" | "neutral" | "danger" | "warning"> = {
  paid: "success",
  created: "neutral",
  failed: "danger",
  refunded: "warning",
};

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <span className="min-w-0">
      <span className="text-tertiary">{label}: </span>
      <span translate="no" className="notranslate font-mono break-all">
        {value}
      </span>
    </span>
  );
}

function PurchaseRow({ purchase }: { purchase: AdminPurchase }) {
  const dates = [
    `${copy.created} ${formatDate(purchase.createdAt)}`,
    purchase.paidAt && `${copy.paid} ${formatDate(purchase.paidAt)}`,
    purchase.refundedAt && `${copy.refunded} ${formatDate(purchase.refundedAt)}`,
  ].filter(Boolean);

  return (
    <li className="flex flex-col gap-2 px-4 py-3 text-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium">{planCopy[purchase.plan].name}</span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="tabular-nums">{formatPrice(purchase.amount)}</span>
          <Badge tone={statusTone[purchase.status]}>{copy.status[purchase.status]}</Badge>
        </span>
      </div>
      <div className="flex flex-col gap-1 text-[12px] text-secondary">
        <span>{dates.join(" · ")}</span>
        <Detail label={copy.order} value={purchase.orderId} />
        {purchase.paymentId && <Detail label={copy.payment} value={purchase.paymentId} />}
      </div>
    </li>
  );
}

export function AdminPurchasesList({ purchases }: { purchases: AdminPurchase[] }) {
  return (
    <div className="flex flex-col gap-3 px-5 py-4">
      <p className="text-sm font-medium">{copy.purchases}</p>
      {purchases.length ? (
        <ul className="flex flex-col divide-y divide-separator rounded-xl border border-separator">
          {purchases.map((purchase) => (
            <PurchaseRow key={purchase.id} purchase={purchase} />
          ))}
        </ul>
      ) : (
        <p className="text-[13px] text-secondary">{copy.empty}</p>
      )}
    </div>
  );
}
