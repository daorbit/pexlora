"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder, type CheckoutOrder } from "@/actions/payments";
import { brandAssets, brandColors } from "@/config/brand";
import type { PlanId } from "@/config/plans";
import { routes, siteConfig } from "@/config/site";
import { checkoutCopy, planCopy } from "@/content/pricing";
import { checkoutReturnPath } from "@/lib/payments/checkout-intent";
import { loadCheckoutLogo, loadRazorpayCheckout, type RazorpaySuccess } from "@/lib/payments/checkout-script";
import { celebrate } from "@/lib/celebrate/store";
import { toast } from "@/lib/toast/store";
import { withNextParam } from "@/lib/url/next-path";
import type { ProWelcome } from "@/components/pricing/ProWelcomeDialog";
import { verifyPayment } from "@/services/payment-api";

export function useCheckout() {
  const router = useRouter();
  const [pendingPlan, setPendingPlan] = useState<PlanId | null>(null);
  const [welcome, setWelcome] = useState<ProWelcome | null>(null);
  const closeWelcome = useCallback(() => setWelcome(null), []);

  const confirm = useCallback(
    async (plan: PlanId, response: RazorpaySuccess) => {
      try {
        const expiresAt = await verifyPayment({
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });
        setWelcome({ plan, expiresAt });
        celebrate();
        router.refresh();
      } catch {
        toast.info(checkoutCopy.pending);
        router.push(routes.dashboardSettings);
      } finally {
        setPendingPlan(null);
      }
    },
    [router],
  );

  const open = useCallback(
    async (plan: PlanId, order: CheckoutOrder) => {
      const [Razorpay, image] = await Promise.all([
        loadRazorpayCheckout().catch(() => null),
        loadCheckoutLogo(brandAssets.appleTouchIcon),
      ]);
      if (!Razorpay) {
        setPendingPlan(null);
        toast.error(checkoutCopy.loadFailed);
        return;
      }
      const checkout = new Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: siteConfig.name,
        description: checkoutCopy.description(planCopy[plan].name),
        image,
        prefill: order.prefill,
        theme: { color: brandColors.night },
        handler: (response: RazorpaySuccess) => confirm(plan, response),
        modal: { ondismiss: () => setPendingPlan(null) },
      });
      checkout.on("payment.failed", () => toast.error(checkoutCopy.failed));
      checkout.open();
    },
    [confirm],
  );

  const buy = useCallback(
    async (plan: PlanId) => {
      setPendingPlan(plan);
      const result = await createOrder(plan);
      if (result.ok) return open(plan, result.order);
      setPendingPlan(null);
      if (result.signIn) return router.push(withNextParam(result.signIn, checkoutReturnPath(plan)));
      toast.error(result.message);
    },
    [open, router],
  );

  return { buy, pendingPlan, welcome, closeWelcome };
}
