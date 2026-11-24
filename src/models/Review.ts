import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { MAX_RATING, REVIEW_STATUSES, REVIEW_TEXT_LIMITS } from "@/config/reviews";
import { refreshModelInDev } from "@/lib/db/define-model";

const reviewSchema = new Schema(
  {
    submissionKey: { type: String, required: true, unique: true, select: false },
    tool: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: MAX_RATING },
    comment: { type: String, default: "", maxlength: REVIEW_TEXT_LIMITS.comment },
    name: { type: String, default: "", maxlength: REVIEW_TEXT_LIMITS.name },
    consent: { type: Boolean, default: false },
    status: { type: String, enum: REVIEW_STATUSES, default: "pending" },
  },
  { timestamps: true },
);

reviewSchema.index({ status: 1, createdAt: -1 });

export type ReviewDocument = InferSchemaType<typeof reviewSchema> & {
  _id: mongoose.Types.ObjectId;
};

refreshModelInDev("Review");

export const Review: Model<ReviewDocument> =
  (mongoose.models.Review as Model<ReviewDocument>) ?? mongoose.model<ReviewDocument>("Review", reviewSchema);
