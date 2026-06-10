import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome muito curto")
    .max(100, "Nome muito longo"),
  email: z
    .string()
    .trim()
    .email("E-mail inválido")
    .max(255, "E-mail muito longo"),
  whatsapp: z
    .string()
    .trim()
    .min(10, "WhatsApp inválido")
    .max(20, "WhatsApp inválido")
    .regex(/^[0-9+()\s-]+$/, "Use apenas números e símbolos válidos"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    console.log("[maison/contact] nova solicitação recebida", {
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      at: new Date().toISOString(),
    });
    return { ok: true } as const;
  });
