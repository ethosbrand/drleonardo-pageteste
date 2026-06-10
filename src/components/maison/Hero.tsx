import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { SplitHeadline } from "./SplitHeadline";
import { Reveal } from "./Reveal";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPlate = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const rotPlate = useTransform(scrollYProgress, [0, 1], [0, 2]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden pt-32 md:pt-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 md:px-10">
        <motion.div
          style={reduce ? undefined : { y: yText }}
          className="col-span-12 md:col-span-7 lg:col-span-7"
        >
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 hairline-gold" />
              <span className="eyebrow">Lentes autorais em resina, São Paulo</span>
            </div>
          </Reveal>

          <div className="mt-8 md:mt-10">
            <SplitHeadline
              as="h1"
              className="font-display text-[42px] leading-[1.02] tracking-[-0.02em] sm:text-[58px] md:text-[78px] lg:text-[92px]"
              lines={[
                [{ text: "Um sorriso " }, { text: "esculpido", gold: true }],
                [{ text: "à mão livre, " }],
                [{ text: "em " }, { text: "uma única sessão.", gold: true }],
              ]}
            />
          </div>

          <Reveal delay={0.15}>
            <p className="mt-10 max-w-xl text-[15px] leading-[1.8] text-[color:var(--muted-text)] md:text-base">
              Trabalho clínico autoral em resina composta, conduzido pelo Dr. Leonardo Gomes para
              pacientes que valorizam discrição, longevidade e desenho feito sob medida para o próprio rosto.
              Sem desgaste dental. Sem pressa. Sem padrão.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <a
                href="#conversa"
                className="group relative inline-flex items-center gap-4 px-7 py-4 text-[11px] uppercase tracking-[0.35em]"
                style={{ border: "1px solid rgba(217,180,91,0.35)" }}
              >
                <span className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100 gold-bg" style={{ mixBlendMode: "overlay" }} />
                <span className="gold-text">Solicitar conversa</span>
                <span className="h-px w-6 gold-bg" />
              </a>
              <a href="#atelier" className="text-[11px] uppercase tracking-[0.35em] text-[color:var(--muted-text)] transition-colors duration-500 hover:text-[color:var(--ivory)]">
                Conhecer o atelier
              </a>
            </div>
          </Reveal>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { y: yPlate, rotate: rotPlate }}
          className="col-span-12 md:col-span-5 lg:col-span-5"
        >
          <Reveal delay={0.2}>
            <div
              className="relative ml-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden"
              style={{
                background:
                  "radial-gradient(120% 80% at 30% 20%, rgba(246,231,193,0.10) 0%, rgba(20,18,16,0) 60%), linear-gradient(160deg, #18150F 0%, #0E0C0A 100%)",
                border: "1px solid var(--hairline)",
                borderRadius: 4,
              }}
            >
              <div className="absolute inset-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">N° 001</span>
                  <span className="font-display italic text-[color:var(--muted-text)]">série autoral</span>
                </div>
                <div>
                  <div className="h-px w-full hairline-gold" />
                  <p className="mt-4 font-display italic text-2xl text-[color:var(--ivory)]">
                    Estudo facial,<br />escultura direta.
                  </p>
                </div>
              </div>
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl gold-bg" />
            </div>
          </Reveal>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="eyebrow">role para descobrir</span>
      </div>
    </section>
  );
}
