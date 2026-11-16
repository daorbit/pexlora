"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { routes } from "@/config/site";
import { adminCopy } from "@/content/admin";
import { getSuperAdmin, type CurrentUser } from "@/lib/auth/dal";
import { limitsSchema, roleSchema, type AdminFormState } from "@/lib/validations/admin";
import {
  deleteUserAccount,
  getAdminUser,
  resetUserUsageToday,
  setUserLimits,
  setUserRole,
  type AdminUser,
} from "@/services/admin.service";

const failure = (message: string) => ({ status: "error" as const, message });
const success = (message: string) => ({ status: "success" as const, message });

type Authorization =
  | { ok: false; message: string }
  | { ok: true; admin: CurrentUser; target: AdminUser };

async function authorize(userId: string): Promise<Authorization> {
  const admin = await getSuperAdmin();
  if (!admin) return { ok: false, message: adminCopy.errors.forbidden };
  const target = await getAdminUser(userId);
  if (!target) return { ok: false, message: adminCopy.errors.notFound };
  return { ok: true, admin, target };
}

async function run(task: () => Promise<void>, message: string): Promise<AdminFormState> {
  try {
    await task();
  } catch (error) {
    console.error("Admin action failed", error);
    return failure(adminCopy.errors.unavailable);
  }
  refresh();
  return success(message);
}

export async function updateUserRole(userId: string, _state: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const auth = await authorize(userId);
  if (!auth.ok) return failure(auth.message);

  const parsed = roleSchema.safeParse({ role: formData.get("role") });
  if (!parsed.success) return failure(adminCopy.errors.unavailable);

  const { role } = parsed.data;
  if (auth.target.owner) return failure(adminCopy.role.ownerLocked);
  if (auth.target.id === auth.admin.id && role !== "super_admin") return failure(adminCopy.role.selfDemote);

  return run(() => setUserRole(userId, role), adminCopy.role.saved);
}

export async function updateUserLimits(userId: string, _state: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const auth = await authorize(userId);
  if (!auth.ok) return failure(auth.message);

  const parsed = limitsSchema.safeParse({
    files: String(formData.get("files") ?? ""),
    ai: String(formData.get("ai") ?? ""),
  });
  if (!parsed.success) return { status: "error", errors: z.flattenError(parsed.error).fieldErrors };

  return run(() => setUserLimits(userId, parsed.data), adminCopy.limits.saved);
}

export async function resetUserUsage(userId: string): Promise<AdminFormState> {
  const auth = await authorize(userId);
  if (!auth.ok) return failure(auth.message);
  return run(() => resetUserUsageToday(userId), adminCopy.usage.resetDone);
}

export async function deleteUser(userId: string, _state: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const auth = await authorize(userId);
  if (!auth.ok) return failure(auth.message);
  if (auth.target.owner) return failure(adminCopy.danger.ownerLocked);
  if (auth.target.id === auth.admin.id) return failure(adminCopy.danger.selfLocked);

  const confirmation = String(formData.get("confirm") ?? "").trim().toLowerCase();
  if (confirmation !== auth.target.email) return failure(adminCopy.danger.mismatch);

  try {
    await deleteUserAccount(userId);
  } catch (error) {
    console.error("Admin delete failed", error);
    return failure(adminCopy.errors.unavailable);
  }
  redirect(routes.dashboardAdmin);
}
