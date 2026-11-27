import { notFound, platformRoute } from "@/lib/platform/route";
import { removeUser } from "@/services/platform/admin";
import { platformUserDetail } from "@/services/platform/users";

export const GET = platformRoute<{ userId: string }>(["users:read"], async ({ params }) => {
  return (await platformUserDetail(params.userId)) ?? notFound("user not found");
});

export const DELETE = platformRoute<{ userId: string }>(["users:delete"], async ({ params }) => removeUser(params.userId));
