import { createFileRoute } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/fx/AmbientBackground";
import { NoiseOverlay } from "@/components/fx/NoiseOverlay";

import { SmoothScrollProvider } from "@/components/fx/SmoothScrollProvider";
import { SignatureCurve } from "@/components/fx/SignatureCurve";
import { NavBar } from "@/components/site/NavBar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Manifesto } from "@/components/site/Manifesto";
import { Metodo } from "@/components/site/Metodo";
import { Resultados } from "@/components/site/Resultados";
import { Sobre } from "@/components/site/Sobre";
import { Experiencia } from "@/components/site/Experiencia";
import { Depoimentos } from "@/components/site/Depoimentos";
import { Faq } from "@/components/site/Faq";
import { CtaFinal } from "@/components/site/CtaFinal";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Leonardo Gomes · Facetas Naturais | Método NAP" },
      {
        name: "description",
        content:
          "Facetas naturais planejadas com o Método NAP: naturalidade, anatomia e preservação. Atendimento em Coronel Fabriciano, MG.",
      },
      { property: "og:title", content: "Dr. Leonardo Gomes · Facetas Naturais | Método NAP" },
      {
        property: "og:description",
        content:
          "Facetas naturais planejadas com o Método NAP: naturalidade, anatomia e preservação. Atendimento em Coronel Fabriciano, MG.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main
      className="relative min-h-screen w-full"
      style={{ backgroundColor: "var(--bg)", color: "var(--ivory)" }}
    >
      <SmoothScrollProvider />
      <AmbientBackground />
      <NoiseOverlay />

      <NavBar />
      <Hero />
      <Marquee />
      <Manifesto />
      <SignatureCurve />
      <Metodo />
      <Resultados />
      <Sobre />
      <Experiencia />
      <Depoimentos />
      <Faq />
      <CtaFinal />
      <Footer />
    </main>
  );
}
