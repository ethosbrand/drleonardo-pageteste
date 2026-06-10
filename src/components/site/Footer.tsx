export function Footer() {
  return (
    <footer
      className="relative w-full"
      style={{
        borderTop: "1px solid var(--border-soft)",
        padding: "64px 0",
      }}
    >
      <div className="mx-auto w-full max-w-[1240px] px-6">
        {/* Linha 1 */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <span
            className="font-display"
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "var(--ivory)",
              letterSpacing: "-0.015em",
            }}
          >
            Leonardo Gomes
          </span>
          <a
            href="https://instagram.com/drleonardogomes_"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-ig group inline-flex items-center gap-2"
            style={{
              fontSize: 14,
              color: "var(--ivory)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <span className="relative inline-block">
              Instagram
              <span
                aria-hidden
                className="footer-ig-underline absolute left-0 -bottom-0.5 h-px"
                style={{
                  width: 0,
                  background:
                    "linear-gradient(90deg, #F6E7C1 0%, #D9B45B 50%, #8A6A1F 100%)",
                  transition:
                    "width 0.5s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="footer-ig-arrow"
              style={{ transition: "transform 0.4s ease" }}
            >
              <path d="M4 10 10 4M5 4h5v5" />
            </svg>
          </a>
        </div>

        {/* Linha 2 */}
        <div
          className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          style={{
            fontSize: 10,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--muted-text)",
          }}
        >
          <span>DR. LEONARDO GOMES · CRO-MG 00000 · RESPONSÁVEL TÉCNICO</span>
          <span>CORONEL FABRICIANO, MG</span>
        </div>

        {/* Linha 3 */}
        <div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          style={{
            fontSize: 12,
            color: "rgba(var(--text-rgb), 0.4)",
            fontFamily: "var(--font-sans)",
          }}
        >
          <span>© 2026 Dr. Leonardo Gomes. Todos os direitos reservados.</span>
        </div>
      </div>

      <style>{`
        .footer-ig:hover .footer-ig-underline { width: 100%; }
        .footer-ig:hover .footer-ig-arrow { transform: translate(2px, -2px); color: #D9B45B; }
        .footer-ig:hover { color: #D9B45B; }
      `}</style>
    </footer>
  );
}
