import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Reveal } from "./Reveal";
import { SplitHeadline } from "./SplitHeadline";
import { submitContact } from "@/lib/contact.functions";

const schema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(100, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
  whatsapp: z
    .string()
    .trim()
    .min(10, "WhatsApp inválido")
    .max(20, "WhatsApp inválido")
    .regex(/^[0-9+()\s-]+$/, "Use apenas números e símbolos válidos"),
});

type Errors = Partial<Record<"name" | "email" | "whatsapp" | "form", string>>;

export function Contact() {
  const submit = useServerFn(submitContact);
  const [values, setValues] = useState({ name: "", email: "", whatsapp: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function update<K extends keyof typeof values>(k: K, v: string) {
    setValues((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key && !errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setStatus("sending");
    try {
      await submit({ data: parsed.data });
      setStatus("sent");
      setValues({ name: "", email: "", whatsapp: "" });
    } catch {
      setStatus("idle");
      setErrors({ form: "Não foi possível enviar agora. Tente novamente em instantes." });
    }
  }

  return (
    <section id="conversa" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="font-display italic text-[120px] leading-none gold-text">07</span>
                <span className="eyebrow">Conversa</span>
              </div>
            </Reveal>
            <div className="mt-10">
              <SplitHeadline
                as="h2"
                className="font-display text-[36px] leading-[1.1] tracking-[-0.015em] sm:text-[48px] md:text-[64px]"
                lines={[
                  [{ text: "Atendimento " }],
                  [{ text: "por " }, { text: "convite,", gold: true }],
                  [{ text: "e indicação." }],
                ]}
              />
            </div>
            <Reveal delay={0.15}>
              <p className="mt-10 max-w-md text-[15px] leading-[1.9] text-[color:var(--muted-text)]">
                Recebemos um número reduzido de novos pacientes por mês. Deixe seu contato abaixo,
                retornaremos por mensagem privada em até dois dias úteis.
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-7">
            <Reveal delay={0.1}>
              <form
                onSubmit={onSubmit}
                className="relative p-8 md:p-12"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--hairline)",
                  borderRadius: 4,
                }}
                noValidate
              >
                <div className="absolute -top-px left-8 right-8 h-px hairline-gold" />

                {status === "sent" ? (
                  <div className="flex flex-col items-start gap-6 py-10">
                    <div className="h-px w-16 hairline-gold" />
                    <p className="font-display italic text-[32px] leading-[1.2] text-[color:var(--ivory)] md:text-[40px]">
                      Recebido.<br />Retornaremos por mensagem privada.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="eyebrow underline-offset-8 hover:text-[color:var(--ivory)]"
                    >
                      Enviar outra solicitação
                    </button>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <Field
                      label="Nome"
                      id="name"
                      value={values.name}
                      onChange={(v) => update("name", v)}
                      error={errors.name}
                      autoComplete="name"
                    />
                    <Field
                      label="E-mail"
                      id="email"
                      type="email"
                      value={values.email}
                      onChange={(v) => update("email", v)}
                      error={errors.email}
                      autoComplete="email"
                    />
                    <Field
                      label="WhatsApp"
                      id="whatsapp"
                      type="tel"
                      value={values.whatsapp}
                      onChange={(v) => update("whatsapp", v)}
                      error={errors.whatsapp}
                      placeholder="+55 11 ..."
                      autoComplete="tel"
                    />

                    {errors.form && (
                      <p className="text-[12px] gold-text">{errors.form}</p>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
                      <span className="eyebrow">Resposta em até 48h</span>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group relative inline-flex items-center gap-4 px-7 py-4 text-[11px] uppercase tracking-[0.35em] disabled:opacity-60"
                        style={{ border: "1px solid rgba(217,180,91,0.4)" }}
                      >
                        <span className="gold-text">
                          {status === "sending" ? "Enviando" : "Solicitar conversa privada"}
                        </span>
                        <span className="h-px w-6 gold-bg" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-4 w-full border-0 border-b bg-transparent pb-3 font-display text-[22px] text-[color:var(--ivory)] outline-none transition-colors duration-500 placeholder:text-[color:var(--muted-text)]/40 focus:border-[color:#D9B45B] md:text-[26px]"
        style={{ borderBottom: "1px solid var(--hairline)" }}
        maxLength={255}
      />
      {error && <p className="mt-3 text-[12px] gold-text">{error}</p>}
    </div>
  );
}
