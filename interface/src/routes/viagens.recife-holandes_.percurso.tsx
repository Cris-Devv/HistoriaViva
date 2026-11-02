import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Glasses, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { createXRStore } from "@react-three/xr";
import { Button } from "@/components/ui/button";
import { experiencia, paradas } from "@/content/recife-holandes";
import { ExtensionBlock } from "@/components/experience/Extensions";
import type { LookState } from "@/components/scene/RecifeScene";

const RecifeScene = lazy(() => import("@/components/scene/RecifeScene").then((m) => ({ default: m.RecifeScene })));

export const Route = createFileRoute("/viagens/recife-holandes_/percurso")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Viagem: Recife neerlandês — Recife pelo Tempo" },
      { name: "description", content: "Percurso guiado em 3D pelo Recife durante o domínio neerlandês." },
      { property: "og:title", content: "Viagem pelo Recife neerlandês" },
      { property: "og:description", content: "Cinco paradas temáticas sobre o Recife de 1630 a 1654." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Percurso,
});

const AUTO_SECONDS = 45;

function Percurso() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(false);
  const [falando, setFalando] = useState(false);
  const [vrOk, setVrOk] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const look = useRef<LookState>({ yaw: 0, pitch: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);
  const store = useMemo(() => createXRStore({ emulate: false }), []);
  const stop = paradas[i]!;
  const total = paradas.length;

  useEffect(() => {
    const xr = (navigator as Navigator & { xr?: { isSessionSupported: (m: string) => Promise<boolean> } }).xr;
    if (!xr) return setVrOk(false);
    xr.isSessionSupported("immersive-vr").then(setVrOk).catch(() => setVrOk(false));
  }, []);

  // Avanço automático
  useEffect(() => {
    if (!auto || i >= total - 1) {
      if (auto && i >= total - 1) setAuto(false);
      return;
    }
    const t = setTimeout(() => {
      setI((n) => Math.min(n + 1, total - 1));
    }, AUTO_SECONDS * 1000);
    return () => clearTimeout(t);
  }, [auto, i, total]);

  // Ao mudar de parada: recentraliza o olhar e para a narração anterior
  useEffect(() => {
    look.current = { yaw: 0, pitch: 0 };
    window.speechSynthesis?.cancel();
    setFalando(false);
  }, [i]);
  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const narrar = () => {
    const synth = window.speechSynthesis;
    if (!synth) {
      setFalando(false);
      return;
    }
    if (falando) { synth.cancel(); setFalando(false); return; }
    const u = new SpeechSynthesisUtterance(stop.narracao);
    u.lang = "pt-BR";
    u.onend = () => setFalando(false);
    u.onerror = () => setFalando(false);
    synth.speak(u);
    setFalando(true);
  };

  return (
    <div className="bg-ink text-ink-foreground">
      <div
        className="relative h-[62vh] min-h-[360px] touch-none select-none"
        data-scene-ready={ready ? "" : undefined}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          look.current.yaw = Math.max(-1.2, Math.min(1.2, look.current.yaw + (e.clientX - drag.current.x) * 0.004));
          look.current.pitch = Math.max(-0.5, Math.min(0.5, look.current.pitch + (e.clientY - drag.current.y) * 0.003));
          drag.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
          drag.current = null;
        }}
        onPointerLeave={(e) => {
          if (!e.currentTarget.hasPointerCapture(e.pointerId)) drag.current = null;
        }}
        onPointerCancel={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
          drag.current = null;
        }}
      >
        <Suspense fallback={<div className="grid h-full place-items-center text-sm opacity-70">Carregando cenário…</div>}>
          <RecifeScene stop={stop} look={look} store={store} onReady={() => setReady(true)} />
        </Suspense>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-2 p-3 sm:p-4">
          <div className="pointer-events-auto rounded-lg bg-ink/70 px-3 py-2 backdrop-blur">
            <p className="text-xs opacity-75">Parada {i + 1} de {total} · {stop.tema}</p>
            <p className="font-display text-lg leading-tight">{stop.titulo}</p>
          </div>
          <div className="pointer-events-auto flex gap-2">
            {vrOk && (
              <Button variant="accent" className="h-11" onClick={() => store.enterVR()}>
                <Glasses /> Entrar no modo VR
              </Button>
            )}
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-16 left-3 rounded bg-ink/60 px-2 py-1 text-xs opacity-80">
          Cenário representativo · arraste para olhar ao redor
        </p>

        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3">
          <Button variant="glass" size="icon" className="size-11" aria-label="Parada anterior" disabled={i === 0} onClick={() => setI(i - 1)}><ChevronLeft /></Button>
          <div className="flex flex-1 gap-1" aria-label="Navegação entre paradas">
            {paradas.map((p, k) => (
              <button key={p.id} type="button" onClick={() => setI(k)} aria-label={`Ir para ${p.tema}${k === i ? " (atual)" : ""}`} aria-current={k === i ? "step" : undefined} className={`h-2 flex-1 rounded-full transition ${k <= i ? "bg-accent" : "bg-ink-foreground/25"}`} />
            ))}
          </div>
          <Button variant="glass" className="h-11" onClick={() => setAuto(!auto)} aria-pressed={auto}>
            {auto ? <Pause /> : <Play />} <span className="hidden sm:inline">{auto ? "Pausar" : "Automático"}</span>
          </Button>
          <Button variant="glass" size="icon" className="size-11" aria-label="Próxima parada" disabled={i === total - 1} onClick={() => setI(i + 1)}><ChevronRight /></Button>
        </div>
        <div className="sr-only" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={i + 1} aria-label={`Progresso da viagem: parada ${i + 1} de ${total}`} />
      </div>

      <div className="bg-background text-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-[1.3fr_1fr]">
          <article>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">{stop.local}</p>
            <h1 className="mt-1 text-3xl font-semibold">{stop.titulo}</h1>
            <div className="mt-4 space-y-4 leading-relaxed">{stop.texto.map((t) => <p key={t}>{t}</p>)}</div>

            <section className="mt-8 rounded-xl border bg-secondary p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-sans text-sm font-semibold">Narração</h2>
                <Button variant="outline" className="h-10" onClick={narrar}>
                  {falando ? <VolumeX /> : <Volume2 />} {falando ? "Parar" : "Ouvir"}
                </Button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground"><strong>Transcrição:</strong> {stop.narracao}</p>
              <p className="mt-2 text-xs text-muted-foreground">Voz sintetizada pelo navegador. Narração gravada será incluída futuramente.</p>
            </section>

            <section className="mt-6 text-sm">
              <h2 className="font-sans font-semibold">Fontes e referências</h2>
              {stop.fontes.length ? (
                <ul className="mt-2 list-disc pl-5">{stop.fontes.map((f) => <li key={f.titulo}>{f.autor ? `${f.autor}. ` : ""}{f.titulo}{f.ano ? ` (${f.ano})` : ""}</li>)}</ul>
              ) : (
                <p className="mt-1 text-muted-foreground">Referências bibliográficas em curadoria para esta parada.</p>
              )}
            </section>

            {i === total - 1 && (
              <div className="mt-8 rounded-xl border-2 border-accent p-6">
                <h2 className="text-xl font-semibold">Fim da viagem</h2>
                <p className="mt-1 text-sm text-muted-foreground">Você percorreu {experiencia.titulo.toLowerCase()} ({experiencia.periodo}).</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button onClick={() => { setI(0); window.scrollTo({ top: 0 }); }} className="h-11">Recomeçar</Button>
                  <Button asChild variant="outline" className="h-11"><Link to="/viagens">Outras viagens</Link></Button>
                </div>
              </div>
            )}
          </article>
          <aside className="space-y-4">
            {stop.extensoes.map((e, k) => <ExtensionBlock key={`${stop.id}-${k}`} ext={e} />)}
            <p className="text-xs text-muted-foreground">
              {vrOk === false
                ? "Este navegador não oferece WebXR: você está no modo convencional."
                : vrOk
                  ? "Seu aparelho é compatível com VR. Toque em “Entrar no modo VR” e encaixe o celular no óculos."
                  : "Verificando compatibilidade com VR…"}
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
