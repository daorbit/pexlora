import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { refreshModelInDev } from "@/lib/db/define-model";

const platformTokenUseSchema = new Schema(
  {
    jti: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false },
);

platformTokenUseSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type PlatformTokenUseDocument = InferSchemaType<typeof platformTokenUseSchema>;

refreshModelInDev("PlatformTokenUse");

export const PlatformTokenUse: Model<PlatformTokenUseDocument> =
  (mongoose.models.PlatformTokenUse as Model<PlatformTokenUseDocument>) ??
  mongoose.model<PlatformTokenUseDocument>("PlatformTokenUse", platformTokenUseSchema);
