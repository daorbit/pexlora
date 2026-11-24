export const MAX_RATING = 5;

export const REVIEW_TEXT_LIMITS = { comment: 280, name: 40 } as const;

export const REVIEW_EDIT_MINUTES = 60;

export const REVIEW_STATUSES = ["pending", "published", "hidden"] as const;
export type ReviewStatus = (typeof REVIEW_STATUSES)[number];

export const ADMIN_REVIEWS_SHOWN = 100;
