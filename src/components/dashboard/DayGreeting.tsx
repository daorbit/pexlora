"use client";

import { useDayGreeting } from "@/hooks/useDayGreeting";

export function DayGreeting() {
  return <>{useDayGreeting()}</>;
}
