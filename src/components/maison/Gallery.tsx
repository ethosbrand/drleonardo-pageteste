import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";
import { SplitHeadline } from "./SplitHeadline";

const cases = [
  { id: "01", title: "Reabilitação anterior", note: "Quatro lentes, sessão única" },
  { id: "02", title: "Fechamento de diastema", note: "Duas lentes, desenho original" },
  { id: "03", title: "Harmonia de proporção", number: "Oito lentes, estudo facial" },
  { id: "04", title: "Reanatomização", note: "Seis lentes, restauro autoral" },
];

function CaseCard({ id, title, note }: { id: string; title: string; note?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const inner = el.querySelector("[data-blur]") as HTMLElement | null;
    if (!inner) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { filter: "blur(7px)", scale: 1.08 },
        {
          filter: "blur(0px)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "center 50%",
            scrub: 1,
          },
        },
      );
      gsap.fromTo(
        inner,
        { filter: "blur(0px)", scale: 1 },
        {
          filter: "blur(7px)",
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "center 50%",
            end: "bottom 15%",
            scrub: 1,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="group relative overflow-hidden" style={{ border: "1px solid var(--hairline)", borderRadius: 4 }}>
      <div
        data-blur
        className="relative aspect-[4/5] w-full"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 30%, rgba(246,231,193,0.08) 0%, rgba(20,18,16,0) 65%), linear-gradient(160deg, #1A1612 0%, #0E0C0A 100%)",
        }}
      >
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="relative flex items-end p-6">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 text-center">
              <span className="eyebrow">antes</span>
            </div>
          </div>
          <div className="relative flex items-end p-6" style={{ borderLeft: "1px solid var(--hairline)" }}>
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 text-center">
              <span className="font-display italic gold-text text-lg">depois</span>
            </div>
          </div>
        </div>
        <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-20 blur-3xl gold-bg" />
      </div>
      <div className="flex items-end justify-between p-6">
        <div>
          <span className="eyebrow">Caso {id}</span>
          <p className="mt-2 font-display italic text-xl text-[color:var(--ivory)]">{title}</p>
        </div>
        <span className="text-[11px] text-[color:var(--muted-text)] text-right max-w-[120px]">{note}</span>
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <section id="galeria" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="font-display italic text-[120px] leading-none gold-text">03</span>
                <span className="eyebrow">Galeria</span>
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <SplitHeadline
              as="h2"
              className="font-display text-[34px] leading-[1.15] tracking-[-0.015em] sm:text-[44px] md:text-[56px]"
              lines={[
                [{ text: "Casos " }, { text: "selecionados,", gold: true }],
                [{ text: "publicados com permissão." }],
              ]}
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.85] text-[color:var(--muted-text)]">
                Por respeito à privacidade de cada paciente, exibimos apenas registros autorizados.
                Em consulta, apresentamos o portfólio completo, com casos próximos do seu.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {cases.map((c) => (
            <CaseCard key={c.id} id={c.id} title={c.title} note={c.note} />
          ))}
        </div>
      </div>
    </section>
  );
}
