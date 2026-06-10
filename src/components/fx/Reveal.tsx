import type { CSSProperties, ReactNode } from "react";
import { useInViewToggle } from "@/hooks/useInViewToggle";

type Direction = "up" | "left" | "right";

type Props = {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  distance?: number;
  className?: string;
};

function offsetFor(direction: Direction, distance: number) {
  if (direction === "up") return `translateY(${distance}px)`;
  if (direction === "left") return `translateX(${distance}px)`;
  return `translateX(${-distance}px)`;
}

/**
 * IMPORTANT: default state (no `data-reveal` attribute) is fully visible.
 * The "pending" attribute is only added AFTER the observer is registered
 * (mounted=true & not in view yet). If JS fails the children stay visible.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 32,
  className,
}: Props) {
  const { ref, mounted, inView } = useInViewToggle<HTMLDivElement>();

  const state = !mounted ? undefined : inView ? "in" : "pending";

  const style = {
    ["--reveal-from" as string]: offsetFor(direction, distance),
    ["--reveal-delay" as string]: `${delay}s`,
  } as CSSProperties;

  return (
    <div ref={ref} data-reveal={state} className={className} style={style}>
      {children}
    </div>
  );
}
