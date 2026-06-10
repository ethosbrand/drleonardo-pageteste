import type { SVGProps } from "react";

type IconName =
  | "listen"
  | "study"
  | "wax"
  | "sculpt"
  | "deliver"
  | "leaf"
  | "diamond"
  | "quill"
  | "seal"
  | "hand"
  | "hourglass"
  | "monogram";

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

const GRAD_ID = "maison-gold-stroke";

function Defs() {
  return (
    <defs>
      <linearGradient id={GRAD_ID} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F6E7C1" />
        <stop offset="45%" stopColor="#D9B45B" />
        <stop offset="100%" stopColor="#8A6A1F" />
      </linearGradient>
    </defs>
  );
}

const stroke = `url(#${GRAD_ID})`;
const common = {
  fill: "none",
  stroke,
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Icon({ name, size = 28, ...rest }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...rest}>
      <Defs />
      {name === "listen" && (
        <g {...common}>
          <path d="M8 16c0-4.5 3.5-8 8-8s8 3.5 8 8v4a3 3 0 0 1-3 3h-1v-7h4" />
          <path d="M8 16v4a3 3 0 0 0 3 3h1v-7H8" />
        </g>
      )}
      {name === "study" && (
        <g {...common}>
          <circle cx="14" cy="14" r="6" />
          <path d="M19 19l5 5" />
          <path d="M11 14h6M14 11v6" />
        </g>
      )}
      {name === "wax" && (
        <g {...common}>
          <path d="M10 7h12l-2 5H12l-2-5z" />
          <path d="M11 12c-2 4-2 9 5 13 7-4 7-9 5-13" />
        </g>
      )}
      {name === "sculpt" && (
        <g {...common}>
          <path d="M6 26l8-8" />
          <path d="M14 18l4-4 4 4-4 4-4-4z" />
          <path d="M18 14l4-4 4 4-4 4" />
        </g>
      )}
      {name === "deliver" && (
        <g {...common}>
          <path d="M6 22l10-14 10 14" />
          <path d="M11 22h10" />
          <circle cx="16" cy="16" r="1.2" fill={stroke} />
        </g>
      )}
      {name === "leaf" && (
        <g {...common}>
          <path d="M8 24c0-9 7-16 16-16 0 9-7 16-16 16z" />
          <path d="M8 24c4-4 8-8 16-16" />
        </g>
      )}
      {name === "diamond" && (
        <g {...common}>
          <path d="M16 6l8 7-8 13-8-13 8-7z" />
          <path d="M8 13h16M12 13l4 13M20 13l-4 13" />
        </g>
      )}
      {name === "quill" && (
        <g {...common}>
          <path d="M24 6c-10 2-15 9-17 20 6-1 11-3 14-7" />
          <path d="M14 19l5 5" />
          <path d="M7 26h6" />
        </g>
      )}
      {name === "seal" && (
        <g {...common}>
          <circle cx="16" cy="16" r="9" />
          <circle cx="16" cy="16" r="5" />
          <path d="M16 11v10M11 16h10" />
        </g>
      )}
      {name === "hand" && (
        <g {...common}>
          <path d="M11 18V9a1.5 1.5 0 0 1 3 0v7" />
          <path d="M14 16V8a1.5 1.5 0 0 1 3 0v8" />
          <path d="M17 16V9a1.5 1.5 0 0 1 3 0v10" />
          <path d="M20 13a1.5 1.5 0 0 1 3 0v8a5 5 0 0 1-5 5h-2c-3 0-5-2-6-5l-2-5c-.5-1.5 1-2.5 2-1.5l1.5 2" />
        </g>
      )}
      {name === "hourglass" && (
        <g {...common}>
          <path d="M9 6h14M9 26h14" />
          <path d="M10 6c0 6 6 8 6 10s-6 4-6 10" />
          <path d="M22 6c0 6-6 8-6 10s6 4 6 10" />
        </g>
      )}
      {name === "monogram" && (
        <g {...common}>
          <path d="M9 7v14a4 4 0 0 0 4 4h2" />
          <path d="M17 7l5 14 5-14" />
        </g>
      )}
    </svg>
  );
}
