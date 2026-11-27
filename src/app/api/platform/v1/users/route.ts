import { platformRoute } from "@/lib/platform/route";
import { listPlatformUsers } from "@/services/platform/users";

export const GET = platformRoute(["users:read"], async ({ url }) => listPlatformUsers(url));