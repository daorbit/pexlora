import Link from "next/link";
import { routes } from "@/config/site";
import { resultCopy } from "@/content/workspace";
import { formatBytes, formatKilobytes } from "@/lib/utils/format-bytes";

export function TargetMissedNote({ targetBytes, smallestBytes }: { targetBytes: number; smallestBytes: number }) {
  return (
    <span className="text-danger">
      {resultCopy.targetMissedHint(formatKilobytes(targetBytes / 1024), formatBytes(smallestBytes))}{" "}
      <Link href={routes.resize} className="font-medium underline underline-offset-2">
        {resultCopy.tryResize}
      </Link>
    </span>
  );
}
