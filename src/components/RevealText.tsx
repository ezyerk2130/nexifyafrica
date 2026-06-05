type RevealSegment = {
  text: string;
  className?: string;
  italic?: boolean;
  keepTogether?: boolean;
};

type RevealTextProps = {
  segments: readonly RevealSegment[];
  className?: string;
  block?: boolean;
};

function RevealWords({
  text,
  className,
  italic = false,
  keepTogether = false,
}: RevealSegment) {
  const trimmed = text.trim();
  const words = keepTogether
    ? trimmed
      ? [trimmed]
      : []
    : trimmed.split(/\s+/).filter(Boolean);

  return (
    <>
      {words.map((word, wordIndex) => (
        <span
          key={`${text}-${wordIndex}`}
          className="hero-word-mask inline-block align-top"
        >
          <span
            className={`hero-word inline-block will-change-transform${className ? ` ${className}` : ""}`}
          >
            {italic ? <em>{word}</em> : word}
            {wordIndex < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </>
  );
}

export default function RevealText({
  segments,
  className,
  block = false,
}: RevealTextProps) {
  return (
    <span className={className}>
      {segments.map((segment, segmentIndex) => {
        const content = <RevealWords {...segment} />;

        if (!block) {
          return <span key={`${segment.text}-${segmentIndex}`}>{content}</span>;
        }

        return (
          <span key={`${segment.text}-${segmentIndex}`} className="block">
            {content}
          </span>
        );
      })}
    </span>
  );
}
