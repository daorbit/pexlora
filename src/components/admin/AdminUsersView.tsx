import { adminCopy } from "@/content/admin";
import { requireSuperAdmin } from "@/lib/auth/dal";
import { getAdminStats, listAdminUsers } from "@/services/admin.service";
import { AdminStats, AdminStatsFallback } from "@/components/admin/AdminStats";
import { UserSearchForm } from "@/components/admin/UserSearchForm";
import { UsersList } from "@/components/admin/UsersList";
import { UsersPagination } from "@/components/admin/UsersPagination";

export type AdminSearchParams = Promise<{ q?: string | string[]; page?: string | string[] }>;

const single = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

export async function AdminUsersView({ searchParams }: { searchParams: AdminSearchParams }) {
  const admin = await requireSuperAdmin();
  const params = await searchParams;
  const query = single(params.q).trim();
  const page = Number.parseInt(single(params.page), 10) || 1;

  const [stats, list] = await Promise.all([getAdminStats(), listAdminUsers({ query, page })]);

  return (
    <div className="flex flex-col gap-6">
      <AdminStats stats={stats} />
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
        <UsersPagination query={query} page={list.page} pageCount={list.pageCount} />
      </section>
    </div>
  );
}

export function AdminUsersFallback() {
  return (
    <div className="flex flex-col gap-6">
      <AdminStatsFallback />
      <div className="h-96 animate-pulse rounded-2xl border border-separator bg-fill" />
    </div>
  );
}
