import { cn } from "@/lib/utils";

interface PanoramaViewerProps {
  className?: string;
}

export function PanoramaViewer({ className }: PanoramaViewerProps) {
  const viewerUrl = `${import.meta.env.BASE_URL}visualizador360/?embedded=1`;

  return (
    <iframe
      className={cn("block h-full min-h-[min(68vh,720px)] w-full border-0", className)}
      title="Visualizador 360° do Recife pelo Tempo"
      src={viewerUrl}
      loading="eager"
      scrolling="no"
      allow="autoplay; fullscreen"
      allowFullScreen
    />
  );
}
