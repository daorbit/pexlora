import { timingSafeEqual } from "node:crypto";
import { env } from "@/lib/env";
import { changedSitemapUrls, submitToIndexNow, validIndexNowKey } from "@/services/indexnow.service";

function authorized(request: Request) {
  const secret = env.cronSecret;
  if (!secret) return false;
  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function GET(request: Request) {
  if (!authorized(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const key = validIndexNowKey();
  if (!key) return Response.json({ error: "INDEXNOW_KEY is missing or invalid" }, { status: 503 });

  const all = new URL(request.url).searchParams.get("all") === "1";
  const urls = await changedSitemapUrls(all);
  if (!urls.length) return Response.json({ submitted: 0 });

  const statuses = await submitToIndexNow(urls, key);
  return Response.json({ submitted: urls.length, statuses });
}
