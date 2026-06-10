import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "@/components/fx/Eyebrow";

type Slide = {
  quote: string;
  name: string;
  description: string;
};

// DEPOIMENTO_REAL_AQUI — substituir pelos depoimentos reais dos pacientes.
const SLIDES: Slide[] = [
  {
    // DEPOIMENTO_REAL_AQUI
    quote:
      "Ficou exatamente como eu queria: natural. Ninguém percebeu o que mudou, só notaram que algo no meu sorriso ficou melhor.",
    name: "Paciente · caso real",
    description: "Facetas naturais",
  },
  {
    // DEPOIMENTO_REAL_AQUI
    quote:
      "O cuidado em cada detalhe me deixou tranquila do começo ao fim. O resultado parece que sempre foi meu.",
    name: "Paciente · caso real",
    description: "Facetas naturais",
  },
  {
    // DEPOIMENTO_REAL_AQUI
    quote:
      "Atendimento atencioso e um trabalho impecável. Saí com a sensação de ter sido realmente ouvida.",
    name: "Paciente · caso real",
    description: "Facetas naturais",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function QuoteMark() {
  return (
    <svg
      width="220"
      height="220"
      viewBox="0 0 120 120"
      fill="none"
      stroke="rgba(242,238,230,0.7)"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M28 78c0-22 10-38 28-46-8 8-12 18-12 28h8c6 0 10 4 10 10v8c0 6-4 10-10 10h-14c-6 0-10-4-10-10Z" />
      <path d="M70 78c0-22 10-38 28-46-8 8-12 18-12 28h8c6 0 10 4 10 10v8c0 6-4 10-10 10H80c-6 0-10-4-10-10Z" />
    </svg>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function Depoimentos() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setI((p) => (p + 1) % SLIDES.length),
    []
  );
  const prev = useCallback(
    () => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length),
    []
  );

  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setTimeout(next, 6000);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [i, paused, next]);

  const s = SLIDES[i];

  return (
    <section
      id="depoimentos"
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 160, paddingBottom: 160 }}
    >
      <div
        className="relative mx-auto w-full px-6"
        style={{ maxWidth: 900 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Aspa gigante posicionada fora da margem esquerda (parcialmente cortada) */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            left: "-110px",
            top: 40,
            opacity: 0.4,
          }}
        >
          <QuoteMark />
        </div>

        <div className="flex flex-col items-start text-left">
          <div className="relative mt-4 w-full" style={{ minHeight: 260 }}>
            <div className="pr-16 sm:pr-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <p
                    className="font-display"
                    style={{
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(24px, 3vw, 38px)",
                      lineHeight: 1.4,
                      letterSpacing: "-0.005em",
                      color: "var(--ivory)",
                      textAlign: "left",
                    }}
                  >
                    {s.quote}
                  </p>
                  <div className="mt-10 flex flex-col items-start gap-3">
                    <span
                      className="font-sans"
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--ivory)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {s.name}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.35em",
                        textTransform: "uppercase",
                        color: "rgba(242,238,230,0.55)",
                      }}
                    >
                      {s.description}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controles: setas + indicadores na mesma linha, alinhados à esquerda */}
          <div className="mt-12 flex w-full items-center gap-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Depoimento anterior"
                onClick={prev}
                className="dep-arrow p-2"
                style={{ color: "var(--ivory)" }}
              >
                <Arrow dir="left" />
              </button>
              <button
                type="button"
                aria-label="Próximo depoimento"
                onClick={next}
                className="dep-arrow dep-arrow-right p-2"
                style={{ color: "var(--ivory)" }}
              >
                <Arrow dir="right" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              {SLIDES.map((_, idx) => {
                const active = idx === i;
                return (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Ir para depoimento ${idx + 1}`}
                    onClick={() => setI(idx)}
                    style={{
                      height: 2,
                      width: active ? 40 : 24,
                      background: active
                        ? "linear-gradient(90deg, #F6E7C1 0%, #D9B45B 50%, #8A6A1F 100%)"
                        : "rgba(242,238,230,0.25)",
                      borderRadius: 2,
                      transition:
                        "width 0.5s cubic-bezier(0.22,1,0.36,1), background 0.4s ease",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dep-arrow { transition: color 0.35s ease, transform 0.35s ease; }
        .dep-arrow:hover { color: #D9B45B; transform: translate(-3px, -50%); }
        .dep-arrow-right:hover { transform: translate(3px, -50%); }
      `}</style>
    </section>
  );
}
