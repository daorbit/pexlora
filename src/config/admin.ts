import { routes } from "@/config/site";

export const adminUserPath = (id: string) => `${routes.dashboardAdmin}/user?id=${encodeURIComponent(id)}`;

export function adminUsersPath({ query, page }: { query?: string; page?: number }) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (page && page > 1) params.set("page", String(page));
  const search = params.toString();
  return search ? `${routes.dashboardAdmin}?${search}` : routes.dashboardAdmin;
}
