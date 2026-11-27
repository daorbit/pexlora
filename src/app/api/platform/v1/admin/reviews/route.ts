import { platformRoute } from "@/lib/platform/route";
import { reviewsPage } from "@/services/platform/admin";

export const GET = platformRoute(["users:read"], async ({ url }) => reviewsPage(url));
