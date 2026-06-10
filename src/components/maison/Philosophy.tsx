import { Reveal } from "./Reveal";
import { SplitHeadline } from "./SplitHeadline";
import { Icon } from "./Icon";

const principles = [
  {
    icon: "leaf" as const,
    title: "Conservador",
    body: "Nenhum esmalte é desgastado. A estrutura natural permanece intacta, sempre reversível.",
  },
  {
    icon: "hand" as const,
    title: "Artesanal",
    body: "Cada lente é esculpida diretamente em boca, sem moldes industriais, sem laboratório terceirizado.",
  },
  {
    icon: "hourglass" as const,
    title: "Singular",
    body: "Uma sessão. Um par de mãos. O desenho nasce do seu rosto, não de um catálogo.",
  },
];

export function Philosophy() {
  return (
    <section id="filosofia" className="relative py-32 md:py-44">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 md:px-10">
        <div className="col-span-12 md:col-span-4">
          <Reveal>
            <div className="flex items-baseline gap-5">
              <span className="font-display italic text-[120px] leading-none gold-text">01</span>
              <span className="eyebrow">Filosofia</span>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-8">
          <SplitHeadline
            as="h2"
            className="font-display text-[34px] leading-[1.15] tracking-[-0.015em] sm:text-[44px] md:text-[56px]"
            lines={[
              [{ text: "Não fazemos " }, { text: "muitos sorrisos." }],
              [{ text: "Fazemos " }, { text: "o seu.", gold: true }],
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-2xl text-[15px] leading-[1.9] text-[color:var(--muted-text)] md:text-base">
              A clínica é silenciosa por escolha. Atende poucos casos por mês, com tempo de estúdio,
              não de consultório. Cada paciente é estudado pelo arquiteto do próprio sorriso, em conversa,
              em fotografia, em prova. A entrega acontece quando o rosto reconhece o desenho como seu.
            </p>
          </Reveal>

          <div className="mt-20 grid grid-cols-1 gap-px sm:grid-cols-3" style={{ backgroundColor: "var(--hairline)" }}>
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="h-full bg-[color:var(--background)] p-8">
                  <Icon name={p.icon} size={32} />
                  <h3 className="mt-8 font-display italic text-2xl">{p.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.8] text-[color:var(--muted-text)]">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
