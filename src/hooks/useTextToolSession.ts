"use client";

import { useEffect, useRef } from "react";
import { textHandoffKey, type TextToolSlug } from "@/config/text-tools";
import { clearSession, loadSession, saveSession } from "@/lib/storage/session-store";
import { takeHandOff } from "@/lib/utils/file-handoff";

const SAVE_DELAY_MS = 500;

export function useTextToolSession<T extends { text: string }>(
  slug: TextToolSlug,
  snapshot: T,
  apply: (session: Partial<T> & { text: string }) => void,
) {
  const key = `text:${slug}`;
  const ready = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const handedOff = takeHandOff<string>(textHandoffKey(slug));

    if (handedOff !== undefined) {
      apply({ text: handedOff } as Partial<T> & { text: string });
      ready.current = true;
      return;
    }

    loadSession<T>(key).then((session) => {
      if (cancelled) return;
      if (session) apply(session);
      ready.current = true;
    });

    return () => {
      cancelled = true;
    };
  }, [key, slug, apply]);

  useEffect(() => {
    if (!ready.current) return;
    const timer = setTimeout(() => {
      if (snapshot.text.trim()) saveSession(key, snapshot);
      else clearSession(key);
    }, SAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [key, snapshot]);
}
