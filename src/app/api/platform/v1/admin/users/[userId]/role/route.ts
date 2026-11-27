import { platformRoute } from "@/lib/platform/route";
import { changeUserRole, readBody } from "@/services/platform/admin";

export const PUT = platformRoute<{ userId: string }>(["users:roles"], async ({ request, params }) => changeUserRole(params.userId, await readBody(request)));
