import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/fx/Eyebrow";
import { GlowOrb } from "@/components/fx/GlowOrb";
import { GoldBeams } from "@/components/fx/GoldBeams";
import { GoldText } from "@/components/fx/GoldText";
import { SplitHeading } from "@/components/fx/SplitHeading";

/* --------------------------- ICONS --------------------------- */

function GoldDef({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F6E7C1" />
        <stop offset="45%" stopColor="#D9B45B" />
        <stop offset="100%" stopColor="#8A6A1F" />
      </linearGradient>
    </defs>
  );
}

const ICON_PROPS = {
  width: 36,
  height: 36,
  viewBox: "0 0 36 36",
  fill: "none",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconChair() {
  return (
    <svg {...ICON_PROPS} stroke="url(#g-chair)">
      <GoldDef id="g-chair" />
      <path d="M9 8c0-1 1-2 2-2h14c1 0 2 1 2 2v10H9V8Z" />
      <path d="M7 18h22v4a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-4Z" />
      <path d="M11 24v6M25 24v6" />
    </svg>
  );
}

function IconHourglass() {
  return (
    <svg {...ICON_PROPS} stroke="url(#g-hour)">
      <GoldDef id="g-hour" />
      <path d="M11 4h14M11 32h14" />
      <path d="M12 4c0 6 12 8 12 14M24 4c0 6-12 8-12 14" />
      <path d="M12 32c0-6 12-8 12-14M24 32c0-6-12-8-12-14" />
    </svg>
  );
}

function IconBubble() {
  return (
    <svg {...ICON_PROPS} stroke="url(#g-bubble)">
      <GoldDef id="g-bubble" />
      <path d="M6 9a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-9l-6 5v-5H9a3 3 0 0 1-3-3V9Z" />
      <path d="M11 16c2-2 4-1 5 0s3 2 5 0 4-1 5 0" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg {...ICON_PROPS} stroke="url(#g-layers)">
      <GoldDef id="g-layers" />
      <path d="M18 5 5 12l13 7 13-7-13-7Z" />
      <path d="M5 18l13 7 13-7" />
      <path d="M5 24l13 7 13-7" />
    </svg>
  );
}

/* --------------------------- CARD --------------------------- */

type Feature = {
  Icon: () => React.ReactElement;
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    Icon: IconChair,
    title: "Sala privativa",
    body:
      "Ambiente individual, sem fluxo de pacientes cruzando o seu horário. A sala é preparada para você antes de cada sessão.",
  },
  {
    Icon: IconHourglass,
    title: "Agenda limitada",
    body:
      "Poucos casos por mês, de propósito. Escultura à mão exige tempo, e tempo não se divide bem.",
  },
  {
    Icon: IconBubble,
    title: "Linha direta",
    body:
      "Acompanhamento direto com o doutor no pós-entrega, sem intermediários e sem protocolo de call center.",
  },
  {
    Icon: IconLayers,
    title: "Materiais de elite",
    body:
      "Resinas e instrumentais importados, escolhidos caso a caso. O material certo para o efeito óptico que o seu sorriso pede.",
  },
];

function GlassCard({ f }: { f: Feature }) {
  return (
    <div
      className="exp-card group relative"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24,
        padding: 40,
        transition:
          "border-color 0.5s ease, transform 0.5s ease, box-shadow 0.5s ease",
      }}
    >
      <f.Icon />
      <h3
        className="mt-7 font-display font-light"
        style={{
          fontSize: 22,
          letterSpacing: "-0.01em",
          color: "var(--ivory)",
          lineHeight: 1.25,
        }}
      >
        {f.title}
      </h3>
      <p
        className="mt-3 font-sans"
        style={{
          fontSize: 15,
          lineHeight: 1.65,
          color: "#A39C8E",
        }}
      >
        {f.body}
      </p>
    </div>
  );
}

/* --------------------------- COUNT UP --------------------------- */

type Stat = { value: number; suffix: string; label: string };

const STATS: Stat[] = [
  { value: 12, suffix: "+", label: "anos dedicados à estética" },
  { value: 900, suffix: "+", label: "lentes esculpidas à mão" },
  { value: 98, suffix: "%", label: "dos pacientes indicam a amigos" },
];

function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const start = performance.now();
      const dur = 1600;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(stat.value * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);

    // Fallback: if already in viewport at mount, fire immediately.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) run();

    return () => io.disconnect();
  }, [stat.value]);

  return (
    <div className="flex flex-col items-center text-center">
      <span
        ref={ref}
        className="font-display"
        style={{
          fontSize: "clamp(44px, 6vw, 64px)",
          lineHeight: 1,
          fontWeight: 300,
          letterSpacing: "-0.02em",
        }}
      >
        <GoldText>
          {n}
          {stat.suffix}
        </GoldText>
      </span>
      <span
        className="mt-4"
        style={{
          fontSize: 11,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(242,238,230,0.6)",
        }}
      >
        {stat.label}
      </span>
    </div>
  );
}

/* --------------------------- SECTION --------------------------- */

export function Experiencia() {
  return (
    <section
      id="experiencia"
      className="relative w-full overflow-hidden"
      style={{ paddingTop: 160, paddingBottom: 160, background: "#0B0A08" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{ top: "50%", left: "-200px", transform: "translateY(-50%)" }}
      >
        <GlowOrb size={800} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0"
        style={{ right: "-40%", width: "60%" }}
      >
        <GoldBeams intensity={0.35} />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-6">
        <div className="max-w-[760px]">
          <Eyebrow>A EXPERIÊNCIA</Eyebrow>
          <h2
            className="mt-8 font-display font-light"
            style={{
              fontSize: "clamp(36px, 4.5vw, 56px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
            }}
          >
            <SplitHeading as="span" text="Um consultório que respeita o seu tempo." />
          </h2>
          <p
            className="mt-7 font-sans"
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: "#A39C8E",
              maxWidth: 640,
            }}
          >
            Você não divide sala de espera, não repete sua história duas vezes e não é atendido às pressas. Cada detalhe da estrutura existe para uma agenda curta, silenciosa e pontual.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2">
          {FEATURES.map((f) => (
            <GlassCard key={f.title} f={f} />
          ))}
        </div>

        <div
          className="mt-28 grid grid-cols-1 md:grid-cols-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 64 }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={
                "py-6 md:py-0 " +
                (i > 0
                  ? "md:border-l md:border-[rgba(255,255,255,0.08)]"
                  : "")
              }
            >
              <CountUp stat={s} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .exp-card:hover {
          border-color: rgba(217,180,91,0.25) !important;
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
}
