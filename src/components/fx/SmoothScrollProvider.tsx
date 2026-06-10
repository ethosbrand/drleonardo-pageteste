import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/smooth-scroll";

export function SmoothScrollProvider() {
  useEffect(() => {
    initSmoothScroll();
  }, []);
  return null;
}
