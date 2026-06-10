import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "@/components/fx/Eyebrow";


gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "Quase todo mundo que pensa em facetas tem o mesmo medo: ficar artificial. Dentes brancos demais, volumosos, padronizados, iguais aos de todo mundo. O trabalho do Dr. Leonardo parte de uma ideia simples: transformar sem descaracterizar.";

// Phrases that should glow in gold instead of ivory.
const GOLD_PHRASES = ["ficar artificial", "transformar sem descaracterizar"];

type Token = { text: string; gold: boolean };

function tokenize(text: string): Token[] {
  // Mark character ranges covered by gold phrases, then split by word boundaries.
  const goldMask = new Array(text.length).fill(false);
  for (const phrase of GOLD_PHRASES) {
    let idx = text.indexOf(phrase);
    while (idx !== -1) {
      for (let i = idx; i < idx + phrase.length; i++) goldMask[i] = true;
      idx = text.indexOf(phrase, idx + phrase.length);
    }
  }
  const tokens: Token[] = [];
  const regex = /\S+/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    const start = m.index;
    const isGold = goldMask[start];
    tokens.push({ text: m[0], gold: isGold });
  }
  return tokens;
}

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  const tokens = tokenize(TEXT);

  useEffect(() => {
    const paragraph = paragraphRef.current;
    const section = sectionRef.current;
    if (!paragraph || !section) return;

    const words = paragraph.querySelectorAll<HTMLSpanElement>("[data-word]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: snap to final state, no scrub.
    if (reduce) {
      words.forEach((el) => {
        const isGold = el.dataset.gold === "true";
        el.style.color = isGold ? "transparent" : "#F2EEE6";
        el.style.backgroundSize = isGold ? "100% 100%" : "0% 100%";
      });
      if (lineRef.current) lineRef.current.style.width = "240px";
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "center 40%",
          scrub: 0.5,
        },
      });
      tl.fromTo(
        words,
        { color: "rgba(242,238,230,0.14)", backgroundSize: "0% 100%" },
        {
          color: (_i, el) =>
            (el as HTMLElement).dataset.gold === "true"
              ? "rgba(242,238,230,0)"
              : "#F2EEE6",
          backgroundSize: (_i, el) =>
            (el as HTMLElement).dataset.gold === "true" ? "100% 100%" : "0% 100%",
          ease: "none",
          duration: 1,
          stagger: { each: 1, from: "start" },
        }
      );
      // Tail padding so the last word finishes by ~85% of scroll progress,
      // leaving ~15% of slack before the trigger's end position.
      const animEnd = (words.length - 1) * 1 + 1;
      tl.to({}, { duration: animEnd * (0.15 / 0.85) });


      if (lineRef.current) {
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
      }
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


      <div className="relative mx-auto w-full max-w-[980px] px-6">
        <Eyebrow>O MAIOR MEDO</Eyebrow>

        <p
          ref={paragraphRef}
          className="mt-10 font-display font-light"
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
          }}
        >
          {tokens.map((t, i) => (
            <span
              key={i}
              data-word
              data-gold={t.gold ? "true" : "false"}
              className={t.gold ? "maison-gold-word" : ""}
              style={{
                display: "inline",
                color: "rgba(242,238,230,0.14)",
                transition: "none",
                backgroundImage: t.gold
                  ? "linear-gradient(120deg, #F6E7C1 0%, #D9B45B 45%, #8A6A1F 100%)"
                  : undefined,
                backgroundRepeat: "no-repeat",
                backgroundSize: "0% 100%",
                WebkitBackgroundClip: t.gold ? "text" : undefined,
                backgroundClip: t.gold ? "text" : undefined,
              }}
            >
              {t.text}
              {i < tokens.length - 1 ? " " : ""}
            </span>
          ))}
        </p>

        <div className="mt-16 flex flex-col items-start gap-5">
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
              color: "rgba(242,238,230,0.55)",
            }}
          >
            Dr. Leonardo Gomes · CRO-MG 00000
          </span>
        </div>
      </div>
    </section>
  );
}
