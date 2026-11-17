"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_LANGUAGE } from "@/config/languages";
import { readTranslateLanguage, setTranslateLanguage } from "@/lib/translate/googtrans";

const subscribe = () => () => {};

export function useActiveLanguage() {
  return useSyncExternalStore(subscribe, readTranslateLanguage, () => DEFAULT_LANGUAGE);
}

export function useLanguageSelect(active: string, onClose: () => void) {
  return useCallback(
    (code: string) => {
      if (code === active) return onClose();
      setTranslateLanguage(code);
    },
    [active, onClose],
  );
}
