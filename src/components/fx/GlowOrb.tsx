import type { CSSProperties } from "react";

type Props = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};

export function GlowOrb({ size = 700, className, style }: Props) {
  return (
    <div
      aria-hidden
      className={"pointer-events-none absolute " + (className ?? "")}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background:
          "radial-gradient(circle, rgba(217,180,91,0.22), transparent 70%)",
        filter: "blur(80px)",
        ...style,
      }}
    />
  );
}
