import { useState } from "react";
import type { Extension } from "@/content/recife-holandes";

/** Renderiza módulos educativos de cada parada. Novos tipos entram aqui. */
export function ExtensionBlock({ ext }: { ext: Extension }) {
  switch (ext.tipo) {
    case "curiosidade":
      return <Box titulo="Curiosidade"><p>{ext.texto}</p></Box>;
    case "reflexao":
      return <Box titulo="Para refletir"><p>{ext.texto}</p></Box>;
    case "passado-presente":
      return (
        <Box titulo="Passado e presente">
          <dl className="grid gap-3 sm:grid-cols-2">
            <div><dt className="text-xs font-semibold uppercase text-accent">Século XVII</dt><dd>{ext.passado}</dd></div>
            <div><dt className="text-xs font-semibold uppercase text-primary">Hoje</dt><dd>{ext.presente}</dd></div>
          </dl>
        </Box>
      );
    case "pergunta":
      return <Quiz ext={ext} />;
  }
}

function Box({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border bg-card p-5 text-sm">
      <h3 className="mb-2 font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">{titulo}</h3>
      {children}
    </section>
  );
}

function Quiz({ ext }: { ext: Extract<Extension, { tipo: "pergunta" }> }) {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <Box titulo="Pergunta de compreensão">
      <p className="font-medium">{ext.enunciado}</p>
      <div className="mt-3 grid gap-2">
        {ext.opcoes.map((o, i) => {
          const state = sel === null ? "" : i === ext.correta ? "border-primary bg-primary/10" : i === sel ? "border-destructive bg-destructive/10" : "opacity-60";
          return (
            <button key={o} type="button" disabled={sel !== null} onClick={() => setSel(i)} className={`min-h-11 rounded-md border px-3 text-left transition ${state}`}>
              {o}
            </button>
          );
        })}
      </div>
      {sel !== null && (
        <p className="mt-3" role="status">
          <strong>{sel === ext.correta ? "Correto! " : "Não exatamente. "}</strong>{ext.explicacao}
          <button type="button" className="ml-2 text-primary underline" onClick={() => setSel(null)}>Tentar de novo</button>
        </p>
      )}
    </Box>
  );
}
