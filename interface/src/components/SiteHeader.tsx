import { Link } from "@tanstack/react-router";
import { Landmark } from "lucide-react";

const links = [
  { to: "/", label: "Início" },
  { to: "/viagens", label: "Viagens" },
  { to: "/sobre", label: "Sobre o projeto" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <Landmark className="size-5" aria-hidden />
          </span>
          História Viva <span className="text-accent">PE</span>
        </Link>
        <nav aria-label="Principal" className="flex gap-1 text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-3 py-2 text-muted-foreground hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg">História Viva PE</p>
          <p className="mt-2 text-sm opacity-75">
            Plataforma educacional de viagens históricas imersivas sobre Pernambuco.
          </p>
        </div>
        <div className="text-sm opacity-80">
          <p className="font-semibold">Navegação</p>
          <ul className="mt-2 space-y-1">
            <li><Link to="/viagens" className="hover:underline">Viagens históricas</Link></li>
            <li><Link to="/sobre" className="hover:underline">Sobre o projeto e VR</Link></li>
          </ul>
        </div>
        <p className="text-sm opacity-70">
          Protótipo educacional · Versão 0.1. Conteúdo em revisão para inclusão de fontes bibliográficas.
        </p>
      </div>
    </footer>
  );
}
