import { platformRoute } from "@/lib/platform/route";
import { listPlatformPayments } from "@/services/platform/payments";

export const GET = platformRoute(["payments:read"], async ({ url }) =>
  listPlatformPayments({
    status: url.searchParams.get("status"),
    cursor: url.searchParams.get("cursor"),
    limit: url.searchParams.get("limit"),
  }),
);