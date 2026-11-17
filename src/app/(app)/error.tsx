"use client";

import { routes } from "@/config/site";
import { statusCopy } from "@/content/status";
import { RouteError } from "@/components/feedback/RouteError";

export default function DashboardError({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <RouteError
      error={error}
      retry={retry}
      homeHref={routes.dashboard}
      homeLabel={statusCopy.error.dashboard}
      className="py-10 sm:py-16"
    />
  );
}
