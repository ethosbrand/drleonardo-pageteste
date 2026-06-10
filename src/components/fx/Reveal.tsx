import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "left" | "right";

type Props = {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  distance?: number;
  className?: string;
};

function offsetFor(direction: Direction, distance: number) {
  if (direction === "up") return { x: 0, y: distance };
  if (direction === "left") return { x: distance, y: 0 };
  return { x: -distance, y: 0 };
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 32,
  className,
}: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const { x, y } = offsetFor(direction, distance);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ amount: 0.15, margin: "0px 0px -5% 0px", once: false }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
