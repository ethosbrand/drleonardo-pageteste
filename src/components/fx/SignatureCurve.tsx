import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Linha dourada serpenteando que conecta visualmente Manifesto a O Método.
 * Stroke-dashoffset animado com scrub do scroll.
 */
export function SignatureCurve() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    if (reduce) {
      path.style.strokeDashoffset = "0";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top 90%",
          end: "bottom 30%",
          scrub: 0.6,
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none relative mx-auto w-full"
      style={{ height: 280, maxWidth: 1240 }}
    >
      <svg
        width="160"
        height="280"
        viewBox="0 0 160 280"
        fill="none"
        className="absolute left-1/2 top-0 -translate-x-1/2"
      >
        <defs>
          <linearGradient id="sig-curve-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6E7C1" stopOpacity="0.0" />
            <stop offset="15%" stopColor="#F6E7C1" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#D9B45B" />
            <stop offset="85%" stopColor="#8A6A1F" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8A6A1F" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M80 0 C 30 50, 130 100, 80 150 S 30 230, 80 280"
          stroke="url(#sig-curve-gold)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
