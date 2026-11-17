import type { ReactNode } from "react";

export const PAPER = { width: 595, height: 842 } as const;

const LINES = [
  { y: 96, width: 260 },
  { y: 150, width: 455 },
  { y: 180, width: 455 },
  { y: 210, width: 400 },
  { y: 270, width: 455 },
  { y: 300, width: 430 },
  { y: 330, width: 455 },
  { y: 360, width: 300 },
  { y: 420, width: 455 },
  { y: 450, width: 455 },
  { y: 480, width: 380 },
  { y: 540, width: 455 },
  { y: 570, width: 410 },
  { y: 600, width: 455 },
  { y: 630, width: 250 },
];

export function PaperPage({ children }: { children?: ReactNode }) {
  return (
    <div className="relative aspect-[595/842] w-52 overflow-hidden sm:w-60 rounded-md bg-white shadow-card motion-safe:animate-fade-up">
      <svg viewBox={`0 0 ${PAPER.width} ${PAPER.height}`} aria-hidden className="absolute inset-0 size-full">
        {LINES.map((line) => (
          <rect key={line.y} x={70} y={line.y} width={line.width} height={line.y === 96 ? 22 : 11} rx={5} className="fill-black/[0.08]" />
        ))}
      </svg>
      {children}
    </div>
  );
}
