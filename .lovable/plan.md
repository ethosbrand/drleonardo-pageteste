## Visão

One-page em React + Tailwind v4 + framer-motion + GSAP/ScrollTrigger + Lenis, no tom de maison de luxo silencioso (relojoaria suíça, alfaiataria sob medida). Tudo em `src/routes/index.tsx`, com cada seção em seu próprio componente em `src/components/maison/`.

## Identidade no design system

Tokens em `src/styles.css`:
- `--background: #0B0A08`, `--surface: #141210`, `--ivory: #F2EEE6`, `--muted: #A39C8E`
- `--gold-gradient: linear-gradient(120deg, #F6E7C1 0%, #D9B45B 45%, #8A6A1F 100%)`
- `--hairline: rgba(255,255,255,0.08)`, radius card 24px, pill 999px
- Fontes via `<link>` no `__root.tsx`: Fraunces (variable + italic) e Hanken Grotesk
- Classes utilitárias: `.gold-text` (background-clip text com gradiente), `.hairline`, `.eyebrow` (uppercase 11px tracking 0.35em)
- Overlay global `<GrainOverlay />` com SVG feTurbulence, fixed, opacity 0.035, mix-blend overlay

## Ícones autorais

Componente `Icon` por nome (`leaf`, `chisel`, `gem`, `clock`, `quill`, `seal`, etc.), todos SVG inline 24px, stroke 1.25px com `<linearGradient id="gold">` usando os 3 stops do gradiente oficial, cantos arredondados, estética de gravura. Nenhum import de `lucide-react`.

## Sistema de movimento

Hook `useReveal` aplicando padrão obrigatório via framer-motion + IntersectionObserver com `margin: -20%` e `once: false` (reverte ao sair):
- opacity 0→1, translateY 32→0, blur 8→0, ease `[0.22,1,0.36,1]`, 0.9s
Hook `useSplitReveal` para headlines: split por char, clip-path inset, y 110%→0, stagger 0.03s.
GSAP ScrollTrigger com `scrub` para imagens (blur 7px + scale 1.08 nas bordas, nítido no centro) e parallax decorativo (translateY/rotateZ lentos).
Lenis instalado em `src/lib/lenis.ts`, integrado ao `requestAnimationFrame` do GSAP via `ScrollTrigger.update`.

## Estrutura de seções

1. **NavBar** — fixa, monograma "LG" em ouro à esquerda, links âncora discretos (Filosofia, Atelier, Galeria, Materiais, Conversa), CTA pill "Agendar consulta privada".
2. **Hero** — full viewport. Eyebrow "Maison Leonardo Gomes · Lentes autorais em resina". Headline Fraunces italic em duas linhas com revelação char-by-char, palavra-chave em ouro. Subcopy curta em #A39C8E. Hairline dourada animada. Placeholder vertical à direita (gradiente quente + textura) com leve parallax.
3. **Filosofia** — bloco editorial assimétrico, número grande "01" em Fraunces, manifesto sobre discrição e trabalho artesanal, três princípios com ícones autorais.
4. **Processo (Atelier)** — timeline vertical com 5 etapas (Escuta, Estudo facial, Prova em cera, Escultura à mão livre, Entrega), cada uma com hairline dourada que se desenha no scroll (stroke-dashoffset via GSAP) e ícone próprio.
5. **Galeria antes/depois** — grid de 4 a 6 cards com placeholders elegantes (superfície #141210, gradiente sutil, hairline, label "Caso 01 · Reabilitação anterior"), divisor central com tipografia "antes / depois" em Fraunces italic. Blur out-in-out no scroll.
6. **Materiais & Técnica** — duas colunas: à esquerda, ficha técnica tipográfica (resina nano-híbrida, escultura direta, sem desgaste, sessão única); à direita, card escuro com macro placeholder e selo dourado circular ("Feito à mão · Sessão única").
7. **Depoimentos** — 3 cartas em fundo #141210, citação em Fraunces italic grande, assinatura discreta ("M.A., paciente desde 2022"). Sem fotos.
8. **FAQ** — accordion minimalista, sem ícones de chevron prontos: um hairline dourado que rotaciona 90°. 6 perguntas (durabilidade, reversibilidade, sessões, investimento sob consulta, manutenção, agendamento).
9. **Contato** — seção final, manifesto curto "Atendimento por convite e indicação". Formulário com 3 campos (Nome, Email, WhatsApp) + botão "Solicitar conversa privada". Validação com **zod** (nome 2-100, email válido max 255, whatsapp regex BR 10-15 dígitos, trim em tudo), erros em ouro suave abaixo do campo, estado de sucesso silencioso ("Recebido. Retornaremos por mensagem privada."). Submit envia para um `createServerFn` que apenas valida e loga (sem persistência nesta fase, sem secrets expostas).
10. **Footer** — monograma LG em ouro, endereço/cidade discretos, CRO placeholder, hairline superior, copyright em Fraunces italic.

## Acessibilidade e qualidade

- Respeita `prefers-reduced-motion`: desativa scrub/blur/split, mantém fade simples.
- Contraste verificado (ivory sobre #0B0A08).
- SEO no `head()` da rota: title, description, og:title, og:description voltados a "lentes de resina autorais, Dr. Leonardo Gomes".
- Sem emojis, sem travessões, sem lorem ipsum, sem stock photos.

## Detalhes técnicos

- Instalar: `framer-motion`, `gsap`, `lenis`, `zod` (não usar libs de UI prontas para os componentes desta página).
- Tailwind v4: tokens em `@theme inline` no `src/styles.css`, fontes via `<link>` no root, nenhum `tailwind.config.js`.
- Server function em `src/lib/contact.functions.ts` com `inputValidator` zod; rate limit simples por IP em memória do worker (best-effort).
- Nenhum componente shadcn será usado nesta página; ficam disponíveis para o resto do projeto.

## Arquivos a criar/editar

```text
src/styles.css                              (tokens + utilitários gold/hairline/eyebrow)
src/routes/__root.tsx                       (links de fonte Google)
src/routes/index.tsx                        (compõe as seções)
src/components/maison/GrainOverlay.tsx
src/components/maison/Icon.tsx
src/components/maison/NavBar.tsx
src/components/maison/Hero.tsx
src/components/maison/Philosophy.tsx
src/components/maison/Process.tsx
src/components/maison/Gallery.tsx
src/components/maison/Materials.tsx
src/components/maison/Testimonials.tsx
src/components/maison/Faq.tsx
src/components/maison/Contact.tsx
src/components/maison/Footer.tsx
src/components/maison/Reveal.tsx            (wrapper de entrada padrão)
src/components/maison/SplitHeadline.tsx
src/lib/lenis.ts                            (init + sync GSAP)
src/lib/useScrollBlur.ts                    (GSAP scrub helper para imagens)
src/lib/contact.functions.ts                (server fn + zod)
```
