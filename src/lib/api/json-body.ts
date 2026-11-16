import "server-only";
import type { z } from "zod";
import { ApiError } from "@/lib/api/errors";

export async function readJsonBody<T extends z.ZodType>(request: Request, schema: T): Promise<z.infer<T>> {
  const body = await request.json().catch(() => {
    throw new ApiError("Invalid request.");
  });
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    throw new ApiError(parsed.error.issues[0]?.message ?? "Invalid request.");
  }
  return parsed.data;
}
