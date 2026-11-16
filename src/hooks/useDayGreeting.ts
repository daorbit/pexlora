"use client";

import { useSyncExternalStore } from "react";
import { greetingCopy } from "@/content/dashboard";

const REFRESH_MS = 60_000;

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, REFRESH_MS);
  return () => window.clearInterval(timer);
}

function currentGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return greetingCopy.morning;
  if (hour < 18) return greetingCopy.afternoon;
  return greetingCopy.evening;
}

export function useDayGreeting() {
  return useSyncExternalStore(subscribe, currentGreeting, () => greetingCopy.fallback);
}
