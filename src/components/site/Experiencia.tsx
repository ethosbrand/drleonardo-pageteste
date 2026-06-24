import { Eyebrow } from "@/components/fx/Eyebrow";

import { GoldBeams } from "@/components/fx/GoldBeams";
import { SplitHeading } from "@/components/fx/SplitHeading";
import equipamentoImg from "@/assets/dentista-equipamento.jpg.asset.json";

/* --------------------------- ICONS (marfim) --------------------------- */

const ICON_STROKE = "rgba(var(--text-rgb), 0.7)";

const ICON_PROPS = {
  width: 36,
  height: 36,
  viewBox: "0 0 36 36",
  fill: "none",
  stroke: ICON_STROKE,
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconMicroscope() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M14 6h6l1 3-2 1-4 0-2-1 1-3Z" />
      <path d="M16 10v9" />
      <path d="M13 19h10" />
      <path d="M12 22c0 4 4 6 8 6h8" />
      <circle cx="22" cy="14" r="3" />
    </svg>
  );
}

function IconPlan() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="6" y="6" width="24" height="24" rx="2" />
      <path d="M6 12h24" />
      <path d="M12 18h8M12 23h12" />
    </svg>
  );
}

function IconMinimal() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="18" cy="18" r="12" />
      <path d="M12 18h12" />
    </svg>
  );
}

function IconFinish() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M8 26c2-8 6-14 12-18" />
      <path d="M14 28c4-6 8-10 14-12" />
      <path d="M22 8l2 2M26 12l2 2" />
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
    Icon: IconMicroscope,
    title: "Microscópio odontológico",
    body:
      "Visualização ampliada da estrutura dental durante o procedimento, para mais precisão e acabamento.",
  },
  {
    Icon: IconPlan,
    title: "Planejamento individual",
    body:
      "Cada caso é estudado isoladamente: rosto, lábios, gengiva, expectativa. Nada é repetido de um paciente para outro.",
  },
  {
    Icon: IconMinimal,
    title: "Mínimo desgaste",
    body:
      "A preservação da estrutura dental orienta todas as decisões. Intervenção só onde é realmente necessária.",
  },
  {
    Icon: IconFinish,
    title: "Acabamento e controle",
    body:
      "Textura, brilho e anatomia refinados com controle técnico ampliado, do início à revisão final.",
  },
];

function GlassCard({ f }: { f: Feature }) {
  return (
    <div
      className="exp-card group relative h-full"
      style={{
        background: "var(--surface-faint)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid var(--border)",
        borderRadius: 0,
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
          color: "var(--muted-text)",
        }}
      >
        {f.body}
      </p>
    </div>
  );
}

/* --------------------------- SECTION --------------------------- */

export function Experiencia() {
  return (
    <section
      id="precisao"
      className="relative w-full"
      style={{ paddingTop: 160, paddingBottom: 160, overflowX: "clip" }}
    >

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0"
        style={{ right: "-40%", width: "60%" }}
      >
        <GoldBeams intensity={0.35} />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* coluna esquerda: texto + cards */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div>
              <Eyebrow>PRECISÃO</Eyebrow>
              <h2
                className="mt-8 font-display font-light"
                style={{
                  fontSize: "clamp(36px, 4.5vw, 56px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.015em",
                }}
              >
                <SplitHeading as="span" text="Os melhores equipamentos para os melhores resultados." />
              </h2>
              <p
                className="mt-7 font-sans"
                style={{
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: "var(--muted-text)",
                  maxWidth: 640,
                }}
              >
                Na estética dental, o resultado final mora nos detalhes. Por isso o
                Dr. Leonardo trabalha com microscópio odontológico e planejamento
                individual em cada etapa.
              </p>
            </div>

            {/* Cards aninhados na coluna esquerda */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {FEATURES.map((f, i) => (
                <GlassCard key={i} f={f} />
              ))}
            </div>
          </div>

          {/* coluna direita: imagem preenchendo toda a altura */}
          <div className="lg:col-span-5">
            <img
              src={equipamentoImg.url}
              alt="Dr. Leonardo Gomes utilizando microscópio odontológico"
              className="h-full w-full object-cover"
              style={{ borderRadius: 0 }}
              loading="lazy"
            />
          </div>
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
