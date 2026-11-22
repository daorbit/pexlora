"use client";

import { housePromos, resultsPromoTools } from "@/config/house-promos";
import type { WorkspaceController } from "@/hooks/useWorkspaceController";
import { HousePromoCard } from "@/components/promo/HousePromoCard";
import { NextSteps } from "@/components/workspace/NextSteps";
import { DoneProof } from "@/components/social-proof/DoneProof";

export function ResultExtras({ controller }: { controller: WorkspaceController }) {
  const { queue, results, tool } = controller;
  if (queue.isProcessing || !results.length) return null;

  return (
    <>
      <div className="flex flex-col gap-3 sm:gap-4">
        <DoneProof />
        <NextSteps current={tool} results={results} />
      </div>
      {resultsPromoTools.includes(tool) && <HousePromoCard promo={housePromos.results} placement="results" dismissible />}
    </>
  );
}
