import type { SVGProps } from "react";

export function AiTagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M3 12.2V4.5A1.5 1.5 0 0 1 4.5 3h7.7l8.8 8.8a1.5 1.5 0 0 1 0 2.1l-7.1 7.1a1.5 1.5 0 0 1-2.1 0z" />
      <circle cx="7.6" cy="7.6" r="1.4" fill="currentColor" stroke="none" />
      <path d="M11 16.5l2.2-5 2.2 5M11.8 14.8h2.8" strokeWidth={1.6} />
    </svg>
  );
}
