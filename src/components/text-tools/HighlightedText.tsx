function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function HighlightedText({ text, phrases }: { text: string; phrases: string[] }) {
  if (!phrases.length) return <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{text}</p>;

  const pattern = new RegExp(`(${phrases.map(escapeRegExp).join("|")})`, "gi");
  const lowered = new Set(phrases.map((phrase) => phrase.toLowerCase()));

  return (
    <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
      {text.split(pattern).map((part, index) =>
        lowered.has(part.toLowerCase()) ? (
          <mark key={index} className="rounded-[4px] bg-warning-soft px-0.5 text-warning">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </p>
  );
}
