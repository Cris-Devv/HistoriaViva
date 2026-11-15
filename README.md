# História Viva
O História Viva é uma experiência 3D que permite explorar o passado do Recife de forma imersiva.

## Estrutura do projeto

- `interface/`: aplicação principal Lovable/TanStack Start, React e TypeScript.
- `interface/public/visualizador360/`: visualizador em HTML, JavaScript Vanilla e A-Frame,
  incorporado à aplicação principal por iframe.
- `docs/`: documentos do projeto.

## Interface principal

A rota `/viagens/recife-holandes/percurso` incorpora o visualizador por meio de
`interface/src/components/experience/PanoramaViewer.tsx`. O visualizador é servido como
recurso estático em `interface/public/visualizador360/`.

## Visualizador 360°

As localidades ficam centralizadas em
`interface/public/visualizador360/js/data/locations.js`. Cada local possui nome, descrição,
período, panorama e conexões para os hotspots.

O histórico é controlado por
`interface/public/visualizador360/js/streetview/history.js`, mantendo pilhas independentes
para voltar e avançar. Trocas feitas por hotspots, pelo menu ou pelos controles atualizam o
panorama e a interface por meio do evento `locationchange`.

Para executar a interface:

```bash
cd interface
npm run dev
```

Depois, abra `/viagens/recife-holandes/percurso`. O visualizador também pode ser acessado
diretamente em `/visualizador360/`; ele precisa ser servido por HTTP para que os módulos ES,
os panoramas e os arquivos de áudio sejam carregados corretamente.

O visualizador mantém sua lógica independente da interface React. Para adicionar uma
localidade, edite `interface/public/visualizador360/js/data/locations.js` com `id`, nome,
período, descrição e caminho do panorama. Cadastre hotspots de navegação em `connections`,
com `target`, `label` e `position`; cadastre pontos informativos em `infoHotspots`, com
`id`, título, descrição e posição. Arquivos de áudio devem ficar em
`interface/public/visualizador360/assets/audio/` e ser referenciados por caminho relativo.

O projeto recomenda npm: execute `npm install` e os comandos da interface dentro de
`interface/`. O visualizador não requer instalação de dependências.
