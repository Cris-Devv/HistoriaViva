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

- Historical content lives in `src/content/*` as typed data (stops, modular `extensoes`, `fontes`); UI and the 3D scene only render it — so content can be revised/sourced without touching components.
- The 3D journey route uses `ssr: false` and lazy-loads the R3F scene; VR uses @react-three/xr (WebXR) and the VR button only shows when `immersive-vr` is supported.
