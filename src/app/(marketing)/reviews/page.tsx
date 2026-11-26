import type { Metadata } from "next";
import { routes } from "@/config/site";
import { reviewsPageCopy } from "@/content/reviews";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { ReviewsPage } from "@/components/reviews/ReviewsPage";

export const metadata: Metadata = pageMetadata(reviewsPageCopy.metaTitle, reviewsPageCopy.description, routes.reviews);

export default function Reviews() {
  return <ReviewsPage />;
}
