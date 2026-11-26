import type { Metadata } from "next";
import { Suspense } from "react";
import { adminReviewCopy } from "@/content/reviews";
import { AdminReviewsFallback, AdminReviewsView, type AdminReviewsSearchParams } from "@/components/admin/AdminReviewsView";

export const metadata: Metadata = { title: adminReviewCopy.title };

export default function AdminReviewsPage({ searchParams }: { searchParams: AdminReviewsSearchParams }) {
  return (
    <Suspense fallback={<AdminReviewsFallback />}>
      <AdminReviewsView searchParams={searchParams} />
    </Suspense>
  );
}
