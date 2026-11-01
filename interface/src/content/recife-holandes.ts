/**
 * Conteúdo histórico da experiência "Recife durante o domínio neerlandês".
 * Os textos se limitam a fatos amplamente documentados. O campo `fontes`
 * está preparado para receber referências bibliográficas validadas.
 */

export type Extension =
  | { tipo: "curiosidade"; texto: string }
  | { tipo: "passado-presente"; passado: string; presente: string }
  | { tipo: "pergunta"; enunciado: string; opcoes: string[]; correta: number; explicacao: string }
  | { tipo: "reflexao"; texto: string };

export interface Fonte {
  titulo: string;
  autor?: string;
  ano?: string;
  url?: string;
}

export interface Parada {
  id: string;
  tema: string;
  titulo: string;
  local: string;
  /** Posição da câmera e ponto observado no cenário 3D */
  camera: [number, number, number];
  alvo: [number, number, number];
  texto: string[];
  narracao: string;
  extensoes: Extension[];
  fontes: Fonte[];
}

export const experiencia = {
  id: "recife-holandes",
  titulo: "Recife durante o domínio neerlandês",
  periodo: "1630–1654",
  resumo:
    "Percorra o Recife do século XVII, quando a Companhia das Índias Ocidentais (WIC) controlou parte do Nordeste açucareiro.",
  contexto: [
    "Em 1630, forças da Companhia Neerlandesa das Índias Ocidentais (WIC) ocuparam Olinda e o Recife, interessadas no comércio do açúcar produzido em Pernambuco.",
    "Entre 1637 e 1644, o conde João Maurício de Nassau-Siegen governou o Brasil neerlandês. Nesse período, o Recife cresceu e surgiu a Cidade Maurícia, na ilha de Antônio Vaz.",
    "A partir de 1645, a Insurreição Pernambucana reuniu diferentes grupos contra o domínio neerlandês. Após as Batalhas dos Guararapes (1648 e 1649), os neerlandeses capitularam em 1654.",
  ],
  objetivos: [
    "Compreender por que o açúcar atraiu a WIC para Pernambuco.",
    "Identificar transformações urbanas do Recife no século XVII.",
    "Reconhecer a diversidade de povos e a presença da escravidão na sociedade colonial.",
    "Relacionar os conflitos do período com a formação histórica de Pernambuco.",
  ],
};

