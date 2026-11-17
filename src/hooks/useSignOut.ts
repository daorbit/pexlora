"use client";

import { useCallback, useState, useTransition } from "react";
import { signOut } from "@/actions/auth";
import { routes } from "@/config/site";
import { clearAllSessions, hasSavedSessions } from "@/lib/storage/session-store";

export function useSignOut() {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  const run = useCallback(
    () =>
      startTransition(async () => {
        await clearAllSessions();
        await signOut();
        window.location.assign(routes.home);
      }),
    [],
  );

  const request = useCallback(async () => {
    if (await hasSavedSessions()) setConfirming(true);
    else run();
  }, [run]);

  const cancel = useCallback(() => setConfirming(false), []);

  return { request, confirm: run, cancel, confirming, pending };
}
