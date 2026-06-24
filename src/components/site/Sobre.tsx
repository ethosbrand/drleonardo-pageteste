import { Eyebrow } from "@/components/fx/Eyebrow";
import { Reveal } from "@/components/fx/Reveal";
import { SplitHeading } from "@/components/fx/SplitHeading";
import leonardoAsset from "@/assets/leonardo.jpg.asset.json";

export function Sobre() {
  return (
    <section
      id="sobre"
      className="relative w-full py-24 md:py-40"
      style={{ overflowX: "clip" }}
    >
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* FOTO */}
          <Reveal direction="left" delay={0}>
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "4 / 5",
                borderRadius: 0,
                border: "1px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              <img
                src={leonardoAsset.url}
                alt="Dr. Leonardo Gomes"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(closest-side at 50% 40%, rgba(var(--text-rgb), 0.04), transparent 70%)",
                }}
              />
            </div>
          </Reveal>

          {/* TEXTO */}
          <div>
            <Eyebrow>O PROFISSIONAL</Eyebrow>
            <h2
              className="mt-6 font-display font-light"
              style={{
                fontSize: "clamp(36px, 4.5vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.015em",
              }}
            >
              <SplitHeading as="span" text="Quem é o Dr. Leonardo Gomes" />
            </h2>

            <Reveal direction="up" delay={0.15}>
              <p
                className="mt-8 font-sans"
                style={{
                  fontSize: 17,
                  lineHeight: 1.75,
                  color: "var(--muted-text)",
                }}
              >
                Dr. Leonardo Gomes é cirurgião-dentista com atuação focada em
                estética dental, facetas naturais e transformação de sorrisos.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.25}>
              <p
                className="mt-5 font-sans"
                style={{
                  fontSize: 17,
                  lineHeight: 1.75,
                  color: "var(--muted-text)",
                }}
              >
                Seu trabalho une técnica, sensibilidade estética, tecnologia e
                planejamento individual para criar resultados naturais,
                harmônicos e alinhados à identidade de cada paciente.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.35}>
              <p
                className="mt-8 font-display font-light"
                style={{
                  fontSize: 18,
                  lineHeight: 1.6,
                  letterSpacing: "0.02em",
                  color: "var(--text)",
                }}
              >
                Atendimento em{" "}
                <span className="gold-text">Coronel Fabriciano, MG</span>.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
