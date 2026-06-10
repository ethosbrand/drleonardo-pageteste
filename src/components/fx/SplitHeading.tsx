import { createElement } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  stagger?: number;
  delay?: number;
};

export function SplitHeading({
  text,
  as = "h2",
  className,
  stagger = 0.03,
  delay = 0,
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return createElement(as, { className }, text);
  }

  // Split by line breaks, then words, preserving spaces
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
                return (
                  <motion.span
                    key={`${li}-${wi}-${ci}`}
                    className="inline-block"
                    initial={{ y: "110%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ amount: 0.2, margin: "0px 0px -5% 0px", once: false }}
                    transition={{
                      duration: 0.9,
                      ease: EASE,
                      delay: delay + i * stagger,
                    }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
            </span>
            {wi < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    );
  });

  return createElement(as, { className }, content);
}
