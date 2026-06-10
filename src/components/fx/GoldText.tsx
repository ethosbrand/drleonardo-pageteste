import type { ReactNode } from "react";

export function GoldText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={"gold-text " + (className ?? "")}>{children}</span>;
}
