import { platformRoute } from "@/lib/platform/route";
import { listPlatformSubscriptions } from "@/services/platform/subscriptions";

export const GET = platformRoute(["subscriptions:read"], async ({ url }) => listPlatformSubscriptions(url));