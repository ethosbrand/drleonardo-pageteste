import { useRef, useState } from "react";
import { Eyebrow } from "@/components/fx/Eyebrow";
import { Reveal } from "@/components/fx/Reveal";
import video1 from "@/assets/depoimento-1.mp4.asset.json";
import video2 from "@/assets/depoimento-2.mp4.asset.json";

type Item = {
  video: string;
  quote: string;
  name: string;
  description: string;
};

const ITEMS: Item[] = [
  {
    video: video1.url,
    quote:
      "Ficou exatamente como eu queria: natural. Ninguém percebeu o que mudou, só notaram que algo no meu sorriso ficou melhor.",
    name: "Rosemary · Caso real",
    description: "Facetas naturais",
  },
  {
    video: video2.url,
    quote:
      "O cuidado em cada detalhe me deixou tranquilo do começo ao fim. O resultado parece que sempre foi meu.",
    name: "Alan · Caso real",
    description: "Facetas naturais",
  },
];

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 5.5v13l11-6.5L8 5.5Z" fill="#0B0B0B" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="7" y="5" width="3.5" height="14" fill="#0B0B0B" />
      <rect x="13.5" y="5" width="3.5" height="14" fill="#0B0B0B" />
    </svg>
  );
}

function VideoCard({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const reversed = index % 2 === 1;

  return (
    <Reveal direction="up" delay={index * 0.12}>
      <article
        className="grid grid-cols-1 items-center gap-10 md:gap-14 lg:grid-cols-12"
      >
        <div
          className={`lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}
        >
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: "9 / 16",
              maxWidth: 380,
              margin: "0 auto",
              border: "1px solid var(--border-strong)",
              background: "#000",
            }}
          >
            <video
              ref={ref}
              src={item.video}
              className="h-full w-full object-cover"
              playsInline
              preload="metadata"
              onEnded={() => setPlaying(false)}
              onClick={toggle}
            />
            <button
              type="button"
              aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
              onClick={toggle}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: playing
                  ? "transparent"
                  : "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)",
                transition: "background 0.4s ease",
              }}
            >
              <span
                className="flex items-center justify-center"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "9999px",
                  background:
                    "linear-gradient(135deg, #F6E7C1 0%, #D9B45B 50%, #8A6A1F 100%)",
                  boxShadow: "0 12px 40px rgba(217,180,91,0.35)",
                  opacity: playing ? 0 : 1,
                  transform: playing ? "scale(0.92)" : "scale(1)",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                }}
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </span>
            </button>
          </div>
        </div>

        <div className={`lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}>
          <p
            className="font-display"
            style={{
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(22px, 2.4vw, 32px)",
              lineHeight: 1.4,
              letterSpacing: "-0.005em",
              color: "var(--ivory)",
            }}
          >
            “{item.quote}”
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <span
              className="font-sans"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--ivory)",
                letterSpacing: "0.02em",
              }}
            >
              {item.name}
            </span>
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(var(--text-rgb), 0.55)",
              }}
            >
              {item.description}
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Depoimentos() {
  return (
    <section
      id="depoimentos"
      className="relative w-full py-24 md:py-40"
      style={{ overflowX: "clip" }}
    >
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <Eyebrow>DEPOIMENTOS</Eyebrow>
        <div className="mt-20 flex flex-col gap-24">
          {ITEMS.map((item, i) => (
            <VideoCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
