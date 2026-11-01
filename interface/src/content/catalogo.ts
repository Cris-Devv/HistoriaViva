import recife from "@/assets/recife-seculo-xvii.jpg";
import forte from "@/assets/em-breve-forte.jpg";
import olinda from "@/assets/em-breve-olinda.jpg";

export interface ItemCatalogo {
  id: string;
  titulo: string;
  periodo: string;
  descricao: string;
  imagem: string;
  alt: string;
  disponivel: boolean;
}

export const catalogo: ItemCatalogo[] = [
  {
    id: "recife-holandes",
    titulo: "Recife durante o domínio neerlandês",
    periodo: "1630–1654",
    descricao: "Porto, açúcar, a Cidade Maurícia e os conflitos que encerraram o domínio da WIC.",
    imagem: recife,
    alt: "Ilustração do porto do Recife no século XVII com navios e casas de estilo neerlandês",
    disponivel: true,
  },
  {
    id: "olinda-colonial",
    titulo: "Olinda colonial",
    periodo: "Séc. XVI",
    descricao: "A vila fundada no alto das colinas e a formação da capitania de Pernambuco.",
    imagem: olinda,
    alt: "Ilustração de igrejas e casarios coloniais em uma colina à beira-mar",
    disponivel: false,
  },
  {
    id: "fortificacoes",
    titulo: "Fortes do litoral",
    periodo: "Séc. XVII",
    descricao: "As fortificações que protegiam a costa pernambucana.",
    imagem: forte,
    alt: "Ilustração de uma fortaleza de pedra junto ao mar ao entardecer",
    disponivel: false,
  },
];
