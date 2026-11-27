import "server-only";
import { ApiError } from "@/lib/api/errors";
import { requirePlatformAdmin, type PlatformAdmin } from "@/lib/platform/auth";

type Context<P> = { params: Promise<P> };

const NO_STORE = { "Cache-Control": "no-store" };

export function platformRoute<P = Record<string, never>>(
  scopes: string[],
  handler: (input: { request: Request; url: URL; admin: PlatformAdmin; params: P }) => Promise<unknown>,
) {
  return async (request: Request, context: Context<P>) => {
    try {
      const admin = await requirePlatformAdmin(request, scopes);
      const body = await handler({ request, url: new URL(request.url), admin, params: await context.params });
      return Response.json(body, { headers: NO_STORE });
    } catch (error) {
      if (error instanceof ApiError) return Response.json({ error: error.message }, { status: error.status, headers: NO_STORE });
      console.error("platform route failed", error);
      return Response.json({ error: "platform_error" }, { status: 500, headers: NO_STORE });
    }
  };
}

export function notFound(message = "not found"): never {
  throw new ApiError(message, 404);
}
