"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { formatCount } from "@/lib/utils/format-count";

const FIRST_NUMBER = /\d[\d,]*/;

function RunningNumber({ target }: { target: number }) {
  return <>{formatCount(useCountUp(target))}</>;
}

export function CountUp({ text }: { text: string }) {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>();
  const match = text.match(FIRST_NUMBER);
  const target = match ? Number(match[0].replaceAll(",", "")) : 0;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden className="tabular-nums">
        {match && inView && target > 1 ? (
          <>
            {text.slice(0, match.index)}
            <RunningNumber target={target} />
            {text.slice((match.index ?? 0) + match[0].length)}
          </>
        ) : (
          text
        )}
      </span>
    </>
  );
}
