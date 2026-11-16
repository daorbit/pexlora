"use client";

import { useEffect, useRef } from "react";
import { useHashTool } from "@/hooks/useHashTool";
import { ToolTabs } from "@/components/workspace/ToolTabs";
import { WorkspaceFrame } from "@/components/workspace/WorkspaceFrame";
import { WorkspacePanel } from "@/components/workspace/WorkspacePanel";

export function HomeTool() {
  const { tool, fromHash, select } = useHashTool("remove-metadata");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fromHash) ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [fromHash]);

  return (
    <div ref={ref} id="tool" className="mx-auto w-full max-w-[900px] scroll-mt-24">
      <WorkspaceFrame tabs={<ToolTabs value={tool} onChange={select} />}>
        <WorkspacePanel key={tool} tool={tool} />
      </WorkspaceFrame>
    </div>
  );
}
