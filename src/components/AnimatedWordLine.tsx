"use client";

export function AnimatedWordLine({
  line,
  wordClassName = "reveal-word",
  className,
}: {
  line: string;
  wordClassName?: string;
  className?: string;
}) {
  const words = line.split(" ");

  return (
    <p className={className}>
      {words.map((word, wordIndex) => (
        <span
          key={`${line}-${wordIndex}`}
          className="hero-word-mask inline-block align-top"
        >
          <span className={`${wordClassName} inline-block will-change-transform`}>
            {word}
            {wordIndex < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </p>
  );
}
