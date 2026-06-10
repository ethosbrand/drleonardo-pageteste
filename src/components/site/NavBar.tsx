import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/fx/MagneticButton";

const LINKS = [
  { href: "#medo", label: "O Medo" },
  { href: "#metodo", label: "O Método" },
  { href: "#resultados", label: "Resultados" },
  { href: "#precisao", label: "Precisão" },
  { href: "#faq", label: "FAQ" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [highlight, setHighlight] = useState<{ x: number; w: number; opacity: number }>({
    x: 0,
    w: 0,
    opacity: 0,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = hoverIndex ?? activeIndex;
    const el = linkRefs.current[target];
    const container = navRef.current;
    if (!el || !container) {
      setHighlight((h) => ({ ...h, opacity: 0 }));
      return;
    }
    const c = container.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setHighlight({
      x: r.left - c.left,
      w: r.width,
      opacity: hoverIndex !== null ? 1 : 0,
    });
  }, [hoverIndex, activeIndex, scrolled]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-700"
        style={{
          backgroundColor: scrolled ? "rgba(11,10,8,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-5 md:px-10">
          <a href="#top" className="flex items-baseline gap-3" aria-label="Leonardo Gomes">
            <span
              className="text-[20px] leading-none"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              Leonardo Gomes
            </span>
            <span className="hidden items-baseline gap-3 sm:flex">
              <span
                aria-hidden
                className="inline-block h-[3px] w-[3px] rounded-full"
                style={{ background: "var(--gold-gradient)" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "9px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "var(--muted-text)",
                  fontWeight: 500,
                }}
              >
                Método NAP
              </span>
            </span>
          </a>

          <nav
            ref={navRef}
            onMouseLeave={() => setHoverIndex(null)}
            className="relative hidden items-center lg:flex"
          >
            <span
              aria-hidden
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                height: "32px",
                left: 0,
                width: highlight.w,
                transform: `translate(${highlight.x}px, -50%)`,
                opacity: highlight.opacity,
                background: "rgba(217,180,91,0.10)",
                border: "1px solid rgba(217,180,91,0.25)",
                transition: `transform 0.35s cubic-bezier(0.22,1,0.36,1), width 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease`,
              }}
            />
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                href={l.href}
                onMouseEnter={() => setHoverIndex(i)}
                onClick={() => setActiveIndex(i)}
                className="relative z-10 px-5 py-2 text-[12px] tracking-[0.18em] uppercase transition-colors duration-500"
                style={{
                  color: hoverIndex === i ? "var(--ivory)" : "var(--muted-text)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <MagneticButton
                onClick={() => {
                  const el = document.querySelector("#cta");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="!px-6 !py-3 !text-[11px]"
              >
                Agendar avaliação
              </MagneticButton>
            </div>
            <button
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <motion.span
                aria-hidden
                className="absolute block h-px w-[18px] bg-[color:var(--ivory)]"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.45, ease: EASE }}
              />
              <motion.span
                aria-hidden
                className="absolute block h-px w-[18px] bg-[color:var(--ivory)]"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                transition={{ duration: 0.45, ease: EASE }}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center lg:hidden"
            style={{ backgroundColor: "#0B0A08" }}
          >
            <nav className="flex flex-col items-center gap-8">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => {
                    setOpen(false);
                    setActiveIndex(i);
                  }}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.07 }}
                  className="text-[32px] leading-none"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 + LINKS.length * 0.07 }}
                className="mt-6"
              >
                <MagneticButton
                  onClick={() => {
                    setOpen(false);
                    document.querySelector("#cta")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Agendar avaliação
                </MagneticButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
