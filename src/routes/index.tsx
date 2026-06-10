import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/maison/NavBar";
import { Hero } from "@/components/maison/Hero";
import { Philosophy } from "@/components/maison/Philosophy";
import { Process } from "@/components/maison/Process";
import { Gallery } from "@/components/maison/Gallery";
import { Materials } from "@/components/maison/Materials";
import { Testimonials } from "@/components/maison/Testimonials";
import { Faq } from "@/components/maison/Faq";
import { Contact } from "@/components/maison/Contact";
import { Footer } from "@/components/maison/Footer";
import { GrainOverlay } from "@/components/maison/GrainOverlay";
import { LenisProvider } from "@/components/maison/LenisProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Leonardo Gomes · Lentes autorais em resina, São Paulo" },
      {
        name: "description",
        content:
          "Maison Leonardo Gomes. Lentes dentais autorais em resina composta, esculpidas à mão livre em sessão única. Atendimento privado em São Paulo.",
      },
      { property: "og:title", content: "Dr. Leonardo Gomes · Lentes autorais em resina" },
      {
        property: "og:description",
        content:
          "Trabalho clínico autoral em resina composta, sem desgaste dental. Atendimento por convite e indicação em São Paulo.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: MaisonHome,
});

function MaisonHome() {
  return (
    <main className="relative overflow-hidden bg-[color:var(--background)] text-[color:var(--ivory)]">
      <LenisProvider />
      <GrainOverlay />
      <NavBar />
      <Hero />
      <Philosophy />
      <Process />
      <Gallery />
      <Materials />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
