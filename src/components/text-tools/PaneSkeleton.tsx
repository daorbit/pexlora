import { cn } from "@/lib/utils/cn";

const lineWidths = ["w-11/12", "w-full", "w-10/12", "w-full", "w-8/12", "w-11/12", "w-9/12"];

export function PaneSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-3 p-5">
      {lineWidths.map((width, index) => (
        <span key={index} className={cn("h-3.5 rounded-full bg-fill motion-safe:animate-pulse", width)} />
      ))}
    </div>
  );
}

export function PaneEmpty({ message }: { message: string }) {
  return (
    <div className="flex flex-1 items-center justify-center p-8 text-center text-[14.5px] text-tertiary">{message}</div>
  );
}
