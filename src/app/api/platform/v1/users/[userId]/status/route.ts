import { platformRoute } from "@/lib/platform/route";
import { changeUserStatus, readBody } from "@/services/platform/admin";

export const PUT = platformRoute<{ userId: string }>(["users:suspend"], async ({ request, params }) => changeUserStatus(params.userId, await readBody(request)));
