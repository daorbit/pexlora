"use client";

import { housePromos, resultsPromoTools } from "@/config/house-promos";
import type { WorkspaceController } from "@/hooks/useWorkspaceController";
import { HousePromoCard } from "@/components/promo/HousePromoCard";
import { NextSteps } from "@/components/workspace/NextSteps";

export function ResultExtras({ controller }: { controller: WorkspaceController }) {
  const { queue, results, tool } = controller;
  if (queue.isProcessing || !results.length) return null;

  return (
    <>
      <NextSteps current={tool} results={results} />
      {resultsPromoTools.includes(tool) && <HousePromoCard promo={housePromos.results} placement="results" dismissible />}
    </>
  );
}
