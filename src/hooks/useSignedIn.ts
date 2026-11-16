"use client";

import { useSyncExternalStore } from "react";
import { SIGNED_IN_COOKIE } from "@/lib/auth/cookie-names";

const subscribe = () => () => undefined;
const readSignedIn = () => document.cookie.split("; ").some((cookie) => cookie === `${SIGNED_IN_COOKIE}=1`);

export function useSignedIn() {
  return useSyncExternalStore(subscribe, readSignedIn, () => false);
}
