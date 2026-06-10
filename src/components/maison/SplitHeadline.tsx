import { createElement } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type Segment = { text: string; gold?: boolean };

export function SplitHeadline({
  lines,
  className,
  as = "h1",
}: {
  lines: Segment[][];
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return createElement(
      as,
      { className },
      lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((seg, si) => (
            <span key={si} className={seg.gold ? "gold-text" : undefined}>
              {seg.text}
            </span>
          ))}
        </span>
      )),
    );
  }

  let charIndex = 0;
  return createElement(
    as,
    { className },
    lines.map((line, li) => (
      <span key={li} className="block overflow-hidden">
        <span className="inline-block">
          {line.map((seg, si) => (
            <span key={si} className={seg.gold ? "gold-text" : undefined}>
              {Array.from(seg.text).map((ch, ci) => {
                const i = charIndex++;
                return (
                  <motion.span
                    key={`${li}-${si}-${ci}`}
                    className="inline-block"
                    style={{ whiteSpace: "pre" }}
                    initial={{ y: "110%" }}
                    whileInView={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    viewport={{ margin: "-15% 0px -15% 0px", once: false }}
                    transition={{ duration: 0.9, ease: EASE, delay: i * 0.03 }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </span>
      </span>
    )),
  );
}
