# História Viva
O História Viva é uma experiência 3D que permite explorar o passado do Recife de forma imersiva.

## Estrutura do projeto

- `interface/`: aplicação principal Lovable/TanStack Start, React e TypeScript.
- `visualizador360/`: visualizador independente em HTML, JavaScript Vanilla e A-Frame.
- `docs/`: documentos do projeto.

## Interface principal

A rota `/viagens/recife-holandes/percurso` renderiza o cenário 3D atual em
`interface/src/components/scene/RecifeScene.tsx`.

## Visualizador 360°

As localidades ficam centralizadas em `visualizador360/js/data/locations.js`. Cada local possui
nome, descrição, período, panorama e conexões para os hotspots.

O histórico é controlado por `visualizador360/js/streetview/history.js`, mantendo pilhas
independentes para voltar e avançar. Trocas feitas por hotspots, pelo menu ou
pelos controles atualizam o panorama e a interface por meio do evento
`locationchange`.

Para executar a interface principal:

```bash
cd interface
npm run dev
```

Para executar o visualizador independente:

```bash
npx vite visualizador360 --host 127.0.0.1 --port 4174
```

Depois, abra a URL indicada pelo servidor. O visualizador deve ser executado por
HTTP para que os módulos ES e os panoramas sejam carregados corretamente.
