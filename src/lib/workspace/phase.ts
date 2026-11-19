export type WorkspacePhase = "add" | "choose" | "working" | "done";

type PhaseInput = { itemCount: number; readyCount: number; doneCount: number; isProcessing: boolean };

export function workspacePhase({ itemCount, readyCount, doneCount, isProcessing }: PhaseInput): WorkspacePhase {
  if (!itemCount) return "add";
  if (isProcessing) return "working";
  if (doneCount > 0 && readyCount === 0) return "done";
  return "choose";
}
