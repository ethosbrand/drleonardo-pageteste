import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 32,
  as: As = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "span" | "p" | "li";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Component = motion[As];
  if (reduce) {
    return <As className={className}>{children}</As>;
  }
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y, filter: "blur(8px)" }}
      viewport={{ margin: "-20% 0px -20% 0px", once: false }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}
