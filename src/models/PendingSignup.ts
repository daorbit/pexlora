import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { refreshModelInDev } from "@/lib/db/define-model";

const pendingSignupSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  passwordHash: { type: String, required: true },
  codeHash: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  sends: { type: Number, default: 1 },
  lastSentAt: { type: Date, required: true },
  codeExpiresAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true, expires: 0 },
});

export type PendingSignupDocument = InferSchemaType<typeof pendingSignupSchema>;

refreshModelInDev("PendingSignup");

export const PendingSignup: Model<PendingSignupDocument> =
  (mongoose.models.PendingSignup as Model<PendingSignupDocument>) ??
  mongoose.model<PendingSignupDocument>("PendingSignup", pendingSignupSchema);
