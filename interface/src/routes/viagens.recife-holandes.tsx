import { createFileRoute, Link } from "@tanstack/react-router";
import { Monitor, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import img from "@/assets/recife-seculo-xvii.jpg";
import { experiencia, paradas } from "@/content/recife-holandes";

export const Route = createFileRoute("/viagens/recife-holandes")({
  head: () => ({
    meta: [
      { title: "Recife neerlandês (1630–1654) — Recife pelo Tempo" },
      {
        name: "description",
        content: "Contexto, objetivos e temas da viagem pelo Recife durante o domínio neerlandês.",
      },
      { property: "og:title", content: "Recife durante o domínio neerlandês" },
      {
        property: "og:description",
        content: "Prepare-se para a viagem guiada pelo Recife do século XVII.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Intro,
});

function Intro() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <Link to="/viagens" className="text-sm text-muted-foreground hover:text-foreground">
        ← Viagens
      </Link>
      <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-accent">
        {experiencia.periodo}
      </p>
      <h1 className="mt-1 text-4xl font-semibold sm:text-5xl">{experiencia.titulo}</h1>
      <figure className="mt-8">
        <img
          src={img}
          alt="Ilustração artística do Recife no século XVII"
          width={1600}
          height={912}
          className="aspect-[16/8] w-full rounded-xl object-cover shadow-card"
        />
        <figcaption className="mt-2 text-xs text-muted-foreground">
          Ilustração artística inspirada nas paisagens do período. Não é um registro histórico.
        </figcaption>
      </figure>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <section>
          <h2 className="text-2xl font-semibold">Contexto histórico</h2>
          <div className="mt-4 space-y-4 leading-relaxed">
            {experiencia.contexto.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <h2 className="mt-10 text-2xl font-semibold">Objetivos de aprendizagem</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {experiencia.objetivos.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>
        <aside className="space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-xl font-semibold">Temas do percurso</h2>
            <ol className="mt-4 space-y-3">
              {paradas.map((p, i) => (
                <li key={p.id} className="flex gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span>
                    <strong className="block text-sm">{p.tema}</strong>
                    <span className="text-sm text-muted-foreground">{p.local}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-xl border bg-secondary p-6 text-sm">
            <h2 className="text-xl font-semibold">Como navegar</h2>
            <p className="mt-3 flex gap-2">
              <Monitor className="mt-0.5 size-4 shrink-0 text-primary" />
              Mova a câmera do panorama com o mouse ou toque na tela para olhar ao redor.
            </p>
            <p className="mt-3 flex gap-2">
              <MousePointer2 className="mt-0.5 size-4 shrink-0 text-primary" />
              Use o menu de localidades, os hotspots e os controles de voltar, início e avançar para
              explorar.
            </p>
          </div>
        </aside>
      </div>
      <div className="mt-12 flex justify-center">
        <Button asChild size="lg" variant="accent">
          <Link to="/viagens/recife-holandes/percurso">Começar viagem</Link>
        </Button>
      </div>
    </div>
  );
}
