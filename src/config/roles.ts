export const USER_ROLES = ["user", "super_admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const ROLE_LABELS: Record<UserRole, string> = {
  user: "User",
  super_admin: "Super Admin",
};

export const OWNER_EMAILS: readonly string[] = ["goswamiajay526@gmail.com"];

export const MAX_CUSTOM_LIMIT = 100_000;

export const ADMIN_USERS_PAGE_SIZE = 20;

export function isUserRole(value: unknown): value is UserRole {
  return USER_ROLES.includes(value as UserRole);
}
