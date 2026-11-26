import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { adminReviewsPath } from "@/config/admin";
import { ADMIN_REVIEW_FILTERS, type AdminReviewFilter } from "@/config/reviews";
import { routes } from "@/config/site";
import { adminReviewCopy } from "@/content/reviews";
import { requireSuperAdmin } from "@/lib/auth/dal";
import { pageParam, single, type SearchParamValue } from "@/lib/utils/search-param";
import { countAdminReviews, getRatingTotals, listAdminReviews } from "@/services/review.service";
import { Card } from "@/components/ui/Card";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { AdminReviewFilters } from "@/components/admin/AdminReviewFilters";
import { AdminReviewsList } from "@/components/admin/AdminReviewsList";

export type AdminReviewsSearchParams = Promise<{ status?: SearchParamValue; page?: SearchParamValue }>;

const toFilter = (value: string): AdminReviewFilter =>
  ADMIN_REVIEW_FILTERS.find((filter) => filter === value) ?? "all";

export async function AdminReviewsView({ searchParams }: { searchParams: AdminReviewsSearchParams }) {
  await requireSuperAdmin();
  const params = await searchParams;
  const filter = toFilter(single(params.status));
  const [list, counts, totals] = await Promise.all([
    listAdminReviews({ filter, page: pageParam(params.page) }),
    countAdminReviews(),
    getRatingTotals(),
  ]);

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
      <AdminReviewFilters current={filter} counts={counts} />
      {list.reviews.length ? (
        <AdminReviewsList key={`${filter}-${list.page}`} reviews={list.reviews} />
      ) : (
        <Card className="px-5 py-10 text-center text-sm text-secondary">{adminReviewCopy.empty}</Card>
      )}
      <AdminPagination page={list.page} pageCount={list.pageCount} hrefFor={(page) => adminReviewsPath({ filter, page })} />
    </div>
  );
}

export function AdminReviewsFallback() {
  return <SkeletonCard lines={8} className="min-h-96" />;
}
