import { platformRoute } from "@/lib/platform/route";
import { resetUserUsage } from "@/services/platform/admin";

export const POST = platformRoute<{ userId: string }>(["subscriptions:extend"], async ({ params }) => resetUserUsage(params.userId));
