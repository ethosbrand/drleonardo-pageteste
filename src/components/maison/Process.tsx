import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";
import { SplitHeadline } from "./SplitHeadline";
import { Icon } from "./Icon";

const steps = [
  {
    n: "I",
    icon: "listen" as const,
    title: "Escuta",
    body: "Conversa privada de uma hora. Entendemos a história, o trabalho, o modo como você se mostra ao mundo.",
  },
  {
    n: "II",
    icon: "study" as const,
    title: "Estudo facial",
    body: "Fotografia clínica, análise de proporção áurea, leitura de movimento. O sorriso nasce do rosto inteiro.",
  },
  {
    n: "III",
    icon: "wax" as const,
    title: "Prova em cera",
    body: "Ensaio do novo desenho diretamente em boca. Você vê, sente e aprova antes de qualquer compromisso.",
  },
  {
    n: "IV",
    icon: "sculpt" as const,
    title: "Escultura à mão livre",
    body: "Uma sessão única, em silêncio. Resina aplicada camada por camada, modelada com instrumentos próprios.",
  },
  {
    n: "V",
    icon: "deliver" as const,
    title: "Entrega",
    body: "Polimento espelhado, ajustes finos, registro fotográfico final. Retornos de acompanhamento ao longo do ano.",
  },
];

export function Process() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.8,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="atelier" ref={sectionRef} className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="font-display italic text-[120px] leading-none gold-text">02</span>
                <span className="eyebrow">Atelier</span>
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <SplitHeadline
              as="h2"
              className="font-display text-[34px] leading-[1.15] tracking-[-0.015em] sm:text-[44px] md:text-[56px]"
              lines={[
                [{ text: "Cinco tempos, " }],
                [{ text: "uma " }, { text: "única peça.", gold: true }],
              ]}
            />
          </div>
        </div>

        <div className="relative mt-24 grid grid-cols-12 gap-6">
          <div className="relative col-span-12 md:col-start-3 md:col-span-10">
            <div className="absolute left-[14px] top-0 h-full w-px hairline" />
            <div
              ref={lineRef}
              className="absolute left-[14px] top-0 h-full w-px gold-bg origin-top"
            />

            <ul className="space-y-20">
              {steps.map((s) => (
                <li key={s.n} className="relative pl-16">
                  <span className="absolute left-0 top-1.5 flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: "var(--background)", border: "1px solid rgba(217,180,91,0.4)" }}>
                    <Icon name={s.icon} size={16} />
                  </span>
                  <Reveal>
                    <div className="flex flex-wrap items-baseline gap-6">
                      <span className="font-display italic text-[28px] gold-text">{s.n}</span>
                      <h3 className="font-display text-[28px] tracking-[-0.01em] md:text-[36px]">{s.title}</h3>
                    </div>
                    <p className="mt-4 max-w-2xl text-[15px] leading-[1.9] text-[color:var(--muted-text)]">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
