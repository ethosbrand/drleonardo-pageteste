import { createFileRoute } from "@tanstack/react-router";
import { NoiseOverlay } from "@/components/fx/NoiseOverlay";
import { SmoothScrollProvider } from "@/components/fx/SmoothScrollProvider";
import { NavBar } from "@/components/site/NavBar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Manifesto } from "@/components/site/Manifesto";
import { Metodo } from "@/components/site/Metodo";

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
    </main>
  );
}
