import "server-only";
import { isValidObjectId } from "mongoose";
import {
  ADMIN_REVIEW_FILTERS,
  ADMIN_REVIEWS_PAGE_SIZE,
  REVIEW_EDIT_MINUTES,
  type AdminReviewFilter,
  type ReviewStatus,
} from "@/config/reviews";
import type { WorkspaceToolSlug } from "@/config/tools";
import { connectToDatabase } from "@/lib/db/mongoose";
import type { ReviewIntent } from "@/lib/validations/reviews";
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
  const reviews = await Review.find(PUBLISHED).sort({ rating: -1, createdAt: -1 }).limit(limit).lean<ReviewDocument[]>();
  return reviews.map(toItem);
}

const filterQueries: Record<AdminReviewFilter, Record<string, unknown>> = {
  all: {},
  pending: { ...WITH_COMMENT, status: "pending" },
  published: { status: "published" },
  hidden: { status: "hidden" },
};

export async function listAdminReviews({ filter, page }: { filter: AdminReviewFilter; page: number }) {
  await connectToDatabase();
  const query = filterQueries[filter];
  const total = await Review.countDocuments(query);
  const pageCount = Math.max(1, Math.ceil(total / ADMIN_REVIEWS_PAGE_SIZE));
  const current = Math.min(Math.max(1, page), pageCount);
  const reviews = await Review.find(query)
    .sort({ createdAt: -1 })
    .skip((current - 1) * ADMIN_REVIEWS_PAGE_SIZE)
    .limit(ADMIN_REVIEWS_PAGE_SIZE)
    .lean<ReviewDocument[]>();
  return { reviews: reviews.map(toItem), total, page: current, pageCount };
}

export async function countAdminReviews(): Promise<Record<AdminReviewFilter, number>> {
  await connectToDatabase();
  const [all, pending, published, hidden] = await Promise.all(
    ADMIN_REVIEW_FILTERS.map((filter) => Review.countDocuments(filterQueries[filter])),
  );
  return { all, pending, published, hidden };
}

export async function countReviewsToCheck() {
  await connectToDatabase();
  return Review.countDocuments(filterQueries.pending);
}

export async function moderateReviews(ids: string[], intent: ReviewIntent) {
  const valid = ids.filter((id) => isValidObjectId(id));
  if (!valid.length) return 0;
  await connectToDatabase();
  const byId = { _id: { $in: valid } };
  if (intent === "delete") return (await Review.deleteMany({ ...byId, status: "hidden" })).deletedCount;
  if (intent === "hide") return (await Review.updateMany(byId, { $set: { status: "hidden" } })).matchedCount;
  return (await Review.updateMany({ ...byId, ...WITH_COMMENT, consent: true }, { $set: { status: "published" } })).matchedCount;
}
