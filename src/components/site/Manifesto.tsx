import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "@/components/fx/Eyebrow";
import { GoldText } from "@/components/fx/GoldText";
import { Reveal } from "@/components/fx/Reveal";
import medo1 from "@/assets/medo-1.png.asset.json";
import medo2 from "@/assets/medo-2.png.asset.json";
import medo3 from "@/assets/medo-3.png.asset.json";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  // IMG_MEDO_N — substituir por foto real ilustrando o medo.
  img: string;
  title: string;
};

const CARDS: Card[] = [
  {
    // IMG_MEDO_1
    img: medo1.url,
    title: "Dentes brancos demais",
  },
  {
    // IMG_MEDO_2
    img: medo2.url,
    title: "Dentes quadrados e sem formato natural do sorriso",
  },
  {
    // IMG_MEDO_3
    img: medo3.url,
    title: "Mal hálito e amarelamento dos dentes",
  },
];

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !lineRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      lineRef.current.style.width = "240px";
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { width: 0 },
        {
          width: 240,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="medo"
      className="relative w-full"
      style={{ paddingTop: 160, paddingBottom: 160, overflowX: "clip" }}
    >
      <div className="relative mx-auto w-full max-w-[1240px] px-6">
        <Eyebrow>O MAIOR MEDO</Eyebrow>

        <Reveal>
          <h2
            className="mt-8 font-display font-light"
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1.12,
              letterSpacing: "-0.015em",
              color: "var(--ivory)",
            }}
          >
            <span className="block">Você quer melhorar o seu sorriso,</span>
            <span className="block">
              mas tem medo de que{" "}
              <em className="not-italic">
                <GoldText>
                  <span style={{ fontStyle: "italic", fontWeight: 300 }}>
                    isso aconteça:
                  </span>
                </GoldText>
              </em>
            </span>
          </h2>
        </Reveal>



        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <article
                className="medo-card group relative h-full overflow-hidden"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 0,
                  transition: "border-color 0.5s ease",
                }}
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "4 / 3", background: "var(--bg)" }}
                >
                  <img
                    src={c.img}
                    alt=""
                    aria-hidden
                    className="h-full w-full"
                    style={{
                      objectFit: "cover",
                      filter: "grayscale(15%) contrast(1.02) brightness(0.92)",
                    }}
                  />
                </div>
                <div style={{ padding: 28 }}>
                  <h3
                    className="font-display font-light"
                    style={{
                      fontSize: 20,
                      lineHeight: 1.25,
                      letterSpacing: "-0.005em",
                      color: "var(--ivory)",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="mt-3 font-sans"
                    style={{
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "var(--muted-text)",
                    }}
                  >
                    {c.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p
            className="font-display font-light"
            style={{
              marginTop: 64,
              fontSize: "clamp(22px, 2.6vw, 32px)",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: "var(--ivory)",
              maxWidth: 880,
            }}
          >
            O trabalho do Dr. Leonardo parte de uma ideia simples:{" "}
            <em className="not-italic">
              <GoldText>
                <span style={{ fontStyle: "italic", fontWeight: 300 }}>
                  transformar sem descaracterizar.
                </span>
              </GoldText>
            </em>
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col items-start gap-5">
          <span
            ref={lineRef}
            aria-hidden
            className="block h-px"
            style={{
              width: 0,
              background:
                "linear-gradient(90deg, #8A6A1F 0%, #D9B45B 50%, #F6E7C1 100%)",
            }}
          />
          <span
            className="text-[11px] uppercase"
            style={{
              letterSpacing: "0.35em",
              color: "rgba(var(--text-rgb), 0.55)",
            }}
          >
            Dr. Leonardo Gomes · CRO-MG 00000
          </span>
        </div>
      </div>

      <style>{`
        .medo-card:hover {
          border-color: rgba(217,180,91,0.30) !important;
        }
      `}</style>
    </section>
  );
}
