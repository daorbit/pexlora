import { z } from "zod";
import { PLAN_IDS } from "@/config/plans";

const razorpayId = (prefix: string) => z.string().trim().regex(new RegExp(`^${prefix}_[A-Za-z0-9]{6,40}$`));

export const createOrderSchema = z.object({ plan: z.enum(PLAN_IDS) });

export const verifyPaymentSchema = z.object({
  orderId: razorpayId("order"),
  paymentId: razorpayId("pay"),
  signature: z.string().trim().regex(/^[a-f0-9]{64}$/),
});

const paymentEntity = z.object({
  id: z.string(),
  order_id: z.string().nullable().optional(),
  amount: z.number(),
  amount_refunded: z.number().optional(),
  notes: z.union([z.record(z.string(), z.unknown()), z.array(z.unknown())]).optional(),
});

export const webhookEventSchema = z.object({
  event: z.string(),
  payload: z.object({ payment: z.object({ entity: paymentEntity }).optional() }),
});
