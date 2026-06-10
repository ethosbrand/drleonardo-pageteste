import { Eyebrow } from "@/components/fx/Eyebrow";
import { GlowOrb } from "@/components/fx/GlowOrb";
import { GoldBeams } from "@/components/fx/GoldBeams";
import { GoldText } from "@/components/fx/GoldText";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { SplitHeading } from "@/components/fx/SplitHeading";

const WHATSAPP_URL = "https://wa.me/5500000000000";

export function CtaFinal() {
  return (
    <section
      id="cta"
      className="relative flex w-full items-center justify-center overflow-hidden"
      style={{ minHeight: "80vh", paddingTop: 120, paddingBottom: 120 }}
    >
      <GoldBeams intensity={1.4} />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <GlowOrb size={1000} />
      </div>

      <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center px-6 text-center">
        <Eyebrow>AGENDA DO MÊS ABERTA</Eyebrow>
        <h2
          className="mt-8 font-display font-light"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          <SplitHeading as="span" text="Seu sorriso," />{" "}
          <em className="not-italic">
            <GoldText>
              <span style={{ fontStyle: "italic", fontWeight: 300 }}>
                assinado à mão.
              </span>
            </GoldText>
          </em>
        </h2>
        <p
          className="mt-7 font-sans"
          style={{
            fontSize: 17,
            lineHeight: 1.65,
            color: "#A39C8E",
            maxWidth: 560,
          }}
        >
          As vagas de avaliação são limitadas para preservar a qualidade de cada caso. Garanta a sua.
        </p>

        <div className="mt-12">
          <MagneticButton
            onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}
            style={{ padding: "22px 40px", fontSize: 14 }}
          >
            Solicitar avaliação privada
          </MagneticButton>
        </div>

        <span
          className="mt-8"
          style={{
            fontSize: 10,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(242,238,230,0.5)",
          }}
        >
          RESPOSTA EM ATÉ 24H ÚTEIS · ATENDIMENTO CONFIDENCIAL
        </span>
      </div>
    </section>
  );
}
