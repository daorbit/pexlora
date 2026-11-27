import { notFound, platformRoute } from "@/lib/platform/route";
import { platformUserDetail } from "@/services/platform/users";

export const GET = platformRoute<{ userId: string }>(["users:read"], async ({ params }) => {
  return (await platformUserDetail(params.userId)) ?? notFound("user not found");
});