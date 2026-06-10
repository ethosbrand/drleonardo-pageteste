import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SplitHeadline } from "./SplitHeadline";

const faqs = [
  {
    q: "Quanto tempo duram as lentes em resina?",
    a: "Com manutenção adequada e retornos anuais, o trabalho permanece estável por muitos anos. A resina nano-híbrida que utilizamos é polida em camadas e reparada com facilidade, sem necessidade de refazer toda a peça.",
  },
  {
    q: "O procedimento é reversível?",
    a: "Sim. Não há desgaste do esmalte natural. A lente é aplicada sobre a estrutura existente, podendo ser ajustada, repolida ou removida sem prejuízo ao dente.",
  },
  {
    q: "Quantas sessões são necessárias?",
    a: "Uma sessão única de escultura, precedida por uma consulta de escuta e uma prova em cera. A entrega final acontece no mesmo dia da escultura.",
  },
  {
    q: "Como é definido o investimento?",
    a: "O valor é apresentado em consulta privada, após estudo facial e definição do número de lentes. Trabalhamos sob consulta, sem tabela pública.",
  },
  {
    q: "Qual a manutenção indicada?",
    a: "Higiene cuidadosa, retornos anuais para repolimento e check-up oclusal. Atendemos os pacientes da casa indefinidamente, sem novo orçamento.",
  },
  {
    q: "Como agendar a primeira conversa?",
    a: "Atendimento por convite ou indicação. Solicite a conversa pelo formulário ao final desta página. Retornamos em até dois dias úteis, em mensagem privada.",
  },
];

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal>
      <div className="border-b" style={{ borderColor: "var(--hairline)" }}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-center justify-between gap-6 py-8 text-left"
          aria-expanded={open}
        >
          <div className="flex items-baseline gap-6">
            <span className="font-display italic gold-text text-base">0{i + 1}</span>
            <span className="font-display text-[22px] leading-snug text-[color:var(--ivory)] md:text-[26px]">
              {q}
            </span>
          </div>
          <span className="relative inline-block h-4 w-4 flex-shrink-0">
            <span className="absolute left-0 top-1/2 h-px w-4 gold-bg" />
            <motion.span
              className="absolute left-0 top-1/2 h-px w-4 gold-bg"
              animate={{ rotate: open ? 0 : 90 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="max-w-2xl pb-10 pl-10 text-[15px] leading-[1.9] text-[color:var(--muted-text)]">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function Faq() {
  return (
    <section className="relative py-32 md:py-44" style={{ backgroundColor: "#0E0C0A" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="font-display italic text-[120px] leading-none gold-text">06</span>
                <span className="eyebrow">Perguntas</span>
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <SplitHeadline
              as="h2"
              className="font-display text-[34px] leading-[1.15] tracking-[-0.015em] sm:text-[44px] md:text-[56px]"
              lines={[
                [{ text: "O que costumam " }],
                [{ text: "perguntar, " }, { text: "antes.", gold: true }],
              ]}
            />
            <div className="mt-16">
              {faqs.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
