import { routes } from "@/config/site";

export const adminUserPath = (id: string) => `${routes.dashboardAdmin}/user?id=${encodeURIComponent(id)}`;

export function adminReviewsPath({ filter, page }: { filter?: string; page?: number }) {
  const params = new URLSearchParams();
  if (filter && filter !== "all") params.set("status", filter);
  if (page && page > 1) params.set("page", String(page));
  const search = params.toString();
  return search ? `${routes.dashboardAdminReviews}?${search}` : routes.dashboardAdminReviews;
}

export function adminUsersPath({ query, page }: { query?: string; page?: number }) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (page && page > 1) params.set("page", String(page));
  const search = params.toString();
  return search ? `${routes.dashboardAdmin}?${search}` : routes.dashboardAdmin;
}
