import { PAYMENT_APP_TAG } from "@/config/plans";
import { isValidWebhookSignature } from "@/lib/payments/razorpay";
import { webhookEventSchema } from "@/lib/validations/payments";
import { grantPurchase, isKnownPurchase, markPurchaseFailed, revokePurchase } from "@/services/payment.service";

const GRANT_EVENTS = new Set(["payment.captured", "order.paid"]);

const ok = () => Response.json({ ok: true });

function belongsToApp(notes: unknown) {
  return Boolean(notes && typeof notes === "object" && (notes as Record<string, unknown>).app === PAYMENT_APP_TAG);
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  if (!signature || !isValidWebhookSignature(rawBody, signature)) {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  let json: unknown;
  try {
    json = JSON.parse(rawBody);
  } catch {
    return ok();
  }
  const parsed = webhookEventSchema.safeParse(json);
  const payment = parsed.success ? parsed.data.payload.payment?.entity : undefined;
  if (!parsed.success || !payment || !belongsToApp(payment.notes)) return ok();

  const { event } = parsed.data;
  const orderId = payment.order_id ?? "";

  try {
    if (GRANT_EVENTS.has(event) && orderId && (await isKnownPurchase(orderId, payment.amount))) {
      await grantPurchase(orderId, payment.id);
    } else if (event === "payment.failed" && orderId) {
      await markPurchaseFailed(orderId);
    } else if (event === "refund.processed" && (payment.amount_refunded ?? 0) >= payment.amount) {
      await revokePurchase(payment.id);
    }
  } catch (error) {
    console.error("payment webhook failed", { event, orderId, error: error instanceof Error ? error.message : error });
    return Response.json({ error: "Retry later" }, { status: 500 });
  }

  console.info("payment webhook", { event, orderId });
  return ok();
}
