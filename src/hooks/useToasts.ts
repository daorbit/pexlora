"use client";

import { useSyncExternalStore } from "react";
import { getServerToasts, getToasts, subscribeToasts } from "@/lib/toast/store";

export function useToasts() {
  return useSyncExternalStore(subscribeToasts, getToasts, getServerToasts);
}
