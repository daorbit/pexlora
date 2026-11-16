import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { refreshModelInDev } from "@/lib/db/define-model";

const passwordResetSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true, expires: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export type PasswordResetDocument = InferSchemaType<typeof passwordResetSchema>;

refreshModelInDev("PasswordReset");

export const PasswordReset: Model<PasswordResetDocument> =
  (mongoose.models.PasswordReset as Model<PasswordResetDocument>) ??
  mongoose.model<PasswordResetDocument>("PasswordReset", passwordResetSchema);
