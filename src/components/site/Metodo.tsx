import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "@/components/fx/Eyebrow";
import { GoldText } from "@/components/fx/GoldText";
import { Reveal } from "@/components/fx/Reveal";
import { SplitHeading } from "@/components/fx/SplitHeading";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  num: string;
  kicker: string;
  title: string;
  body: string;
  Icon: () => React.ReactElement;
};

function GoldStroke({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F6E7C1" />
        <stop offset="45%" stopColor="#D9B45B" />
        <stop offset="100%" stopColor="#8A6A1F" />
      </linearGradient>
    </defs>
  );
}

function IconStudy() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="url(#g-study)" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <GoldStroke id="g-study" />
      <path d="M14 6c5 0 9 4 9 10 0 3-1 6-3 8-1 1-1 2-1 3v5c0 1-1 2-2 2h-4c-1 0-2-1-2-2v-3c0-1 0-2-1-3-3-2-5-5-5-9 0-6 4-11 9-11Z" />
      <circle cx="27" cy="22" r="6" />
      <path d="M31.5 26.5 36 31" />
    </svg>
  );
}

function IconSculpt() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="url(#g-sculpt)" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <GoldStroke id="g-sculpt" />
      <path d="M5 32c6-2 11-5 15-9" />
      <path d="M4 35c8-1 16-5 22-11" />
      <path d="m22 16 8-8 4 4-8 8-5 1Z" />
      <path d="m17 21 5-5 4 4-5 5-5-1 1-3Z" />
    </svg>
  );
}

function IconDiamond() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="url(#g-diamond)" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
      <GoldStroke id="g-diamond" />
      <path d="M8 15h24L20 35 8 15Z" />
      <path d="M8 15l4-8h16l4 8" />
      <path d="M12 7l3 8M28 7l-3 8M14 15l6 20M26 15l-6 20M8 15h24" />
    </svg>
  );
}

const STEPS: Step[] = [
  {
    num: "01",
    kicker: "Estudo",
    title: "Análise do rosto e do sorriso",
    body:
      "Fotografias, vídeo da sua fala e planejamento digital. Antes de tocar em qualquer dente, você visualiza o resultado e aprova cada detalhe do desenho.",
    Icon: IconStudy,
  },
  {
    num: "02",
    kicker: "Escultura",
    title: "Resina aplicada à mão, fio a fio",
    body:
      "Sem desgaste agressivo do dente. Camadas de resina premium são esculpidas diretamente sobre o esmalte, reproduzindo translucidez, textura e anatomia naturais.",
    Icon: IconSculpt,
  },
  {
    num: "03",
    kicker: "Refinamento",
    title: "Polimento, brilho e acompanhamento",
    body:
      "Ajuste fino da textura e do brilho em sessão dedicada, com retornos programados. O trabalho só termina quando o sorriso parece ter nascido com você.",
    Icon: IconDiamond,
  },
];

export function Metodo() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (progressRef.current && !reduce) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 70%",
              scrub: 0.6,
            },
          }
        );
      } else if (progressRef.current && reduce) {
        progressRef.current.style.transform = "scaleY(1)";
      }

      const triggers: ScrollTrigger[] = [];
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const t = ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
        triggers.push(t);
      });
      return () => triggers.forEach((t) => t.kill());
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="metodo"
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 160, paddingBottom: 160 }}
    >
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* LEFT */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[120px]">
              <Eyebrow>O MÉTODO</Eyebrow>
              <div className="mt-8">
                <h2
                  className="font-display font-light"
                  style={{
                    fontSize: "clamp(36px, 4.5vw, 56px)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.015em",
                  }}
                >
                  <SplitHeading as="span" text="Três atos, um sorriso " />
                  <em className="not-italic">
                    <GoldText>
                      <span style={{ fontStyle: "italic", fontWeight: 300 }}>
                        irrepetível.
                      </span>
                    </GoldText>
                  </em>
                </h2>
              </div>

              <div className="mt-12 hidden lg:block" style={{ height: 120 }}>
                <div className="relative h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={STEPS[active].num}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 font-display"
                      style={{ fontSize: 96, lineHeight: 1, fontWeight: 300 }}
                    >
                      <GoldText>{STEPS[active].num}</GoldText>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE progress line */}
          <div className="pointer-events-none absolute left-1/2 top-[160px] bottom-[160px] hidden w-px -translate-x-1/2 lg:block">
            <span
              aria-hidden
              className="absolute inset-0 block"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
            <span
              ref={progressRef}
              aria-hidden
              className="absolute inset-0 block origin-top"
              style={{
                background:
                  "linear-gradient(180deg, #F6E7C1 0%, #D9B45B 50%, #8A6A1F 100%)",
                transform: "scaleY(0)",
              }}
            />
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.num} direction="right" delay={i * 0.12}>
                  <article
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="metodo-card group relative overflow-hidden"
                    style={{
                      background: "#141210",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 24,
                      padding: 48,
                      transition: "border-color 0.5s ease, box-shadow 0.5s ease",
                    }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 30%, rgba(217,180,91,0.10) 0%, rgba(217,180,91,0) 60%)",
                      }}
                    />
                    <div className="relative">
                      <s.Icon />
                      <div
                        className="mt-8 font-display"
                        style={{
                          fontSize: 14,
                          letterSpacing: "0.18em",
                          fontWeight: 400,
                        }}
                      >
                        <GoldText>
                          {s.num} · {s.kicker}
                        </GoldText>
                      </div>
                      <h3
                        className="mt-4 font-display font-light"
                        style={{
                          fontSize: 28,
                          lineHeight: 1.2,
                          letterSpacing: "-0.01em",
                          color: "var(--ivory)",
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="mt-5 font-sans"
                        style={{
                          fontSize: 16,
                          lineHeight: 1.65,
                          color: "#A39C8E",
                          maxWidth: 520,
                        }}
                      >
                        {s.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .metodo-card:hover {
          border-color: rgba(217,180,91,0.35) !important;
        }
      `}</style>
    </section>
  );
}
