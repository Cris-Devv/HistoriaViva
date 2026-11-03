<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Historical content lives in `interface/src/content/*` as typed data (stops, modular `extensoes`, `fontes`); the UI renders it while the 360° viewer keeps its own static location data.
- The historical journey route uses `ssr: false` and embeds the A-Frame viewer from `interface/public/visualizador360/` through `PanoramaViewer`.
