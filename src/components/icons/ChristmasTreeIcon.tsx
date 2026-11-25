const baubles = [
  { cx: 10.4, cy: 9.6, className: "fill-festive-red" },
  { cx: 13.8, cy: 12.6, className: "fill-festive-gold [--twinkle-delay:-0.8s]" },
  { cx: 9.4, cy: 15.8, className: "fill-festive-gold [--twinkle-delay:-1.6s]" },
  { cx: 13.2, cy: 18.2, className: "fill-festive-red [--twinkle-delay:-1.2s]" },
];

export function ChristmasTreeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M10.5 19.5h3V24h-3Z" className="fill-festive-trunk" />
      <path d="M12 3 16.6 9H14.6L18.6 14.4H16.4L21 20.6H3L7.6 14.4H5.4L9.4 9H7.4Z" className="fill-festive-tree" />
      <path
        d="M12 0 12.9 2 15 2.2 13.4 3.6 13.9 5.7 12 4.6 10.1 5.7 10.6 3.6 9 2.2 11.1 2Z"
        className="fill-festive-gold"
      />
      {baubles.map((bauble) => (
        <circle
          key={`${bauble.cx}-${bauble.cy}`}
          cx={bauble.cx}
          cy={bauble.cy}
          r="1.2"
          className={`motion-safe:animate-twinkle ${bauble.className}`}
        />
      ))}
    </svg>
  );
}
