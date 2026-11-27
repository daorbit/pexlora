import { platformRoute } from "@/lib/platform/route";
import { changeUserLimits, readBody } from "@/services/platform/admin";

export const PUT = platformRoute<{ userId: string }>(["subscriptions:extend"], async ({ request, params }) => changeUserLimits(params.userId, await readBody(request)));
