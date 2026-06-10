import { useEffect, useRef, useState } from "react";

/**
 * Native IntersectionObserver hook with reversible in/out state.
 * Threshold 0.15, no negative rootMargin.
 *
 * IMPORTANT contract: `mounted` flips to true ONLY after the observer is
 * registered. Components must keep their default visible CSS until `mounted`
 * is true; this way, if JS fails or never runs, content remains visible.
 */
export function useInViewToggle<T extends Element = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: snap to visible/final state immediately, skip observer.
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setMounted(true);
      setInView(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setInView(entry.isIntersecting);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    setMounted(true);

    return () => observer.disconnect();
  }, []);

  return { ref, mounted, inView };
}
