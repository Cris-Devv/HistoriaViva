import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { catalogo } from "@/content/catalogo";

export const Route = createFileRoute("/viagens/")({
  head: () => ({
    meta: [
      { title: "Viagens históricas — História Viva" },
      { name: "description", content: "Catálogo de experiências históricas imersivas de Pernambuco." },
      { property: "og:title", content: "Viagens históricas — História Viva" },
      { property: "og:description", content: "Escolha um período da história pernambucana para visitar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Viagens,
});

function Viagens() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold">Viagens históricas</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Escolha um período para começar. Novas experiências serão adicionadas.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {catalogo.map((c) => (
          <article key={c.id} className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-card">
            <div className="relative">
              <img src={c.imagem} alt={c.alt} loading="lazy" width={1024} height={768} className={`aspect-[4/3] w-full object-cover ${c.disponivel ? "" : "grayscale"}`} />
              {!c.disponivel && <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-ink-foreground">Em breve</span>}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">{c.periodo}</p>
              <h2 className="mt-1 text-xl font-semibold">{c.titulo}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.descricao}</p>
              {c.disponivel ? (
                <Button asChild className="mt-5 h-11">
                  <Link to="/viagens/recife-holandes">Conhecer experiência</Link>
                </Button>
              ) : (
                <Button disabled variant="secondary" className="mt-5 h-11">Em breve</Button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
