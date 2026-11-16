import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { refreshModelInDev } from "@/lib/db/define-model";

const TWO_DAYS_IN_SECONDS = 60 * 60 * 48;

const usageSchema = new Schema({
  key: { type: String, required: true },
  day: { type: String, required: true },
  count: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now, expires: TWO_DAYS_IN_SECONDS },
});

usageSchema.index({ key: 1, day: 1 }, { unique: true });

export type UsageDocument = InferSchemaType<typeof usageSchema>;

refreshModelInDev("Usage");

export const Usage: Model<UsageDocument> =
  (mongoose.models.Usage as Model<UsageDocument>) ??
  mongoose.model<UsageDocument>("Usage", usageSchema);
