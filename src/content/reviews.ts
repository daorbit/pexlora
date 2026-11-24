import { MAX_RATING, type ReviewStatus } from "@/config/reviews";
import type { ReviewIntent } from "@/lib/validations/reviews";

export const reviewCopy = {
  title: "How did it go?",
  groupLabel: "Rate this tool",
  star: (value: number) => `${value} out of ${MAX_RATING} stars`,
  commentTitle: "Thanks. Want to say more?",
  commentLabel: "Your comment",
  commentPlaceholder: "What worked, or what should be better?",
  nameLabel: "Your name (optional)",
  namePlaceholder: "Aarav",
  consent: "Pexlora may show my comment and name on the site",
  send: "Send",
  skip: "Skip",
  thanks: "Thanks, your rating helps us improve.",
  notSaved: "You're a super admin, so this rating wasn't saved.",
  failed: "That couldn't be saved. Please try again.",
  dismiss: "Hide rating",
  anonymous: "Pexlora user",
};

export const adminReviewCopy = {
  title: "Ratings and comments",
  open: (pending: number) => (pending ? `Reviews (${pending} to check)` : "Reviews"),
  back: "All Users",
  summary: (count: number, average: number) =>
    count ? `${count.toLocaleString("en-US")} ${count === 1 ? "rating" : "ratings"}, average ${average.toFixed(1)}` : "No ratings yet",
  rule: "Every rating counts towards the public average, good or bad. Publish real comments only, and delete a review only if it's spam. Super admin ratings are never saved.",
  empty: "Ratings appear here once people rate a tool after using it.",
  noComment: "Rating only",
  noConsent: "No permission to show this comment",
  status: { pending: "To check", published: "Published", hidden: "Hidden" } satisfies Record<ReviewStatus, string>,
  publish: "Publish",
  hide: "Hide",
  delete: "Delete Spam",
  done: { publish: "Review published.", hide: "Comment hidden. The rating still counts.", delete: "Review deleted." } satisfies Record<
    ReviewIntent,
    string
  >,
  notAllowed: "That review can't be changed this way.",
};
