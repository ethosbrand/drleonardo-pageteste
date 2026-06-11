import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "@/components/fx/Eyebrow";
import { Reveal } from "@/components/fx/Reveal";
import { SplitHeading } from "@/components/fx/SplitHeading";
import antesImg from "@/assets/chapoh-antes.png.asset.json";
import depoisImg from "@/assets/chapoh-depois.png.asset.json";
import caso1Img from "@/assets/caso-1.jpg.asset.json";
import caso2Img from "@/assets/caso-2.jpg.asset.json";
import caso3Img from "@/assets/caso-3.jpg.asset.json";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------- COMPARATOR --------------------------- */

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="url(#cmp-arrow)"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}
    >
      <defs>
        <linearGradient id="cmp-arrow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F6E7C1" />
          <stop offset="100%" stopColor="#D9B45B" />
        </linearGradient>
      </defs>
      <path d="M2 5h6M5.5 2 8 5l-2.5 3" />
    </svg>
  );
}

function Comparator() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const draggingRef = useRef(false);
  const introDoneRef = useRef(false);
  const tweenObj = useRef({ v: 50 });

  const updateFromClientX = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 70%",
      once: true,
      onEnter: () => {
        if (introDoneRef.current) return;
        introDoneRef.current = true;
        const obj = tweenObj.current;
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          onUpdate: () => setPos(obj.v),
        });
        tl.to(obj, { v: 30, duration: 0.7 })
          .to(obj, { v: 70, duration: 0.9 })
          .to(obj, { v: 50, duration: 0.8 });
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <div className="relative w-full">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(closest-side, rgba(217,180,91,0.10) 0%, rgba(217,180,91,0) 70%)",
          transform: "scale(1.15)",
        }}
      />
      <div
        ref={wrapRef}
        className="resultados-comparator relative w-full overflow-hidden select-none"
        style={{
          aspectRatio: "16 / 10",
          borderRadius: 0,
          border: "1px solid var(--border-strong)",
          touchAction: "none",
        }}
        onPointerDown={(e) => {
          draggingRef.current = true;
          updateFromClientX(e.clientX);
        }}
      >

        {/* DEPOIS (full background) */}
        <div className="absolute inset-0">
          <img src={depoisImg.url} alt="Sorriso após o tratamento" className="h-full w-full object-cover" draggable={false} />
        </div>

        {/* ANTES (clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img src={antesImg.url} alt="Sorriso antes do tratamento" className="h-full w-full object-cover" draggable={false} />
        </div>

        {/* Labels */}
        <span
          className="absolute left-5 top-5 inline-block px-3 py-1.5"
          style={{
            fontSize: 10,
            letterSpacing: "0.35em",
            color: "rgba(var(--text-rgb), 0.85)",
            background: "rgba(var(--bg-rgb), 0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: 0,
            border: "1px solid var(--border)",
          }}
        >
          ANTES
        </span>
        <span
          className="absolute right-5 top-5 inline-block px-3 py-1.5"
          style={{
            fontSize: 10,
            letterSpacing: "0.35em",
            color: "rgba(var(--text-rgb), 0.85)",
            background: "rgba(var(--bg-rgb), 0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: 0,
            border: "1px solid rgba(217,180,91,0.35)",
          }}
        >
          DEPOIS
        </span>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: `${pos}%`,
            width: 1,
            background:
              "linear-gradient(180deg, rgba(217,180,91,0) 0%, #D9B45B 20%, #D9B45B 80%, rgba(217,180,91,0) 100%)",
            transform: "translateX(-0.5px)",
            pointerEvents: "none",
          }}
        />

        {/* Handle */}
        <button
          type="button"
          aria-label="Arraste para comparar"
          onPointerDown={(e) => {
            e.stopPropagation();
            draggingRef.current = true;
          }}
          className="cmp-handle group absolute top-1/2 flex items-center justify-center"
          style={{
            left: `${pos}%`,
            width: 48,
            height: 48,
            transform: "translate(-50%, -50%)",
            borderRadius: 0,
            border: "1px solid rgba(217,180,91,0.6)",
            background: "rgba(var(--bg-rgb), 0.5)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            cursor: "ew-resize",
            transition: "transform 0.35s ease, box-shadow 0.35s ease",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              boxShadow:
                "0 0 0 1px rgba(217,180,91,0.4), 0 0 32px 4px rgba(217,180,91,0.35)",
            }}
          />
          <span className="flex items-center gap-1.5">
            <Arrow dir="left" />
            <Arrow dir="right" />
          </span>
        </button>
      </div>
      <style>{`
        .cmp-handle:hover { transform: translate(-50%, -50%) scale(1.08) !important; }
      `}</style>
    </div>
  );
}

function PlaceholderPanel({ variant }: { variant: "antes" | "depois" }) {
  const bg = variant === "antes" ? "var(--ph-antes)" : "var(--ph-depois)";
  return (
    <div
      className="relative h-full w-full"
      style={{ background: bg }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(closest-side at 50% 50%, var(--border-soft), transparent 70%)",
        }}
      />
      <span
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
        style={{
          fontSize: 10,
          letterSpacing: "0.35em",
          color: "rgba(var(--text-rgb), 0.45)",
        }}
      >
        FOTOGRAFIA DO CASO
      </span>
    </div>
  );
}

