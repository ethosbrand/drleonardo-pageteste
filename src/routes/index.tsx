import { createFileRoute } from "@tanstack/react-router";
import { NoiseOverlay } from "@/components/fx/NoiseOverlay";
import { SmoothScrollProvider } from "@/components/fx/SmoothScrollProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Leonardo Gomes" },
      { name: "description", content: "Lentes autorais em resina, em construção." },
    ],
  }),
  component: FoundationPage,
});

function FoundationPage() {
  return (
    <main
      className="relative min-h-screen w-full"
      style={{ backgroundColor: "#0B0A08", color: "var(--ivory)" }}
    >
      <SmoothScrollProvider />
      <NoiseOverlay />
      <div className="flex min-h-screen items-center justify-center px-6">
        <h1
          className="font-display italic text-[64px] leading-none tracking-[-0.02em] md:text-[120px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Fundação pronta
        </h1>
      </div>
    </main>
  );
}
