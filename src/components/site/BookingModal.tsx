import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WHATSAPP_NUMBER = "5500000000000";
const EASE = [0.22, 1, 0.36, 1] as const;

export function openBookingModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-booking"));
  }
}

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [problema, setProblema] = useState("");

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-booking", onOpen);
    return () => window.removeEventListener("open-booking", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Olá, Dr. Leonardo!%0A%0ANome: ${encodeURIComponent(
      nome,
    )}%0ATelefone: ${encodeURIComponent(
      telefone,
    )}%0AGostaria de resolver: ${encodeURIComponent(problema)}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
    setNome("");
    setTelefone("");
    setProblema("");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(217,180,91,0.25)",
    color: "var(--ivory)",
    padding: "14px 16px",
    fontSize: 14,
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "border-color 0.3s ease, background 0.3s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 10,
    letterSpacing: "0.28em",
    textTransform: "uppercase",
    color: "var(--muted-text)",
    marginBottom: 8,
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="booking-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{
            background: "rgba(8,8,12,0.55)",
            backdropFilter: "blur(14px)",
          }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            key="booking-card"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="relative w-full max-w-[500px]"
            style={{
              background: "rgba(18,18,22,0.72)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(217,180,91,0.45)",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(217,180,91,0.15) inset",
              padding: "40px 36px",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center"
              style={{ color: "var(--muted-text)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 2L14 14M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </button>

            <div className="mb-7">
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "var(--muted-text)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                }}
              >
                Agendar avaliação
              </span>
              <h3
                id="booking-title"
                className="mt-3 font-display font-light"
                style={{
                  fontSize: 28,
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  color: "var(--ivory)",
                }}
              >
                Conte um pouco sobre você
              </h3>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="bk-nome" style={labelStyle}>
                  Nome
                </label>
                <input
                  id="bk-nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={inputStyle}
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label htmlFor="bk-tel" style={labelStyle}>
                  Telefone
                </label>
                <input
                  id="bk-tel"
                  type="tel"
                  required
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  style={inputStyle}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label htmlFor="bk-prob" style={labelStyle}>
                  Qual problema você deseja resolver?
                </label>
                <textarea
                  id="bk-prob"
                  required
                  value={problema}
                  onChange={(e) => setProblema(e.target.value)}
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
                  placeholder="Ex: gostaria de melhorar meu sorriso com facetas..."
                />
              </div>

              <button
                type="submit"
                className="mt-3 w-full"
                style={{
                  padding: "16px 24px",
                  fontSize: 12,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  color: "#0b0b0e",
                  background: "var(--gold-gradient)",
                  border: "1px solid rgba(217,180,91,0.6)",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                Enviar e abrir WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
