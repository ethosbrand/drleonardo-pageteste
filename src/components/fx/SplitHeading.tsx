import { createElement, type CSSProperties } from "react";
import { useInViewToggle } from "@/hooks/useInViewToggle";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  stagger?: number;
  delay?: number;
};

/**
 * IMPORTANT: default char state (no `data-split-char` attribute) is fully
 * visible. The "pending" state is only applied AFTER the observer is wired,
 * so if JS fails text remains readable.
 */
export function SplitHeading({
  text,
  as = "h2",
  className,
  stagger = 0.03,
  delay = 0,
}: Props) {
  const { ref, mounted, inView } = useInViewToggle<HTMLElement>();
  const state = !mounted ? undefined : inView ? "in" : "pending";

  const lines = text.split("\n");
  let charIndex = 0;

  const content = lines.map((line, li) => {
    const words = line.split(" ");
    return (
      <span key={li} className="block">
        {words.map((word, wi) => (
          <span
            key={`${li}-${wi}`}
            className="inline-block overflow-hidden align-bottom"
            style={{ lineHeight: 1 }}
          >
            <span className="inline-block">
              {Array.from(word).map((ch, ci) => {
                const i = charIndex++;
                const style = {
                  ["--char-delay" as string]: `${delay + i * stagger}s`,
                } as CSSProperties;
                return (
                  <span
                    key={`${li}-${wi}-${ci}`}
                    data-split-char={state}
                    className="inline-block"
                    style={style}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
            {wi < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    );
  });

  return createElement(
    as,
    { className, ref: ref as React.Ref<HTMLElement> },
    content
  );
}
