import { Reveal } from "./Reveal";
import { SplitHeadline } from "./SplitHeadline";
import { Icon } from "./Icon";

const specs = [
  { label: "Material", value: "Resina nano-híbrida" },
  { label: "Técnica", value: "Escultura direta" },
  { label: "Desgaste", value: "Zero, totalmente reversível" },
  { label: "Sessão", value: "Única, em estúdio" },
  { label: "Polimento", value: "Espelhado, em camadas" },
  { label: "Garantia", value: "Acompanhamento anual vitalício" },
];

export function Materials() {
  return (
    <section id="materiais" className="relative py-32 md:py-44" style={{ backgroundColor: "#0E0C0A" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="font-display italic text-[120px] leading-none gold-text">04</span>
                <span className="eyebrow">Materiais</span>
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <SplitHeadline
              as="h2"
              className="font-display text-[34px] leading-[1.15] tracking-[-0.015em] sm:text-[44px] md:text-[56px]"
              lines={[
                [{ text: "A " }, { text: "matéria-prima", gold: true }, { text: "," }],
                [{ text: "e o que se faz dela." }],
              ]}
            />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <dl className="grid grid-cols-1 sm:grid-cols-2">
                {specs.map((s, i) => (
                  <div
                    key={s.label}
                    className="border-b py-7"
                    style={{
                      borderColor: "var(--hairline)",
                      borderTop: i < 2 ? "1px solid var(--hairline)" : undefined,
                    }}
                  >
                    <dt className="eyebrow">{s.label}</dt>
                    <dd className="mt-3 font-display italic text-2xl text-[color:var(--ivory)]">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-5">
            <Reveal delay={0.15}>
              <div
                className="relative aspect-[4/5] w-full overflow-hidden"
                style={{
                  background:
                    "radial-gradient(140% 90% at 70% 30%, rgba(246,231,193,0.12) 0%, rgba(14,12,10,0) 60%), linear-gradient(150deg, #1A1612 0%, #0B0A08 100%)",
                  border: "1px solid var(--hairline)",
                  borderRadius: 4,
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <span className="eyebrow">Macro · estúdio</span>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-32 w-32">
                      <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(217,180,91,0.5)" }} />
                      <div className="absolute inset-3 rounded-full" style={{ border: "1px solid rgba(217,180,91,0.25)" }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="seal" size={48} />
                      </div>
                    </div>
                    <p className="text-center font-display italic text-base gold-text">
                      Feito à mão, sessão única
                    </p>
                  </div>
                  <div>
                    <div className="h-px w-full hairline-gold" />
                    <p className="mt-4 text-[12px] tracking-[0.2em] uppercase text-[color:var(--muted-text)]">
                      Atelier privado · Dr. Leonardo Gomes
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
