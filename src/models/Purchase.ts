import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { PLAN_IDS, PURCHASE_STATUSES } from "@/config/plans";
import { refreshModelInDev } from "@/lib/db/define-model";

const purchaseSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    plan: { type: String, enum: PLAN_IDS, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String, unique: true, sparse: true },
    status: { type: String, enum: PURCHASE_STATUSES, default: "created" },
    paidAt: { type: Date, default: null },
    refundedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

purchaseSchema.index({ status: 1, createdAt: -1 });

export type PurchaseDocument = InferSchemaType<typeof purchaseSchema> & {
  _id: mongoose.Types.ObjectId;
};

refreshModelInDev("Purchase");

export const Purchase: Model<PurchaseDocument> =
  (mongoose.models.Purchase as Model<PurchaseDocument>) ??
  mongoose.model<PurchaseDocument>("Purchase", purchaseSchema);
