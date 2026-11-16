import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { PLAN_TIERS } from "@/config/plans";
import { USER_ROLES } from "@/config/roles";
import { refreshModelInDev } from "@/lib/db/define-model";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, select: false },
    googleId: { type: String, unique: true, sparse: true },
    avatarUrl: { type: String },
    role: { type: String, enum: USER_ROLES, default: "user" },
    sessionVersion: { type: Number, default: 0 },
    limits: {
      files: { type: Number, default: null },
      ai: { type: Number, default: null },
    },
    plan: {
      type: new Schema(
        {
          tier: { type: String, enum: PLAN_TIERS, required: true },
          expiresAt: { type: Date, default: null },
        },
        { _id: false },
      ),
      default: undefined,
    },
  },
  { timestamps: true },
);

userSchema.index({ createdAt: -1 });

export type UserDocument = InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId;
};

refreshModelInDev("User");

export const User: Model<UserDocument> =
  (mongoose.models.User as Model<UserDocument>) ??
  mongoose.model<UserDocument>("User", userSchema);
