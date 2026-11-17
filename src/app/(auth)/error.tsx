"use client";

import { routes } from "@/config/site";
import { statusCopy } from "@/content/status";
import { RouteError } from "@/components/feedback/RouteError";

export default function AuthError({ error, retry }: { error: unknown; retry: () => void }) {
  return <RouteError error={error} retry={retry} homeHref={routes.home} homeLabel={statusCopy.error.home} />;
}
