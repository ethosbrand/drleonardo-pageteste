import { useEffect, useState } from "react";
import { GlowOrb } from "./GlowOrb";

/**
 * Single ambient light layer for the whole page.
 * Mobile: 3 small orbs with reduced blur to keep scroll at 60fps.
 * Desktop: 6 orbs distributed by % of document height.
 */
export function AmbientBackground() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const mobileStyle = {
    willChange: "transform" as const,
    transform: "translateZ(0)",
    filter: "blur(40px)",
  };

  if (mobile) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ overflow: "visible" }}
      >
        <GlowOrb size={400} style={{ top: "5%", right: "-15%", opacity: 0.9, ...mobileStyle }} />
        <GlowOrb size={400} style={{ top: "45%", left: "-15%", opacity: 0.85, ...mobileStyle }} />
        <GlowOrb
          size={400}
          style={{
            top: "88%",
            left: "50%",
            transform: "translateX(-50%) translateZ(0)",
            opacity: 1,
            willChange: "transform",
            filter: "blur(40px)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{ overflow: "visible" }}
    >
      <GlowOrb size={900} style={{ top: "5%", right: "-10%", opacity: 0.9 }} />
      <GlowOrb size={600} style={{ top: "18%", left: "-8%", opacity: 0.85 }} />
      <GlowOrb size={700} style={{ top: "45%", right: "-12%", opacity: 0.9 }} />
      <GlowOrb size={800} style={{ top: "58%", left: "-10%", opacity: 1 }} />
      <GlowOrb size={500} style={{ top: "72%", right: "-6%", opacity: 0.8 }} />
      <GlowOrb
        size={1000}
        style={{ top: "88%", left: "50%", transform: "translateX(-50%)", opacity: 1 }}
      />
    </div>
  );
}
