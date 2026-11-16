import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { refreshModelInDev } from "@/lib/db/define-model";

const rateLimitSchema = new Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true, expires: 0 },
});

export type RateLimitDocument = InferSchemaType<typeof rateLimitSchema>;

refreshModelInDev("RateLimit");

export const RateLimit: Model<RateLimitDocument> =
  (mongoose.models.RateLimit as Model<RateLimitDocument>) ??
  mongoose.model<RateLimitDocument>("RateLimit", rateLimitSchema);
