import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";

export function Alert({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl bg-danger-soft px-4 py-3 text-sm text-danger"
    >
      <CircleAlert className="size-4 shrink-0" aria-hidden />
      <span className="flex-1">{message}</span>
      {action}
    </div>
  );
}
