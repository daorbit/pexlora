import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { routes } from "@/config/site";
import { adminReviewCopy } from "@/content/reviews";
import { requireSuperAdmin } from "@/lib/auth/dal";
import { getRatingTotals, listAdminReviews } from "@/services/review.service";
import { Card } from "@/components/ui/Card";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { AdminReviewRow } from "@/components/admin/AdminReviewRow";

export async function AdminReviewsView() {
  await requireSuperAdmin();
  const [reviews, totals] = await Promise.all([listAdminReviews(), getRatingTotals()]);

  return (
    <div className="flex flex-col gap-4">
      <Link
        href={routes.dashboardAdmin}
        className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-secondary hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {adminReviewCopy.back}
      </Link>
      <div className="flex flex-col gap-1">
        <h2 className="text-[17px] font-semibold">
          {adminReviewCopy.title}
          <span className="ml-2 text-sm font-normal text-secondary">{adminReviewCopy.summary(totals.count, totals.average)}</span>
        </h2>
        <p className="max-w-2xl text-[13px] text-secondary">{adminReviewCopy.rule}</p>
      </div>
      {reviews.length ? (
        <Card className="overflow-hidden">
          <ul className="divide-y divide-separator">
            {reviews.map((review) => (
              <AdminReviewRow key={review.id} review={review} />
            ))}
          </ul>
        </Card>
      ) : (
        <Card className="px-5 py-10 text-center text-sm text-secondary">{adminReviewCopy.empty}</Card>
      )}
    </div>
  );
}

export function AdminReviewsFallback() {
  return <SkeletonCard lines={8} className="min-h-96" />;
}
