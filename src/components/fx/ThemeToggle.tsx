import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "dark" | "light";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const t = document.documentElement.getAttribute("data-theme");
  return t === "light" ? "light" : "dark";
}

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transitioning");
  root.setAttribute("data-theme", t);
  try {
    localStorage.setItem("theme", t);
  } catch {}
  window.setTimeout(() => root.classList.remove("theme-transitioning"), 600);
}

function Sun() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="tt-sun" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F6E7C1" />
          <stop offset="60%" stopColor="#D9B45B" />
          <stop offset="100%" stopColor="#8A6A1F" />
        </linearGradient>
      </defs>
      <g stroke="url(#tt-sun)" strokeWidth="1.25" strokeLinecap="round">
        <circle cx="12" cy="12" r="3.6" />
        <line x1="12" y1="2.5" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21.5" />
        <line x1="2.5" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="21.5" y2="12" />
        <line x1="5.2" y1="5.2" x2="6.9" y2="6.9" />
        <line x1="17.1" y1="17.1" x2="18.8" y2="18.8" />
        <line x1="5.2" y1="18.8" x2="6.9" y2="17.1" />
        <line x1="17.1" y1="6.9" x2="18.8" y2="5.2" />
      </g>
    </svg>
  );
}

function Moon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="tt-moon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B8923B" />
          <stop offset="60%" stopColor="#8A6A1F" />
          <stop offset="100%" stopColor="#6B5118" />
        </linearGradient>
      </defs>
      <path
        d="M19.5 14.5A8 8 0 0 1 9.5 4.5a0.6 0.6 0 0 0-0.85-0.7A9 9 0 1 0 20.2 15.35a0.6 0.6 0 0 0-0.7-0.85Z"
        stroke="url(#tt-moon)"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      aria-label="Alternar tema claro/escuro"
      onClick={toggle}
      className={
        "theme-toggle relative inline-flex items-center justify-center " +
        (className ?? "")
      }
      style={{
        width: 40,
        height: 40,
        border: "1px solid var(--border)",
        background: "transparent",
        borderRadius: 0,
        transition: "border-color 0.35s ease",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </motion.span>
      </AnimatePresence>
      <style>{`
        .theme-toggle:hover { border-color: rgba(217,180,91,0.45) !important; }
      `}</style>
    </button>
  );
}
