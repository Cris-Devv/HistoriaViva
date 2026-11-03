import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o projeto — Recife pelo Tempo" },
      {
        name: "description",
        content: "O projeto Recife pelo Tempo e a experiência histórica com panoramas 360°.",
      },
      { property: "og:title", content: "Sobre o projeto — Recife pelo Tempo" },
      { property: "og:description", content: "Educação, tecnologia e a história de Pernambuco." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Sobre,
});

const status = [
  ["Visualizador 360° com localidades e hotspots", "Implementado"],
  ["Narração em áudio com controles de reprodução", "Implementado"],
  ["Histórico de navegação entre localidades", "Implementado"],
  ["Modelos 3D históricos detalhados", "Fora do escopo atual"],
  ["Conteúdo histórico e fontes bibliográficas", "Estrutura pronta, em curadoria"],
  ["Fontes e referências bibliográficas", "Estrutura pronta, em curadoria"],
];

function Sobre() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-semibold">Sobre o projeto</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
        <p>
          O Recife pelo Tempo é uma plataforma educacional para estudantes, professores e o público
          em geral conhecerem períodos da história de Pernambuco por meio de viagens virtuais
          guiadas.
        </p>
        <p>
          A experiência atual usa um visualizador 360° independente, integrado à aplicação por
          iframe. A plataforma roda no navegador e preserva a navegação entre localidades, hotspots
          informativos, pop-ups acessíveis e narrações em áudio.
        </p>
      </div>
      <h2 className="mt-12 text-2xl font-semibold">O que já funciona</h2>
      <ul className="mt-4 divide-y rounded-xl border bg-card">
        {status.map(([a, b]) => (
          <li key={a} className="flex flex-wrap items-center justify-between gap-2 p-4 text-sm">
            <span>{a}</span>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{b}</span>
          </li>
        ))}
      </ul>
      <Button asChild size="lg" className="mt-10">
        <Link to="/viagens">Ver viagens</Link>
      </Button>
    </div>
  );
}
