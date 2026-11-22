"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { analyticsEvents } from "@/config/analytics";
import { routes } from "@/config/site";
import { useSignedIn } from "@/hooks/useSignedIn";
import { track } from "@/lib/analytics/track";
import { SignupPromptDialog } from "@/components/workspace/SignupPromptDialog";

type Run = () => void;
type PendingDownload = { run: Run; next: string; count: number };

const SEEN_KEY = "pexlora-signup-prompt-seen";

const DownloadGateContext = createContext<(run: Run, count?: number) => void>((run) => run());

function promptSeen() {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markPromptSeen() {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {}
}

export function useDownloadGate() {
  return useContext(DownloadGateContext);
}

export function DownloadGateProvider({ children }: { children: ReactNode }) {
  const signedIn = useSignedIn();
  const [pending, setPending] = useState<PendingDownload | null>(null);

  const guard = useCallback(
    (run: Run, count = 1) => {
      track(analyticsEvents.fileSave, { count });
      const { pathname, search } = window.location;
      if (signedIn || pathname.startsWith(routes.dashboard) || promptSeen()) return run();
      setPending({ run, next: `${pathname}${search}`, count });
    },
    [signedIn],
  );

  const close = useCallback(() => {
    markPromptSeen();
    setPending(null);
  }, []);

  const skip = () => {
    const download = pending?.run;
    close();
    download?.();
  };

  return (
    <DownloadGateContext.Provider value={guard}>
      {children}
      {pending && <SignupPromptDialog next={pending.next} count={pending.count} onSkip={skip} onClose={close} />}
    </DownloadGateContext.Provider>
  );
}
