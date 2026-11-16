"use server";

import { routes } from "@/config/site";
import { checkoutCopy } from "@/content/pricing";
import { accountCopy } from "@/content/account";
import { getCurrentUser } from "@/lib/auth/dal";
import { env } from "@/lib/env";
import { actionRateLimit } from "@/lib/security/action-limit";
import { createOrderSchema } from "@/lib/validations/payments";
import { createPurchaseOrder } from "@/services/payment.service";

export type CheckoutOrder = {
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  prefill: { name: string; email: string };
};

export type CreateOrderResult = { ok: true; order: CheckoutOrder } | { ok: false; message: string; signIn?: string };

export async function createOrder(plan: string): Promise<CreateOrderResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, message: accountCopy.signedOut, signIn: routes.signIn };

  const parsed = createOrderSchema.safeParse({ plan: String(plan) });
  if (!parsed.success) return { ok: false, message: checkoutCopy.unavailable };

  const limited = await actionRateLimit("createOrder", user.id);
  if (limited) return { ok: false, message: limited };

  try {
    const order = await createPurchaseOrder(user.id, parsed.data.plan);
    return {
      ok: true,
      order: {
        keyId: env.razorpay.keyId,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        prefill: { name: user.name, email: user.email },
      },
    };
  } catch (error) {
    console.error("createOrder failed", error instanceof Error ? error.message : error);
    return { ok: false, message: checkoutCopy.unavailable };
  }
}
