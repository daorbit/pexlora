import type { ReactNode } from "react";
import type { Conversion } from "@/config/conversions";
import type { WorkspaceController } from "@/hooks/useWorkspaceController";

export type LayoutProps = {
  controller: WorkspaceController;
  conversion?: Conversion;
  panelFooter?: ReactNode;
};
