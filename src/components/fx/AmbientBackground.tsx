import { GlowOrb } from "./GlowOrb";

/**
 * Single ambient light layer for the whole page.
 * Renders absolute inset-0 inside <main>, scrolls with the page, sits at z-0,
 * pointer-events-none. Each orb is placed by % of the document height so its
 * glow bleeds across section boundaries.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{ overflow: "visible" }}
    >
      {/* Hero — top right */}
      <GlowOrb
        size={900}
        style={{ top: "5%", right: "-10%", opacity: 0.9 }}
      />
      {/* O Medo — left */}
      <GlowOrb
        size={600}
        style={{ top: "18%", left: "-8%", opacity: 0.85 }}
      />
      {/* Resultados — right */}
      <GlowOrb
        size={700}
        style={{ top: "45%", right: "-12%", opacity: 0.9 }}
      />
      {/* Precisão — left (this is the one previously clipped) */}
      <GlowOrb
        size={800}
        style={{ top: "58%", left: "-10%", opacity: 1 }}
      />
      {/* Depoimentos — right */}
      <GlowOrb
        size={500}
        style={{ top: "72%", right: "-6%", opacity: 0.8 }}
      />
      {/* CTA final — central */}
      <GlowOrb
        size={1000}
        style={{
          top: "88%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 1,
        }}
      />
    </div>
  );
}
