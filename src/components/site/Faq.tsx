import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "@/components/fx/Eyebrow";
import { Reveal } from "@/components/fx/Reveal";
import { SplitHeading } from "@/components/fx/SplitHeading";

type QA = { q: string; a: string };

const ITEMS: QA[] = [
  {
    q: "Lente de resina estraga o dente?",
    a: "Não. A técnica que utilizamos é aditiva: a resina é aplicada sobre o esmalte com desgaste mínimo ou nenhum, preservando a estrutura natural do dente.",
  },
  {
    q: "Quanto tempo dura o resultado?",
    a: "Com o acompanhamento programado e os retornos de manutenção, o trabalho se mantém bonito por muitos anos. O brilho é renovado em sessões rápidas de polimento.",
  },
  {
    q: "Vou ficar com sorriso artificial?",
    a: "Esse é exatamente o problema que o trabalho autoral resolve. Cada lente reproduz translucidez, textura e anatomia do dente natural, desenhadas para o seu rosto.",
  },
  {
    q: "Como funciona a avaliação?",
    a: "Uma consulta privada de aproximadamente uma hora: análise do rosto e do sorriso, fotografias, discussão de expectativas e apresentação do planejamento e do investimento.",
  },
  {
    q: "Atendem quem vem de fora da cidade?",
    a: "Sim. Casos de outras cidades são organizados em agenda concentrada, com menos visitas e sessões mais longas, planejadas antes da sua viagem.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      className="relative inline-block"
      style={{
        width: 16,
        height: 16,
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), color 0.4s ease",
        transform: open ? "rotate(45deg)" : "rotate(0deg)",
        color: open ? "#D9B45B" : "var(--ivory)",
      }}
    >
      <span
        className="absolute left-0 top-1/2 block"
        style={{
          width: 16,
          height: 1,
          background: "currentColor",
          transform: "translateY(-0.5px)",
        }}
      />
      <span
        className="absolute left-1/2 top-0 block"
        style={{
          width: 1,
          height: 16,
          background: "currentColor",
          transform: "translateX(-0.5px)",
        }}
      />
    </span>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 160, paddingBottom: 160 }}
    >
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[120px]">
              <Eyebrow>PERGUNTAS FREQUENTES</Eyebrow>
              <h2
                className="mt-8 font-display font-light"
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.015em",
                }}
              >
                <SplitHeading
                  as="span"
                  text={"O que todo paciente pergunta antes de fechar."}
                />
              </h2>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="flex flex-col">
              {ITEMS.map((it, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={it.q} direction="up" delay={i * 0.08}>
                    <li
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-6 py-7 text-left"
                      >
                        <span
                          className="font-display font-light"
                          style={{
                            fontSize: 20,
                            lineHeight: 1.3,
                            letterSpacing: "-0.005em",
                            color: "var(--ivory)",
                          }}
                        >
                          {it.q}
                        </span>
                        <PlusIcon open={isOpen} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            style={{ overflow: "hidden" }}
                          >
                            <p
                              className="pb-7 pr-10 font-sans"
                              style={{
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "#A39C8E",
                              }}
                            >
                              {it.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
