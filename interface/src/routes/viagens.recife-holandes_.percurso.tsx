import { createFileRoute, Link } from "@tanstack/react-router";

import { PanoramaViewer } from "@/components/experience/PanoramaViewer";
import { Button } from "@/components/ui/button";
import { experiencia } from "@/content/recife-holandes";

export const Route = createFileRoute("/viagens/recife-holandes_/percurso")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Experiência 360°: Recife neerlandês — História Viva" },
      {
        name: "description",
        content: "Explore panoramas 360° do Recife durante o domínio neerlandês.",
      },
      { property: "og:title", content: "Experiência 360° pelo Recife neerlandês" },
      {
        property: "og:description",
        content: "Explore localidades históricas, hotspots informativos e narrações.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Percurso,
});

function Percurso() {
  return (
    <div className="bg-ink text-ink-foreground">
      <section aria-labelledby="experience-title">
        <div className="mx-auto max-w-6xl px-4 pb-5 pt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {experiencia.periodo}
          </p>
          <h1 id="experience-title" className="mt-1 text-3xl font-semibold sm:text-4xl">
            {experiencia.titulo}
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-ink-foreground/75">
            Explore os panoramas, navegue entre localidades e abra os pontos informativos
            diretamente nesta página.
          </p>
        </div>
        <div className="mx-auto max-w-6xl overflow-hidden sm:px-4">
          <div className="overflow-hidden sm:rounded-xl sm:shadow-card">
            <PanoramaViewer />
          </div>
        </div>
      </section>

      <div className="bg-background text-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-[1.3fr_1fr]">
          <article>
            <h2 className="text-2xl font-semibold">Sobre esta viagem</h2>
            <div className="mt-4 space-y-4 leading-relaxed">
              {experiencia.contexto.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
          <aside className="rounded-xl border bg-secondary p-6">
            <h2 className="text-xl font-semibold">Objetivos de aprendizagem</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
              {experiencia.objetivos.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-6 h-11">
              <Link to="/viagens/recife-holandes">Voltar à apresentação</Link>
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
}
