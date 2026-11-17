"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { dashboardToolHref } from "@/config/dashboard";
import { routes } from "@/config/site";
import { getWorkspaceTool, type WorkspaceToolSlug } from "@/config/tools";
import { handOffFiles } from "@/lib/utils/file-handoff";

export function useSendToTool() {
  const router = useRouter();
  const inDashboard = usePathname().startsWith(routes.dashboard);

  return useCallback(
    (slug: WorkspaceToolSlug, files: { blob: Blob; name: string }[]) => {
      handOffFiles(slug, files.map(({ blob, name }) => new File([blob], name, { type: blob.type })));
      router.push(inDashboard ? dashboardToolHref(slug) : getWorkspaceTool(slug).href);
    },
    [inDashboard, router],
  );
}
