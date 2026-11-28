import { platformRoute } from "@/lib/platform/route";
import { adminUserProfile } from "@/services/platform/admin";

export const GET = platformRoute<{ userId: string }>(["users:read"], async ({ params }) => adminUserProfile(params.userId));
