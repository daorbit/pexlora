import "server-only";
import { AI_DAILY_LIMITS, DAILY_LIMITS } from "@/config/limits";
import { PRO_LIMITS } from "@/config/plans";
import { ADMIN_REVIEW_FILTERS, type AdminReviewFilter } from "@/config/reviews";
import { ApiError } from "@/lib/api/errors";
import { hasProPerks } from "@/lib/auth/roles";
import { perksFor } from "@/lib/plan/perks";
import { limitsSchema, roleSchema } from "@/lib/validations/admin";
import { reviewIdsSchema, reviewIntentSchema } from "@/lib/validations/reviews";
import {
  deleteUserAccount,
  getAdminUser,
  listAdminPurchases,
  listAdminUsers,
  resetUserUsageToday,
  setUserLimits,
  setUserRole,
  setUserStatus,
  type AdminUser,
} from "@/services/admin.service";
import { countAdminReviews, listAdminReviews, moderateReviews } from "@/services/review.service";

type Body = Record<string, unknown>;

export async function readBody(request: Request): Promise<Body> {
  const body = (await request.json().catch(() => null)) as unknown;
  return body && typeof body === "object" ? (body as Body) : {};
}

function pageOf(url: URL) {
  return Math.max(1, Number(url.searchParams.get("page")) || 1);
}

async function target(id: string): Promise<AdminUser> {
  const user = await getAdminUser(id);
  if (!user) throw new ApiError("user not found", 404);
  return user;
}

function lockedOwner(user: AdminUser, what: string) {
  if (user.owner) throw new ApiError(`The owner's account can't be ${what}`);
}

export async function adminUsersPage(url: URL) {
  return listAdminUsers({ query: (url.searchParams.get("q") ?? "").slice(0, 100), page: pageOf(url) });
}

export async function adminUserProfile(id: string) {
  const user = await target(id);
  const purchases = await listAdminPurchases(id);
  return {
    user,
    purchases,
    perks: perksFor(hasProPerks(user)),
    defaults: { free: { files: DAILY_LIMITS.user, ai: AI_DAILY_LIMITS.user }, pro: PRO_LIMITS },
  };
}

export async function changeUserRole(id: string, body: Body) {
  const user = await target(id);
  lockedOwner(user, "changed");
  const parsed = roleSchema.safeParse({ role: body.role });
  if (!parsed.success) throw new ApiError("role must be user or super_admin");
  await setUserRole(id, parsed.data.role);
  return { id, role: parsed.data.role };
}

export async function changeUserLimits(id: string, body: Body) {
  await target(id);
  const parsed = limitsSchema.safeParse({ files: String(body.files ?? ""), ai: String(body.ai ?? "") });
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    throw new ApiError(first ?? "limits are not valid");
  }
  await setUserLimits(id, parsed.data);
  return { id, limits: parsed.data };
}

export async function resetUserUsage(id: string) {
  await target(id);
  await resetUserUsageToday(id);
  return { id };
}

export async function changeUserStatus(id: string, body: Body) {
  const user = await target(id);
  const status = body.status === "suspended" ? "suspended" : body.status === "active" ? "active" : null;
  if (!status) throw new ApiError("status must be active or suspended");
  if (status === "suspended") {
    lockedOwner(user, "suspended");
    if (user.role === "super_admin") throw new ApiError("cannot suspend an admin account");
  }
  await setUserStatus(id, status, typeof body.reason === "string" ? body.reason.trim() : "");
  return { id, status };
}

export async function removeUser(id: string) {
  const user = await target(id);
  lockedOwner(user, "deleted");
  if (user.role === "super_admin") throw new ApiError("cannot delete an admin account");
  await deleteUserAccount(id);
  return { id, email: user.email };
}

function reviewFilter(value: string | null): AdminReviewFilter {
  return ADMIN_REVIEW_FILTERS.find((filter) => filter === value) ?? "pending";
}

export async function reviewsPage(url: URL) {
  const [page, counts] = await Promise.all([listAdminReviews({ filter: reviewFilter(url.searchParams.get("filter")), page: pageOf(url) }), countAdminReviews()]);
  return { ...page, counts };
}

export async function moderate(body: Body) {
  const ids = reviewIdsSchema.safeParse(body.ids);
  const intent = reviewIntentSchema.safeParse(body.intent);
  if (!ids.success || !intent.success) throw new ApiError("choose reviews and publish, hide or delete");
  const changed = await moderateReviews(ids.data, intent.data);
  return { changed, intent: intent.data };
}
