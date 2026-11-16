import { checkoutCopy } from "@/content/pricing";
import { ApiError, withApiErrors } from "@/lib/api/errors";
import { assertApiRateLimit } from "@/lib/api/quota";
import { getSession } from "@/lib/auth/session";
import { isValidPaymentSignature } from "@/lib/payments/razorpay";
import { verifyPaymentSchema } from "@/lib/validations/payments";
import { grantPurchase } from "@/services/payment.service";
import { usageKeys } from "@/services/usage.service";

export const POST = withApiErrors(async (request) => {
  const session = await getSession();
  if (!session) throw new ApiError(checkoutCopy.failed, 401);
  await assertApiRateLimit(request, "verifyPayment", usageKeys.user(session.userId));

  const parsed = verifyPaymentSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) throw new ApiError(checkoutCopy.failed, 400);

  const { orderId, paymentId, signature } = parsed.data;
  if (!isValidPaymentSignature(orderId, paymentId, signature)) throw new ApiError(checkoutCopy.failed, 400);

  const result = await grantPurchase(orderId, paymentId, session.userId);
  if (!result.ok) throw new ApiError(checkoutCopy.pending, 409);

  console.info("payment verified", { orderId, paymentId });
  return Response.json(
    { expiresAt: result.expiresAt ? result.expiresAt.toISOString() : null },
    { headers: { "Cache-Control": "no-store" } },
  );
});
