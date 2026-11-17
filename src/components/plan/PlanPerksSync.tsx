"use client";

import { useEffect } from "react";
import { setWorkspacePro } from "@/lib/plan/perks-store";

export function PlanPerksSync({ pro }: { pro: boolean }) {
  useEffect(() => {
    setWorkspacePro(pro);
  }, [pro]);
  return null;
}
