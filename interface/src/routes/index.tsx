import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Headphones, Route as RouteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/recife-seculo-xvii.jpg";
import { experiencia, paradas } from "@/content/recife-holandes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Recife pelo Tempo — Conheça Pernambuco através do tempo" },
      {
        name: "description",
        content:
          "Viagens históricas imersivas pela história de Pernambuco, com panoramas 360° no navegador.",
      },
      { property: "og:title", content: "Recife pelo Tempo" },
      {
        property: "og:description",
        content: "Conheça Pernambuco através do tempo com viagens históricas guiadas em 360°.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const passos = [
  { icon: Compass, t: "Escolha uma viagem", d: "Selecione um período da história de Pernambuco." },
  {
    icon: RouteIcon,
    t: "Percurso guiado",
    d: "Navegue entre localidades históricas e explore cada panorama.",
  },
  {
    icon: Headphones,
    t: "Leia e ouça",
    d: "Abra pontos informativos com descrição e narração em áudio.",
  },
  {
    icon: Compass,
    t: "Olhe ao redor",
    d: "Mova a câmera com o mouse ou toque na tela para explorar em 360°.",
  },
];

function Index() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={hero}
          alt="Ilustração do porto do Recife no século XVII"
          width={1600}
          height={912}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-hero-fade" />
        <div className="mx-auto max-w-6xl px-4 py-24 text-ink-foreground sm:py-36">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Plataforma educacional
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight sm:text-6xl">
            Conheça Pernambuco através do tempo
          </h1>
          <p className="mt-5 max-w-xl text-lg opacity-90">
            Viaje por panoramas 360° do passado pernambucano, com narração e conteúdo didático,
            direto no navegador.
          </p>
          <Button asChild size="lg" variant="accent" className="mt-8">
            <Link to="/viagens">Iniciar viagem no tempo</Link>
          </Button>
        </div>
      </section>

      <section className="azulejo border-b">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-3xl font-semibold">Como funciona</h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {passos.map((p, i) => (
              <li key={p.t} className="rounded-xl border bg-card p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <p.icon className="size-6 text-primary" aria-hidden />
                  <span className="font-display text-3xl text-muted-foreground/50">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{p.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
        <img
          src={hero}
          alt="Navios e casario neerlandês no Recife"
          width={1600}
          height={912}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-xl object-cover shadow-card"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Primeira viagem · {experiencia.periodo}
          </p>
          <h2 className="mt-2 text-3xl font-semibold">{experiencia.titulo}</h2>
          <p className="mt-4 text-muted-foreground">{experiencia.resumo}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {paradas.map((p) => (
              <li key={p.id} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                {p.tema}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-7">
            <Link to="/viagens/recife-holandes">Conhecer experiência</Link>
          </Button>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-20 md:grid-cols-[1fr_1.2fr]">
          <h2 className="text-3xl font-semibold">Uma experiência histórica imersiva</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Explore localidades históricas no navegador, sem instalar aplicativos ou sair do site.
            </p>
            <p>
              Use o mouse ou o toque para olhar ao redor, navegue pelos hotspots e ouça as narrações
              dos pontos informativos.
            </p>
            <Link to="/sobre" className="inline-block font-medium text-primary hover:underline">
              Saiba mais sobre o projeto →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
