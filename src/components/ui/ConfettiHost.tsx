"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { getBurst, getServerBurst, subscribeCelebrations } from "@/lib/celebrate/store";

const PIECES = Array.from({ length: 48 }, (_, index) => index);
const BURST_MS = 4200;

export function ConfettiHost() {
  const burst = useSyncExternalStore(subscribeCelebrations, getBurst, getServerBurst);
  const [finished, setFinished] = useState(0);

  useEffect(() => {
    if (!burst) return;
    const timer = window.setTimeout(() => setFinished(burst), BURST_MS);
    return () => window.clearTimeout(timer);
  }, [burst]);

  if (!burst || finished === burst) return null;

  return (
    <div key={burst} aria-hidden className="pointer-events-none fixed inset-0 z-[110] overflow-hidden motion-reduce:hidden">
      {PIECES.map((piece) => (
        <span key={piece} className="confetti-piece" />
      ))}
    </div>
  );
}
