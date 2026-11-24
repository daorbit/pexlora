import type { Metadata } from "next";
import { Suspense } from "react";
import { adminReviewCopy } from "@/content/reviews";
import { AdminReviewsFallback, AdminReviewsView } from "@/components/admin/AdminReviewsView";

export const metadata: Metadata = { title: adminReviewCopy.title };

export default function AdminReviewsPage() {
  return (
    <Suspense fallback={<AdminReviewsFallback />}>
      <AdminReviewsView />
    </Suspense>
  );
}
