import { Eyebrow } from "@/components/fx/Eyebrow";
import { Reveal } from "@/components/fx/Reveal";
import { SplitHeading } from "@/components/fx/SplitHeading";

const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Rua+Brasil+234,+Santa+Cruz,+Coronel+Fabriciano,+MG,+35170253&t=&z=16&ie=UTF8&iwloc=&output=embed";

const MAP_LINK_URL = "https://maps.app.goo.gl/jLtDFBeVwqzXzsxr8";

export function Localizacao() {
  return (
    <section
      id="localizacao"
      className="relative w-full"
      style={{ paddingTop: 160, paddingBottom: 160, overflowX: "clip" }}
    >
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Texto */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <Reveal direction="up">
              <Eyebrow>ONDE ESTAMOS</Eyebrow>
            </Reveal>

            <h2
              className="mt-8 font-display font-light"
              style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                lineHeight: 1.12,
                letterSpacing: "-0.015em",
              }}
            >
              <SplitHeading
                as="span"
                text="Venha nos conhecer"
              />
            </h2>

            <Reveal direction="up" delay={0.15}>
              <div className="mt-8 flex flex-col gap-5">
                <div
                  className="rounded-2xl border p-7"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  <p
                    className="font-sans"
                    style={{
                      fontSize: 15,
                      lineHeight: 1.75,
                      color: "var(--muted-text)",
                    }}
                  >
                    <span
                      className="mb-2 block font-display"
                      style={{
                        fontSize: 18,
                        color: "var(--text)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Aura Dental Atelier
                    </span>
                    Rua Brasil, 234
                    <br />
                    Santa Cruz, Coronel Fabriciano
                    <br />
                    MG · CEP 35170-253
                  </p>
                </div>

                <a
                  href={MAP_LINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center font-sans underline underline-offset-4"
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--muted-text)",
                    fontWeight: 500,
                    textDecorationColor: "var(--gold)",
                  }}
                >
                  <span className="transition-colors duration-300 group-hover:text-[#D9B45B]">
                    Abrir no Google Maps
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-7">
            <Reveal direction="up" delay={0.2}>
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  border: "1px solid var(--border)",
                  aspectRatio: "4 / 3",
                }}
              >
                <iframe
                  title="Localização da clínica"
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.55) contrast(1.05)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
