import "server-only";
import { isValidObjectId } from "mongoose";
import { ADMIN_REVIEWS_SHOWN, REVIEW_EDIT_MINUTES, type ReviewStatus } from "@/config/reviews";
import type { WorkspaceToolSlug } from "@/config/tools";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Review, type ReviewDocument } from "@/models/Review";

export type ReviewItem = {
  id: string;
  tool: string;
  rating: number;
  comment: string;
  name: string;
  consent: boolean;
  status: ReviewStatus;
  createdAt: string;
};

export type RatingTotals = { average: number; count: number };

const EDIT_WINDOW_MS = REVIEW_EDIT_MINUTES * 60 * 1000;
const WITH_COMMENT = { comment: { $ne: "" } };
const PUBLISHED = { ...WITH_COMMENT, status: "published" as const, consent: true };

function toItem(review: ReviewDocument): ReviewItem {
  return {
    id: review._id.toString(),
    tool: review.tool,
    rating: review.rating,
    comment: review.comment,
    name: review.name,
    consent: review.consent,
    status: review.status,
    createdAt: new Date(review.createdAt).toISOString(),
  };
}

export async function saveRating(rating: { key: string; tool: WorkspaceToolSlug; rating: number }) {
  await connectToDatabase();
  await Review.updateOne(
    { submissionKey: rating.key },
    { $setOnInsert: { tool: rating.tool, rating: rating.rating } },
    { upsert: true },
  );
}

export async function saveReviewComment(review: { key: string; comment: string; name: string; consent: boolean }) {
  await connectToDatabase();
  const { matchedCount } = await Review.updateOne(
    { submissionKey: review.key, comment: "", createdAt: { $gte: new Date(Date.now() - EDIT_WINDOW_MS) } },
    { $set: { comment: review.comment, name: review.name, consent: review.consent } },
  );
  return matchedCount > 0;
}

export async function getRatingTotals(): Promise<RatingTotals> {
  await connectToDatabase();
  const [totals] = await Review.aggregate<RatingTotals>([
    { $group: { _id: null, average: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);
  return { average: totals?.average ?? 0, count: totals?.count ?? 0 };
}

export async function listPublishedReviews(limit: number) {
  await connectToDatabase();
  const reviews = await Review.find(PUBLISHED).sort({ createdAt: -1 }).limit(limit).lean<ReviewDocument[]>();
  return reviews.map(toItem);
}

export async function listAdminReviews() {
  await connectToDatabase();
  const reviews = await Review.find().sort({ createdAt: -1 }).limit(ADMIN_REVIEWS_SHOWN).lean<ReviewDocument[]>();
  return reviews.map(toItem);
}

export async function countReviewsToCheck() {
  await connectToDatabase();
  return Review.countDocuments({ ...WITH_COMMENT, status: "pending" });
}

export async function publishReview(id: string) {
  if (!isValidObjectId(id)) return false;
  await connectToDatabase();
  const { matchedCount } = await Review.updateOne({ _id: id, ...WITH_COMMENT, consent: true }, { $set: { status: "published" } });
  return matchedCount > 0;
}

export async function hideReview(id: string) {
  if (!isValidObjectId(id)) return false;
  await connectToDatabase();
  const { matchedCount } = await Review.updateOne({ _id: id }, { $set: { status: "hidden" } });
  return matchedCount > 0;
}

export async function deleteHiddenReview(id: string) {
  if (!isValidObjectId(id)) return false;
  await connectToDatabase();
  const { deletedCount } = await Review.deleteOne({ _id: id, status: "hidden" });
  return deletedCount > 0;
}
