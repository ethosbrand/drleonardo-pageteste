import { useEffect } from "react";
import { initLenis } from "@/lib/lenis";

export function LenisProvider() {
  useEffect(() => {
    initLenis();
  }, []);
  return null;
}
