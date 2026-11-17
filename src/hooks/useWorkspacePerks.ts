"use client";

import { useSyncExternalStore } from "react";
import { getPerks, getServerPerks, subscribePerks } from "@/lib/plan/perks-store";

export function useWorkspacePerks() {
  return useSyncExternalStore(subscribePerks, getPerks, getServerPerks);
}
