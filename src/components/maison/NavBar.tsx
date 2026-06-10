import { useEffect, useState } from "react";

const links = [
  { href: "#filosofia", label: "Filosofia" },
  { href: "#atelier", label: "Atelier" },
  { href: "#galeria", label: "Galeria" },
  { href: "#materiais", label: "Materiais" },
  { href: "#conversa", label: "Conversa" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700`}
      style={{
        backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
        backgroundColor: scrolled ? "rgba(11,10,8,0.55)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--hairline)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="Maison Leonardo Gomes">
          <span className="font-display gold-text text-2xl italic leading-none">LG</span>
          <span className="hidden h-3 w-px hairline sm:block" />
          <span className="eyebrow hidden sm:inline">Maison Leonardo Gomes</span>
        </a>
        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[12px] tracking-[0.25em] uppercase text-[color:var(--muted-text)] transition-colors duration-500 hover:text-[color:var(--ivory)]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#conversa"
          className="pill inline-flex items-center gap-3 px-5 py-2.5 text-[11px] uppercase tracking-[0.3em] text-[color:var(--ivory)] transition-all duration-500 hover:bg-white/5"
        >
          <span className="h-1.5 w-1.5 rounded-full gold-bg" />
          Consulta privada
        </a>
      </div>
    </header>
  );
}
