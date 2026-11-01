# Recife pelo Tempo
O Recife pelo Tempo é uma experiência 3D que permite explorar o passado do Recife de forma imersiva.

## Interface da experiência

As localidades ficam centralizadas em `js/data/locations.js`. Cada local possui
nome, descrição, período, panorama e conexões para os hotspots.

O histórico é controlado por `js/streetview/history.js`, mantendo pilhas
independentes para voltar e avançar. Trocas feitas por hotspots, pelo menu ou
pelos controles atualizam o panorama e a interface por meio do evento
`locationchange`.

Para testar localmente, sirva a pasta por um servidor HTTP (por exemplo, o
servidor de desenvolvimento configurado no projeto) e abra `index.html`.
