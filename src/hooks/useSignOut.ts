"use client";

import { useCallback, useTransition } from "react";
import { signOut } from "@/actions/auth";
import { routes } from "@/config/site";
import { clearAllSessions } from "@/lib/storage/session-store";

export function useSignOut() {
  const [pending, startTransition] = useTransition();

  const run = useCallback(
    () =>
      startTransition(async () => {
        await clearAllSessions();
        await signOut();
        window.location.assign(routes.home);
      }),
    [],
  );

  return { signOut: run, pending };
}
