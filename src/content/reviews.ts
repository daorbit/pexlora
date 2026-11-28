import { MAX_RATING } from "@/config/reviews";
import { siteConfig } from "@/config/site";

export const reviewsPageCopy = {
  metaTitle: "Reviews and Ratings",
  description: `Real comments from people who used ${siteConfig.name} to clean, convert and compress their files, with the average star rating from every rating.`,
  eyebrow: "Reviews / best rated first",
  title: "What people",
  highlight: "say.",
  stats: { average: "Average", ratings: "Ratings", comments: "Comments" },
  outOf: ` / ${MAX_RATING}`,
  listLabel: "Reviews from people who used Pexlora",
  showMore: (count: number) => `Show ${count} More`,
  note: "Only comments people allowed us to show. Every rating counts towards the average, good or bad.",
  empty: "Reviews show up here once enough people have shared a comment after using a tool.",
  rateLink: "Try a Tool and Rate It",
  seeAll: "See All Reviews",
};

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
