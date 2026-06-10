import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (typeof window === "undefined") return null;
  if (lenis) return lenis;

  // Respect reduced motion: skip Lenis entirely so scroll feels native.
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    gsap.registerPlugin(ScrollTrigger);
    return null;
  }

  gsap.registerPlugin(ScrollTrigger);

  lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis() {
  return lenis;
}
