import { BatchProgress } from "@/components/workspace/BatchProgress";
import { ZipMotion } from "@/components/utility/zip/ZipMotion";

type ZipWorkingCardProps = {
  direction: "in" | "out";
  title: string;
  detail: string;
  done: number;
  total: number;
};

export function ZipWorkingCard({ direction, title, detail, done, total }: ZipWorkingCardProps) {
  return (
    <div role="status" className="flex flex-1 flex-col items-center justify-center gap-5 px-4 py-8 text-center motion-safe:animate-fade-in">
      <ZipMotion direction={direction} />
      <div className="flex w-full min-w-0 flex-col items-center gap-1">
        <p className="text-[17px] font-semibold tracking-[-0.02em]">{title}</p>
        <p translate="no" className="notranslate max-w-full truncate text-[13px] text-secondary">
          {detail}
        </p>
      </div>
      <BatchProgress done={done} total={total} className="w-full max-w-xs" />
    </div>
  );
}
