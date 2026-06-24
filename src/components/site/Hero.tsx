import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { createElement, useRef } from "react";
import { GoldBeams } from "@/components/fx/GoldBeams";
import { GoldText } from "@/components/fx/GoldText";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { openBookingModal } from "@/components/site/BookingModal";

import fundoLeo from "@/assets/fundo-leo.png.asset.json";
import heroMobile from "@/assets/hero-mobile.png.asset.json";


const EASE = [0.22, 1, 0.36, 1] as const;

function Arrow() {
  return (
    <svg
      width="22"
      height="10"
      viewBox="0 0 22 10"
      fill="none"
      aria-hidden
      className="transition-transform duration-500 group-hover:translate-x-1"
      style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
    >
      <defs>
        <linearGradient id="arrow-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F6E7C1" />
          <stop offset="50%" stopColor="#D9B45B" />
          <stop offset="100%" stopColor="#8A6A1F" />
        </linearGradient>
      </defs>
      <path
        d="M1 5h19M16 1l4 4-4 4"
        stroke="url(#arrow-gold)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScrollIndicator() {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-12 w-px overflow-hidden" aria-hidden>
      <span
        className="absolute inset-0"
        style={{ background: "rgba(var(--text-rgb),0.08)" }}
      />
      {!reduce && (
        <motion.span
          className="absolute left-0 right-0 h-4"
          style={{ background: "var(--gold-gradient)" }}
          initial={{ y: -16 }}
          animate={{ y: 48 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

function Fade({
  children,
  delay = 0,
  y = 24,
  as = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "p" | "span" | "h1";
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return createElement(as, { className }, children);
  const Component = motion[as as "div"];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

// PHOTO_EXPERT — foto real do Dr. Leonardo (landscape, sujeito à direita,
// lado esquerdo já fundido em branco/marfim para receber o texto).
const PHOTO_EXPERT_SRC = fundoLeo.url;

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.7, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative w-full"
      style={{ minHeight: "100vh", overflowX: "clip" }}
    >
      {/* GoldBeams concentrados atrás da foto (direita) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0"
        style={{ right: 0, width: "55%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
      >
        <GoldBeams intensity={0.9} />
      </motion.div>

      {/* FOTO DO EXPERT — camada de fundo absoluta na direita (desktop) /
          metade superior (mobile). Parallax sutil + fade ao sair. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          y: reduce ? 0 : photoY,
          opacity: reduce ? 1 : photoOpacity,
        }}
      >
        <div className="relative h-full w-full">
          {/* PHOTO_EXPERT — desktop */}
          <img
            src={PHOTO_EXPERT_SRC}
            alt=""
            className="hidden h-full w-full lg:block"
            style={{
              objectFit: "cover",
              objectPosition: "right center",
            }}
          />
          {/* PHOTO_EXPERT — mobile */}
          <img
            src={heroMobile.url}
            alt=""
            className="h-full w-full lg:hidden"
            style={{
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
          {/* Reforço sutil do fade-left no desktop para integrar ao fundo do tema */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, rgb(var(--photo-mask-rgb)) 0%, rgba(var(--photo-mask-rgb),0.6) 12%, rgba(var(--photo-mask-rgb),0) 30%)",
            }}
          />
          {/* Mobile: escurece apenas a base onde o texto aparece (a partir de ~50vh) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(var(--photo-mask-rgb),0) 0%, rgba(var(--photo-mask-rgb),0) 50%, rgba(var(--photo-mask-rgb),0.6) 70%, rgb(var(--photo-mask-rgb)) 100%)",
            }}
          />

          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 lg:hidden"
            style={{
              height: "35%",
              background:
                "linear-gradient(180deg, rgba(var(--photo-mask-rgb),0) 0%, rgba(var(--photo-mask-rgb),0.55) 30%, rgb(var(--photo-mask-rgb)) 100%)",
            }}
          />
        </div>
      </motion.div>

      {/* GRID DE CONTEÚDO */}
      <div
        className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-12 px-6 md:px-10"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-span-12 flex flex-col justify-center pt-[55vh] pb-24 lg:col-span-6 lg:pt-32 lg:pb-32">
          <Fade delay={0.5}>
            <h1
              className="m-0"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(32px, 4vw, 64px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginTop: 0,
              }}
            >
              <span className="block" style={{ whiteSpace: "nowrap" }}>
                Transforme o seu
              </span>
              <span className="block" style={{ whiteSpace: "nowrap" }}>
                sorriso{" "}
                <GoldText>
                  <em style={{ fontStyle: "italic", fontWeight: 300 }}>
                    sem perder
                  </em>
                </GoldText>
              </span>
              <span className="block" style={{ whiteSpace: "nowrap" }}>
                <GoldText>
                  <em style={{ fontStyle: "italic", fontWeight: 300 }}>
                    a naturalidade!
                  </em>
                </GoldText>
              </span>
            </h1>
          </Fade>


          <Fade delay={1.4} className="mt-8" >
            <p
              style={{
              color: "var(--text)",
              fontSize: "18px",
              lineHeight: 1.7,
              fontFamily: "var(--font-sans)",
              maxWidth: 620,
              opacity: 0.92,
              }}
            >
              Facetas naturais planejadas pelo Dr. Leonardo Gomes através do
              Método NAP: harmonia, precisão e respeito à sua identidade. Sem
              dentes de catálogo, sem aparência artificial.
            </p>
          </Fade>


          <Fade
            delay={1.7}
            className="hero-ctas mt-12 flex flex-wrap md:flex-nowrap items-center justify-start gap-6"
          >

            <MagneticButton onClick={() => openBookingModal()}>
              Quero agendar minha avaliação
            </MagneticButton>


            <a
              href="#metodo"
              className="group relative inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.18em]"
              style={{
                color: "var(--ivory)",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                paddingBottom: "6px",
              }}
            >
              <span className="relative" style={{ whiteSpace: "nowrap" }}>
                Conhecer o Método NAP
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                  style={{
                    background: "var(--gold-gradient)",
                    transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
              </span>
              <Arrow />
            </a>
          </Fade>
        </div>
      </div>

      {/* Scroll indicator — alinhado à esquerda, junto à margem do conteúdo */}
      <div className="absolute bottom-10 left-6 md:left-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 2.4 }}
        >
          <ScrollIndicator />
        </motion.div>
      </div>
    </section>
  );
}
