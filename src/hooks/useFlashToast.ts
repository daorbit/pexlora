"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { FLASH_COOKIE, flashMessages, isFlashKey } from "@/content/toasts";
import { celebrate } from "@/lib/celebrate/store";
import { toast } from "@/lib/toast/store";

export function showFlashToast() {
  const match = document.cookie.match(new RegExp(`(?:^|; )${FLASH_COOKIE}=([^;]*)`));
  if (!match) return;
  document.cookie = `${FLASH_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
  const key = decodeURIComponent(match[1]);
  if (!isFlashKey(key)) return;
  toast[key === "session-expired" ? "info" : "success"](flashMessages[key]);
  if (key === "account-created") celebrate();
}

export function useFlashToast() {
  const pathname = usePathname();
  useEffect(showFlashToast, [pathname]);
}
