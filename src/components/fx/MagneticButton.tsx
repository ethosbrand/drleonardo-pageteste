import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  magneticStrength?: number;
  proximity?: number;
};

export function MagneticButton({
  children,
  className,
  magneticStrength = 6,
  proximity = 120,
  onMouseMove,
  onMouseLeave,
  style,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const [noHover, setNoHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (max-width: 767px)");
    const update = () => setNoHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    const noHover =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;
    if (el && !reduce && !noHover) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const range = Math.max(rect.width, rect.height) / 2 + proximity;
      if (dist < range) {
        const pull = 1 - dist / range;
        x.set((dx / range) * magneticStrength * pull * 2);
        y.set((dy / range) * magneticStrength * pull * 2);
      }
      const localX = e.clientX - rect.left;
      el.style.setProperty("--glow-x", `${localX}px`);
    }
    onMouseMove?.(e);
  }

  function handleLeave(e: React.MouseEvent<HTMLButtonElement>) {
    x.set(0);
    y.set(0);
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--glow-x", `${rect.width / 2}px`);
    }
    onMouseLeave?.(e);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={noHover ? onMouseMove : handleMove}
      onMouseLeave={noHover ? onMouseLeave : handleLeave}
      whileHover={reduce || noHover ? undefined : { scale: 1.04, filter: "brightness(1.06)" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        x: noHover ? 0 : sx,
        y: noHover ? 0 : sy,
        background: "var(--gold-gradient)",
        color: "#0B0A08",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        borderRadius: 999,
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        ...style,
      }}
      className={
        "magnetic-btn relative inline-flex items-center justify-center gap-3 px-8 py-4 text-[13px] tracking-[0.18em] uppercase " +
        (className ?? "")
      }
      {...(rest as any)}
    >
      {/* Shimmer auto loop */}
      <span aria-hidden className="magnetic-btn__shimmer pointer-events-none absolute" />
      {/* Mouse glow follow — desktop only */}
      {!noHover && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(140px circle at var(--glow-x, 50%) 50%, rgba(255,255,255,0.55), transparent 65%)",
            mixBlendMode: "soft-light",
            transition: "background 0.4s var(--ease-maison)",
          }}
        />
      )}
      <span className="relative z-10" style={{ whiteSpace: "nowrap" }}>
        {children}
      </span>
    </motion.button>
  );
}
