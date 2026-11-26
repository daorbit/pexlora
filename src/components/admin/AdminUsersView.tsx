import { adminUsersPath } from "@/config/admin";
import { routes } from "@/config/site";
import { adminCopy } from "@/content/admin";
import { adminReviewCopy } from "@/content/reviews";
import { requireSuperAdmin } from "@/lib/auth/dal";
import { pageParam, single } from "@/lib/utils/search-param";
import { getAdminStats, listAdminUsers } from "@/services/admin.service";
import { countReviewsToCheck } from "@/services/review.service";
import { AdminStats, AdminStatsFallback } from "@/components/admin/AdminStats";
import { UserSearchForm } from "@/components/admin/UserSearchForm";
import { UsersList } from "@/components/admin/UsersList";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { ButtonLink } from "@/components/ui/Button";
import { SkeletonCard } from "@/components/ui/Skeleton";

export type AdminSearchParams = Promise<{ q?: string | string[]; page?: string | string[] }>;

export async function AdminUsersView({ searchParams }: { searchParams: AdminSearchParams }) {
  const admin = await requireSuperAdmin();
  const params = await searchParams;
  const query = single(params.q).trim();
  const page = pageParam(params.page);

  const [stats, list, reviewsToCheck] = await Promise.all([getAdminStats(), listAdminUsers({ query, page }), countReviewsToCheck()]);

  return (
    <div className="flex flex-col gap-6">
      <AdminStats stats={stats} />
      <ButtonLink href={routes.dashboardAdminReviews} variant="secondary" size="md" arrow className="self-start">
        {adminReviewCopy.open(reviewsToCheck)}
      </ButtonLink>
      <section className="flex flex-col gap-3" aria-labelledby="admin-users-title">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="admin-users-title" className="text-[17px] font-semibold">
            {adminCopy.users.title}
            <span className="ml-2 text-sm font-normal text-secondary">{adminCopy.users.count(list.total)}</span>
          </h2>
          <div className="w-full sm:max-w-md">
            <UserSearchForm query={query} />
          </div>
        </div>
        <UsersList users={list.users} currentUserId={admin.id} />
        <AdminPagination page={list.page} pageCount={list.pageCount} hrefFor={(page) => adminUsersPath({ query, page })} />
      </section>
    </div>
  );
}

export function AdminUsersFallback() {
  return (
    <div className="flex flex-col gap-6">
      <AdminStatsFallback />
      <SkeletonCard lines={8} className="min-h-96" />
    </div>
  );
}
