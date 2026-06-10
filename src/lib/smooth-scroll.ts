import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (typeof window === "undefined") return null;
  if (lenis) return lenis;

  gsap.registerPlugin(ScrollTrigger);

  // Respect reduced motion + skip Lenis on touch / narrow viewports.
  // Native scroll feels better on mobile and avoids jank from the rAF loop
  // running on top of huge blurred orbs / scrub triggers.
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const noHover = window.matchMedia("(hover: none)").matches;
  const narrow = window.matchMedia("(max-width: 1023px)").matches;
  if (reduce || noHover || narrow) {
    // ScrollTrigger updates automatically on native scroll — nothing else needed.
    return null;
  }

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
