# Recife pelo Tempo
O Recife pelo Tempo é uma experiência 3D que permite explorar o passado do Recife de forma imersiva.

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
cd visualizador360
python -m http.server 4174
```

Depois, abra `http://127.0.0.1:4174/`. O visualizador precisa ser servido por
HTTP para que os módulos ES, os panoramas e os arquivos de áudio sejam carregados
corretamente; não abra `index.html` diretamente com `file://`.

O visualizador 360° é independente da interface React. Para adicionar uma
localidade, edite `visualizador360/js/data/locations.js` com `id`, nome, período,
descrição e caminho do panorama. Cadastre hotspots de navegação em `connections`,
com `target`, `label` e `position`; cadastre pontos informativos em
`infoHotspots`, com `id`, título, descrição e posição. Arquivos de áudio devem
ficar em `visualizador360/assets/audio/` e ser referenciados por caminho relativo.

O projeto recomenda npm: execute `npm install` e os comandos da interface dentro
de `interface/`. O visualizador independente não requer instalação de
dependências.
