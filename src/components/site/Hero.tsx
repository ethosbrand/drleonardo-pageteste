import { motion, useReducedMotion } from "framer-motion";
import { createElement } from "react";
import { GoldBeams } from "@/components/fx/GoldBeams";
import { GlowOrb } from "@/components/fx/GlowOrb";
import { Eyebrow } from "@/components/fx/Eyebrow";
import { GoldText } from "@/components/fx/GoldText";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { SplitHeading } from "@/components/fx/SplitHeading";

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
        style={{ background: "rgba(255,255,255,0.08)" }}
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

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 pt-32 pb-20 md:px-10"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
      >
        <GoldBeams intensity={1} />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: EASE, delay: 0.2 }}
      >
        <GlowOrb
          size={900}
          style={{ marginTop: "-120px" }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center text-center">
        <Fade delay={0.3}>
          <Eyebrow>Lentes em resina esculpidas à mão</Eyebrow>
        </Fade>

        <div className="mt-10">
          <SplitHeading
            as="h1"
            text="O sorriso é a sua"
            className="leading-[1.05]"
            stagger={0.03}
            delay={0.5}
          />
          <h1
            aria-hidden
            className="sr-only"
          >
            O sorriso é a sua assinatura.
          </h1>
          {/* second line with gold italic word */}
          <div
            className="mt-1"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(44px, 7vw, 96px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="inline-block overflow-hidden align-bottom" style={{ lineHeight: 1 }}>
              {reduce ? (
                <span>assinatura.</span>
              ) : (
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: EASE, delay: 1.05 }}
                >
                  <GoldText>
                    <em style={{ fontStyle: "italic", fontWeight: 300 }}>assinatura.</em>
                  </GoldText>
                </motion.span>
              )}
            </span>
          </div>
        </div>

        {/* Hidden h1 styling to apply font sizing to first SplitHeading line via global selector is awkward;
            instead, ensure the first SplitHeading uses the same style. We override via className below. */}

        <Fade delay={1.4} className="mt-8 max-w-[560px]">
          <p
            style={{
              color: "var(--muted-text)",
              fontSize: "18px",
              lineHeight: 1.7,
              fontFamily: "var(--font-sans)",
            }}
          >
            Cada lente é desenhada para o seu rosto e esculpida fio a fio em resina premium.
            Sem catálogo, sem sorriso de prateleira: um trabalho autoral, feito uma única vez,
            para uma única pessoa.
          </p>
        </Fade>

        <Fade delay={1.7} className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <MagneticButton
            onClick={() => document.querySelector("#conversa")?.scrollIntoView({ behavior: "smooth" })}
          >
            Solicitar avaliação privada
          </MagneticButton>
          <a
            href="#metodo"
            className="group relative inline-flex items-center gap-3 text-[13px] tracking-[0.18em] uppercase"
            style={{
              color: "var(--ivory)",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              paddingBottom: "6px",
            }}
          >
            <span className="relative">
              Conhecer o método
              <span
                aria-hidden
                className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                style={{
                  background: "var(--gold-gradient)",
                  transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </span>
            <Arrow />
          </a>
        </Fade>

        <Fade delay={2} className="mt-10">
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--muted-text)",
              fontWeight: 500,
            }}
          >
            Agenda limitada
            <span style={{ color: "#D9B45B", margin: "0 12px" }}>·</span>
            Atendimento individual
          </span>
        </Fade>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
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
