import { CircleAlert, CircleCheck } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type AlertProps = {
  message: string;
  action?: ReactNode;
  tone?: "danger" | "success";
};

export function Alert({ message, action, tone = "danger" }: AlertProps) {
  const Icon = tone === "success" ? CircleCheck : CircleAlert;

  return (
    <div
      role={tone === "success" ? "status" : "alert"}
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl px-4 py-3 text-sm",
        tone === "success" ? "bg-success-soft text-success" : "bg-danger-soft text-danger",
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      <span className="flex-1">{message}</span>
      {action}
    </div>
  );
}
