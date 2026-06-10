import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={"inline-flex items-center gap-3 " + (className ?? "")}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "11px",
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: "var(--muted-text)",
        fontWeight: 500,
      }}
    >
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: "24px",
          height: "1px",
          background: "var(--gold-gradient)",
        }}
      />
      {children}
    </span>
  );
}
