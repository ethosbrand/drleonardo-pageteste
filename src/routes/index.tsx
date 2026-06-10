import { createFileRoute } from "@tanstack/react-router";
import { NoiseOverlay } from "@/components/fx/NoiseOverlay";
import { SmoothScrollProvider } from "@/components/fx/SmoothScrollProvider";
import { NavBar } from "@/components/site/NavBar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Manifesto } from "@/components/site/Manifesto";
import { Metodo } from "@/components/site/Metodo";
import { Resultados } from "@/components/site/Resultados";
import { Experiencia } from "@/components/site/Experiencia";
import { Depoimentos } from "@/components/site/Depoimentos";
import { Faq } from "@/components/site/Faq";
import { CtaFinal } from "@/components/site/CtaFinal";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vicente Almada · Odontologia autoral" },
      {
        name: "description",
        content:
          "Lentes em resina esculpidas à mão para um único rosto. Atendimento individual, agenda limitada.",
      },
      { property: "og:title", content: "Vicente Almada · Odontologia autoral" },
      {
        property: "og:description",
        content:
          "Lentes em resina esculpidas à mão para um único rosto. Atendimento individual, agenda limitada.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main
      className="relative min-h-screen w-full"
      style={{ backgroundColor: "#0B0A08", color: "var(--ivory)" }}
    >
      <SmoothScrollProvider />
      <NoiseOverlay />
      <NavBar />
      <Hero />
      <Marquee />
      <Manifesto />
      <Metodo />
      <Resultados />
      <Experiencia />
      <Depoimentos />
      <Faq />
      <CtaFinal />
      <Footer />
    </main>
  );
}