export const paradas: Parada[] = [
  {
    id: "arquitetura",
    tema: "Arquitetura e urbanização",
    titulo: "A Cidade Maurícia",
    local: "Ilha de Antônio Vaz",
    camera: [-9, 6, 9],
    alvo: [-15, 2, -4],
    texto: [
      "Durante o governo de Maurício de Nassau, a ilha de Antônio Vaz recebeu um plano urbano que deu origem à Cidade Maurícia (Mauritsstad).",
      "Ali foi erguido o Palácio de Friburgo (Vrijburg), residência do governador. Em 1643 foi inaugurada uma ponte ligando o Recife à ilha, considerada uma das primeiras grandes pontes do Brasil.",
    ],
    narracao:
      "Estamos na ilha de Antônio Vaz. Durante o governo de Maurício de Nassau, aqui se formou a Cidade Maurícia, com o Palácio de Friburgo. Em 1643, uma ponte passou a ligar o Recife a esta ilha.",
    extensoes: [
      {
        tipo: "passado-presente",
        passado: "Ponte construída no governo de Nassau ligando o Recife à ilha de Antônio Vaz.",
        presente: "No mesmo trecho existe hoje a Ponte Maurício de Nassau, no centro do Recife.",
      },
      {
        tipo: "pergunta",
        enunciado: "Em qual ilha foi construída a Cidade Maurícia?",
        opcoes: ["Itamaracá", "Antônio Vaz", "Fernando de Noronha"],
        correta: 1,
        explicacao: "A Cidade Maurícia foi planejada na ilha de Antônio Vaz, onde hoje ficam bairros como Santo Antônio e São José.",
      },
    ],
    fontes: [],
  },
  {
    id: "porto",
    tema: "Comércio e atividades portuárias",
    titulo: "O porto e o açúcar",
    local: "Porto do Recife",
    camera: [5, 4, 15],
    alvo: [13, 1, 5],
    texto: [
      "O Recife era o porto de Olinda, protegido pelos arrecifes que dão nome à cidade. O açúcar produzido nos engenhos pernambucanos era embarcado ali rumo à Europa.",
      "O interesse da WIC no Nordeste estava ligado justamente a esse comércio, um dos mais lucrativos do Atlântico na época.",
    ],
    narracao:
      "Chegamos ao porto. Protegido pelos arrecifes, o Recife era o ponto de embarque do açúcar dos engenhos pernambucanos. Esse comércio explica o interesse da Companhia das Índias Ocidentais pela região.",
    extensoes: [
      { tipo: "curiosidade", texto: "O nome Recife vem dos arrecifes, a barreira natural que protege a costa e formava um porto abrigado." },
      { tipo: "reflexao", texto: "Por que o controle de um porto era tão importante para quem queria controlar o comércio do açúcar?" },
    ],
    fontes: [],
  },
  {
    id: "cotidiano",
    tema: "Cotidiano e organização social",
    titulo: "Uma sociedade desigual",
    local: "Ruas do Recife",
    camera: [6, 2.6, 3],
    alvo: [7, 1.5, -6],
    texto: [
      "A população do Recife neerlandês reunia funcionários da WIC, soldados, comerciantes, colonos luso-brasileiros, indígenas e africanos.",
      "A economia açucareira dependia do trabalho de pessoas africanas escravizadas. A WIC também participou do tráfico atlântico de escravizados.",
    ],
    narracao:
      "Nas ruas do Recife conviviam funcionários da Companhia, soldados, comerciantes, colonos, indígenas e africanos. A produção de açúcar dependia do trabalho de pessoas escravizadas.",
    extensoes: [
      { tipo: "reflexao", texto: "Quais grupos aparecem com mais frequência nos registros históricos do período? Quais vozes ficaram menos registradas?" },
    ],
    fontes: [],
  },
  {
    id: "cultura",
    tema: "Cultura e diversidade",
    titulo: "Ciência, arte e religião",
    local: "Rua dos Judeus",
    camera: [0, 2.8, -4],
    alvo: [3, 1.5, -11],
    texto: [
      "Nassau trouxe artistas e estudiosos. Os pintores Frans Post e Albert Eckhout registraram paisagens, pessoas, plantas e animais do Brasil.",
      "Na antiga Rua dos Judeus (atual Rua do Bom Jesus) funcionou a sinagoga Kahal Zur Israel, considerada a primeira das Américas.",
    ],
    narracao:
      "Este é um período de forte produção artística e científica. Frans Post e Albert Eckhout pintaram paisagens e pessoas do Brasil. Na Rua dos Judeus funcionou a sinagoga Kahal Zur Israel, considerada a primeira das Américas.",
    extensoes: [
      {
        tipo: "passado-presente",
        passado: "Sinagoga Kahal Zur Israel, na Rua dos Judeus.",
        presente: "No local funciona hoje um centro cultural e museu, na Rua do Bom Jesus, Recife Antigo.",
      },
      {
        tipo: "pergunta",
        enunciado: "Qual destes artistas pintou paisagens do Brasil neerlandês?",
        opcoes: ["Frans Post", "Rembrandt", "Vermeer"],
        correta: 0,
        explicacao: "Frans Post acompanhou Nassau ao Brasil e pintou paisagens da região.",
      },
    ],
    fontes: [],
  },
  {
    id: "conflitos",
    tema: "Conflitos e resistência",
    titulo: "Da Insurreição aos Guararapes",
    local: "Fortificações e Montes Guararapes",
    camera: [18, 7, -6],
    alvo: [24, 2, -18],
    texto: [
      "Após a saída de Nassau, em 1644, as tensões cresceram. Em 1645 começou a Insurreição Pernambucana.",
      "As Batalhas dos Guararapes, em 1648 e 1649, foram decisivas. Em 1654, os neerlandeses assinaram a capitulação, encerrando o domínio no Recife.",
    ],
    narracao:
      "Após a saída de Nassau, começou em 1645 a Insurreição Pernambucana. As Batalhas dos Guararapes, em 1648 e 1649, foram decisivas, e em 1654 os neerlandeses capitularam.",
    extensoes: [
      {
        tipo: "pergunta",
        enunciado: "Em que ano terminou o domínio neerlandês no Recife?",
        opcoes: ["1630", "1644", "1654"],
        correta: 2,
        explicacao: "A capitulação neerlandesa ocorreu em 1654.",
      },
    ],
    fontes: [],
  },
];
