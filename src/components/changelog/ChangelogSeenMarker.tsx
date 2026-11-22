"use client";

import { useMarkChangelogSeen } from "@/hooks/useChangelogSeen";

export function ChangelogSeenMarker() {
  useMarkChangelogSeen();
  return null;
}
