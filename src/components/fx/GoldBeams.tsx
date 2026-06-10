import { useEffect, useState } from "react";

type Props = { intensity?: number; className?: string };

const OFFSETS = [-800, -400, 200, 700];

export function GoldBeams({ intensity = 1, className }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const width = isMobile ? 100 : 150;
  const blur = isMobile ? 15 : 60;

  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 overflow-hidden " + (className ?? "")
      }
    >
      {OFFSETS.map((offset, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2"
          style={{
            width: `${width}px`,
            height: "800px",
            marginLeft: `${offset}px`,
            marginTop: "-400px",
            background:
              "linear-gradient(to top, transparent 5%, rgba(246,231,193,0.9) 90%)",
            borderRadius: "100px",
            filter: `blur(${blur}px)`,
            opacity: 0.16 * intensity,
            transform: "rotate(-15deg)",
          }}
        />
      ))}
    </div>
  );
}
