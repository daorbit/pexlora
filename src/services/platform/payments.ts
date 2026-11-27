import "server-only";
import type { Types } from "mongoose";
import { PURCHASE_STATUSES, type PurchaseStatus } from "@/config/plans";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Purchase } from "@/models/Purchase";
import { User } from "@/models/User";
import { cursorFilter, iso, nextCursor, pageSize, planName } from "@/services/platform/present";

type PurchaseRow = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  plan: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string | null;
  status: PurchaseStatus;
  paidAt?: Date | null;
  createdAt: Date;
};

export async function listPlatformPayments(options: { status: string | null; cursor: string | null; limit: string | null; userId?: string }) {
  if (options.status && !PURCHASE_STATUSES.includes(options.status as PurchaseStatus)) return { items: [], nextCursor: null };
  await connectToDatabase();
  const limit = pageSize(options.limit);
  const filter: Record<string, unknown> = { ...cursorFilter(options.cursor) };
  if (options.status) filter.status = options.status;
  if (options.userId) filter.userId = options.userId;

  const rows = await Purchase.find(filter)
    .sort({ _id: -1 })
    .limit(limit + 1)
    .select("userId plan amount currency razorpayOrderId razorpayPaymentId status paidAt createdAt")
    .lean<PurchaseRow[]>();
  const page = rows.slice(0, limit);

  const ids = [...new Set(page.map((row) => String(row.userId)))];
  const users = ids.length ? await User.find({ _id: { $in: ids } }).select("email").lean() : [];
  const emails = new Map(users.map((user) => [String(user._id), user.email]));

  return {
    items: page.map((row) => ({
      id: `pass:${String(row._id)}`,
      kind: "pass" as const,
      description: planName(row.plan),
      gateway: "razorpay",
      orderId: row.razorpayOrderId,
      gatewayPaymentId: row.razorpayPaymentId ?? null,
      status: row.status,
      amountMinor: row.amount,
      currency: row.currency,
      userId: String(row.userId),
      userEmail: emails.get(String(row.userId)) ?? "",
      subjectId: String(row.userId),
      invoiceNumber: null,
      paidAt: iso(row.paidAt),
      createdAt: iso(row.createdAt) as string,
    })),
    nextCursor: nextCursor(rows, limit),
  };
}