/* --------------------------- CASE CARDS --------------------------- */

type Case = {
  id: string;
  meta: string;
  description: string;
  gradient: string;
  img: string;
};

const CASES: Case[] = [
  {
    id: "caso-1",
    meta: "Caso real · facetas naturais",
    description: "Harmonização do sorriso",
    gradient: "var(--ph-case-1)",
    img: caso1Img.url,
  },
  {
    id: "caso-2",
    meta: "Caso real · facetas naturais",
    description: "Fechamento de espaços",
    gradient: "var(--ph-case-2)",
    img: caso2Img.url,
  },
  {
    id: "caso-3",
    meta: "Caso real · facetas naturais",
    description: "Correção de cor e formato",
    gradient: "var(--ph-case-3)",
    img: caso3Img.url,
  },
];

function TiltCard({
  c,
  index,
}: {
  c: Case;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 160,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 160,
    damping: 18,
  });
  const sx = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 767px), (hover: none)").matches;
    if (reduce || narrow) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        // Blur out toward edges, sharp in the middle.
        const p = self.progress;
        const dist = Math.abs(p - 0.5) * 2; // 0 center, 1 edges
        const blur = Math.max(0, (dist - 0.55) * 14);
        const scale = 1 - Math.max(0, dist - 0.6) * 0.05;
        el.style.filter = `blur(${blur.toFixed(2)}px)`;
        el.style.transform = `scale(${scale.toFixed(3)})`;
      },
    });
    return () => trigger.kill();
  }, []);

  const noHover =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;

  return (
    <Reveal direction="up" delay={index * 0.12}>
      <div
        ref={ref}
        className="group relative"
        style={{ perspective: 900 }}
        onPointerMove={
          noHover
            ? undefined
            : (e) => {
                const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                mx.set((e.clientX - r.left) / r.width - 0.5);
                my.set((e.clientY - r.top) / r.height - 0.5);
              }
        }
        onPointerLeave={
          noHover
            ? undefined
            : () => {
                mx.set(0);
                my.set(0);
              }
        }
      >
        <motion.article
          className="relative overflow-hidden"
          style={{
            aspectRatio: "4 / 5",
            borderRadius: 0,
            border: "1px solid var(--border)",
            background: c.gradient,
            rotateX: rx,
            rotateY: ry,
            transformStyle: "preserve-3d",
          }}
        >
          {/* <img src="/cases/{id}.jpg" alt="..." className="h-full w-full object-cover" /> */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(closest-side at 50% 40%, rgba(var(--text-rgb), 0.05), transparent 70%)",
            }}
          />

          {/* Specular sweep */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -inset-x-1/3 -inset-y-1/4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(115deg, transparent 38%, var(--border) 50%, transparent 62%)",
              left: sx,
            }}
          />

          {/* Glass meta bar */}
          <div
            className="absolute inset-x-4 bottom-4 px-5 py-4"
            style={{
              borderRadius: 0,
              background: "rgba(var(--bg-rgb), 0.55)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="font-display"
              style={{
                fontSize: 13,
                letterSpacing: "0.16em",
                color: "rgba(var(--text-rgb), 0.92)",
                fontWeight: 400,
              }}
            >
              {c.meta}
            </div>
            <div
              className="mt-1.5 font-sans"
              style={{
                fontSize: 13,
                color: "var(--muted-text)",
              }}
            >
              {c.description}
            </div>
          </div>
        </motion.article>
      </div>
    </Reveal>
  );
}

/* --------------------------- SECTION --------------------------- */

export function Resultados() {
  return (
    <section
      id="resultados"
      className="relative w-full"
      style={{ paddingTop: 160, paddingBottom: 160, overflowX: "clip" }}
    >
      <div className="mx-auto w-full max-w-[1240px] px-6">
        {/* Cabeçalho à esquerda, sem sobreposição */}
        <div className="max-w-[640px]">
          <Eyebrow>RESULTADOS</Eyebrow>
          <h2
            className="mt-6 font-display font-light"
            style={{
              fontSize: "clamp(36px, 4.5vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              textAlign: "left",
            }}
          >
            <SplitHeading as="span" text="Resultados que respeitam quem você é." />
          </h2>
          <p
            className="resultados-lede mt-6 font-sans"
            style={{
              maxWidth: 720,
              color: "var(--muted-text)",
              fontSize: 16,
              lineHeight: 1.65,
            }}
          >
            O melhor elogio para uma faceta é parecer dente. Arraste e compare.
          </p>

        </div>

        {/* Comparador centralizado */}
        <div style={{ marginTop: 64 }}>
          <Comparator />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" style={{ marginTop: 48 }}>

          {CASES.map((c, i) => (
            <TiltCard key={c.id} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
