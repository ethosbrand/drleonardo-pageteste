const ITEMS = [
  "NATURALIDADE",
  "ANATOMIA",
  "PRESERVAÇÃO",
  "PLANEJAMENTO INDIVIDUAL",
  "MICROSCÓPIO ODONTOLÓGICO",
  "MÍNIMO DESGASTE DENTAL",
];

function Diamond() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden
      className="flex-shrink-0"
    >
      <defs>
        <linearGradient id="marquee-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F6E7C1" />
          <stop offset="50%" stopColor="#D9B45B" />
          <stop offset="100%" stopColor="#8A6A1F" />
        </linearGradient>
      </defs>
      <path
        d="M5 1l4 4-4 4-4-4 4-4z"
        fill="none"
        stroke="url(#marquee-gold)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {ITEMS.map((item, i) => (
        <div key={i} className="flex items-center gap-10">
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--muted-text)",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
          <Diamond />
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div
      className="relative w-full" style-clip
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div className="flex py-5" style={{ width: "max-content" }}>
        <div className="marquee-track flex">
          <Row />
          <Row />
        </div>
      </div>
      <style>{`
        .marquee-track {
          animation: maison-marquee 38s linear infinite;
        }
        @keyframes maison-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
