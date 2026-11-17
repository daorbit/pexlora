import { CreditCard } from "lucide-react";
import { authCopy } from "@/content/auth";
import { planCopy } from "@/content/pricing";
import { checkoutIntentFrom } from "@/lib/payments/checkout-intent";

export function CheckoutIntentNote({ next }: { next: string | null | undefined }) {
  const plan = checkoutIntentFrom(next);
  if (!plan) return null;

  return (
    <p className="flex items-start gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-3 text-[13px] leading-snug text-secondary">
      <CreditCard className="mt-px size-4 shrink-0 text-foreground" aria-hidden />
      <span>{authCopy.checkoutIntent(planCopy[plan].name)}</span>
    </p>
  );
}
