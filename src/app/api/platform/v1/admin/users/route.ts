import { platformRoute } from "@/lib/platform/route";
import { adminUsersPage } from "@/services/platform/admin";

export const GET = platformRoute(["users:read"], async ({ url }) => adminUsersPage(url));
