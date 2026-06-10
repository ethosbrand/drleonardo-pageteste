import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "@/components/fx/Eyebrow";
import { Reveal } from "@/components/fx/Reveal";
import { SplitHeading } from "@/components/fx/SplitHeading";

type QA = { q: string; a: string };

const ITEMS: QA[] = [
  {
    q: "Vou precisar desgastar meus dentes?",
    a: "Depende do caso. Em muitas situações é possível realizar facetas sem nenhum desgaste dental. Essa é uma das prioridades do Método NAP.",
  },
  {
    q: "O resultado fica artificial?",
    a: "O foco do método é exatamente o oposto: criar um sorriso natural, harmônico e compatível com o seu rosto. Transformar sem descaracterizar.",
  },
  {
    q: "Preciso fazer todos os dentes?",
    a: "Não necessariamente. Cada planejamento é individual e considera apenas o que realmente precisa ser melhorado no seu sorriso.",
  },
  {
    q: "Quanto tempo dura?",
    a: "A durabilidade depende do material, dos seus hábitos e das manutenções recomendadas. Tudo isso é explicado com clareza na avaliação.",
  },
  {
    q: "Por que a avaliação é tão importante?",
    a: "Porque é nela que o Dr. Leonardo entende o seu caso, identifica as possibilidades reais e indica o melhor caminho. Nenhuma decisão é tomada antes disso.",
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
      className="relative w-full"
      style={{ paddingTop: 160, paddingBottom: 160, overflowX: "clip" }}
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
                        borderBottom: "1px solid var(--border)",
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
                                color: "var(--muted-text)",
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
