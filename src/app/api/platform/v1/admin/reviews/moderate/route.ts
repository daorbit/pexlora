import { platformRoute } from "@/lib/platform/route";
import { moderate, readBody } from "@/services/platform/admin";

export const POST = platformRoute(["reviews:moderate"], async ({ request }) => moderate(await readBody(request)));
