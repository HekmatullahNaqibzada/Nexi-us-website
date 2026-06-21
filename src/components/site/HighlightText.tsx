import type { ReactNode } from "react";

/**
 * Parses **word** markers in a translated string and renders the matched
 * segment in the brand primary color.
 * Usage in i18n strings: "Services engineered for **measurable** growth."
 */
export function HighlightText({ text }: { text: string }): ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <span key={i} className="text-primary">{part}</span>
          : part
      )}
    </>
  );
}
