import { PLATFORM_AUDIENCE } from "@/lib/platform/auth";
import { platformRoute } from "@/lib/platform/route";

export const GET = platformRoute(["products:read"], async () => ({
  product: PLATFORM_AUDIENCE,
  connectorVersion: "v1",
  capabilities: ["users", "billing", "payments", "metrics", "health"],
}));