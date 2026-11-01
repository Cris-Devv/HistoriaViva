import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o projeto — História Viva PE" },
      { name: "description", content: "O projeto História Viva PE, o óculos VR maker e o que já está implementado." },
      { property: "og:title", content: "Sobre o projeto — História Viva PE" },
      { property: "og:description", content: "Educação, tecnologia e a história de Pernambuco." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Sobre,
});

const status = [
  ["Percurso guiado em cenário 3D representativo", "Implementado"],
  ["Narração por voz do navegador com transcrição", "Implementado"],
  ["Modo VR via WebXR (navegadores compatíveis)", "Implementado — depende do aparelho"],
  ["Modelos 3D históricos detalhados", "Integração futura"],
  ["Narração gravada por locutor", "Integração futura"],
  ["Fontes e referências bibliográficas", "Estrutura pronta, em curadoria"],
];

function Sobre() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-semibold">Sobre o projeto</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
        <p>O História Viva PE é uma plataforma educacional para estudantes, professores e o público em geral conhecerem períodos da história de Pernambuco por meio de viagens virtuais guiadas.</p>
        <p>O projeto inclui um artefato maker: um óculos de realidade virtual que usa o smartphone como tela. A plataforma roda no navegador; com WebXR disponível, a cena é exibida em visão estereoscópica e o visitante olha ao redor movendo a cabeça, enquanto o percurso continua automático.</p>
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
      <Button asChild size="lg" className="mt-10"><Link to="/viagens">Ver viagens</Link></Button>
    </div>
  );
}
