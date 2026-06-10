import { Reveal } from "./Reveal";
import { SplitHeadline } from "./SplitHeadline";

const items = [
  {
    quote:
      "Eu queria algo que ninguém percebesse de imediato, mas que mudasse tudo no segundo olhar. Foi exatamente o que recebi.",
    sign: "M. A., paciente desde 2022",
  },
  {
    quote:
      "Há um silêncio raro no consultório do Leonardo. Saí com a sensação de ter sido escutado antes de ter sido tratado.",
    sign: "R. F., empresário, São Paulo",
  },
  {
    quote:
      "Procurei seis profissionais antes. Todos propuseram desgastar meus dentes. Aqui, nada foi removido, e o resultado é o melhor.",
    sign: "C. L., paciente desde 2023",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="font-display italic text-[120px] leading-none gold-text">05</span>
                <span className="eyebrow">Palavra</span>
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <SplitHeadline
              as="h2"
              className="font-display text-[34px] leading-[1.15] tracking-[-0.015em] sm:text-[44px] md:text-[56px]"
              lines={[
                [{ text: "O que dizem " }],
                [{ text: "os que " }, { text: "ficam.", gold: true }],
              ]}
            />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure
                className="flex h-full flex-col justify-between p-10"
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: 4 }}
              >
                <div>
                  <span className="font-display italic gold-text text-5xl leading-none">"</span>
                  <blockquote className="mt-4 font-display italic text-[22px] leading-[1.45] text-[color:var(--ivory)]">
                    {t.quote}
                  </blockquote>
                </div>
                <div className="mt-10">
                  <div className="mb-4 h-px w-10 hairline-gold" />
                  <figcaption className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--muted-text)]">
                    {t.sign}
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
