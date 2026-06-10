import { useEffect, useState } from "react";

const NOISE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/>
      <feColorMatrix type='saturate' values='0'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)'/>
  </svg>`,
)}`;

export function NoiseOverlay() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundRepeat: "repeat",
        backgroundSize: mobile ? "480px 480px" : "240px 240px",
        opacity: "var(--noise-opacity)" as any,
        mixBlendMode: "var(--noise-blend)" as any,
      }}
    />
  );
}
