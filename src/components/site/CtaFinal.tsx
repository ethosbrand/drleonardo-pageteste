import { Eyebrow } from "@/components/fx/Eyebrow";

import { GoldBeams } from "@/components/fx/GoldBeams";
import { GoldText } from "@/components/fx/GoldText";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { SplitHeading } from "@/components/fx/SplitHeading";
import { openBookingModal } from "@/components/site/BookingModal";


export function CtaFinal() {
  return (
    <section
      id="cta"
      className="relative flex w-full items-center justify-center py-20 md:py-32"
      style={{ minHeight: "80vh", overflowX: "clip" }}
    >
      <GoldBeams intensity={1.4} />


      <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center px-6 text-center">
        <Eyebrow>PRIMEIRO PASSO</Eyebrow>
        <h2
          className="mt-8 font-display font-light"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          <SplitHeading as="span" text="Seu sorriso, planejado" />{" "}
          <em className="not-italic">
            <GoldText>
              <span style={{ fontStyle: "italic", fontWeight: 300 }}>
                para você.
              </span>
            </GoldText>
          </em>
        </h2>
        <p
          className="mt-7 font-sans"
          style={{
            fontSize: 17,
            lineHeight: 1.65,
            color: "var(--muted-text)",
            maxWidth: 560,
          }}
        >
          Na avaliação, o Dr. Leonardo analisa seu caso, apresenta as
          possibilidades e desenha um planejamento personalizado para o seu
          sorriso.
        </p>

        <div className="mt-12">
          <MagneticButton
            onClick={() => openBookingModal()}
            style={{ padding: "22px 40px", fontSize: 14 }}
          >
            Agendar avaliação pelo WhatsApp
          </MagneticButton>

        </div>

        <span
          className="mt-8"
          style={{
            fontSize: 10,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(var(--text-rgb), 0.5)",
          }}
        >
          ESTÉTICA DENTAL · FACETAS NATURAIS · CORONEL FABRICIANO, MG
        </span>
      </div>
    </section>
  );
}
