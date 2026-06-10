export function Footer() {
  return (
    <footer className="relative pt-16 pb-12" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <span className="font-display gold-text italic text-4xl">LG</span>
            <p className="mt-4 max-w-xs text-[13px] leading-[1.8] text-[color:var(--muted-text)]">
              Maison Leonardo Gomes. Atelier privado de lentes autorais em resina.
            </p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <span className="eyebrow">Endereço</span>
            <p className="mt-4 font-display italic text-lg text-[color:var(--ivory)]">
              Jardim Europa, São Paulo
            </p>
            <p className="mt-1 text-[13px] text-[color:var(--muted-text)]">Atendimento por hora marcada</p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <span className="eyebrow">Contato</span>
            <p className="mt-4 font-display italic text-lg text-[color:var(--ivory)]">
              contato@leonardogomes.maison
            </p>
            <p className="mt-1 text-[13px] text-[color:var(--muted-text)]">Resposta em até 48h</p>
          </div>
          <div className="col-span-12 md:col-span-2 md:text-right">
            <span className="eyebrow">Registro</span>
            <p className="mt-4 text-[13px] text-[color:var(--muted-text)]">CRO/SP ·····</p>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: "var(--hairline)" }}>
          <p className="font-display italic text-[13px] text-[color:var(--muted-text)]">
            © {new Date().getFullYear()} Dr. Leonardo Gomes. Todos os direitos reservados.
          </p>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--muted-text)]">
            Sob consulta, por indicação
          </p>
        </div>
      </div>
    </footer>
  );
}
