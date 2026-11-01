export const locations = {
    "praca-01": {
        id: "praca-01",
        name: "Praça de Teste 01",

        panorama: "assets/images/panoramas/teste-01.jpg",

        period: "Recife contemporâneo",

        description: "Primeiro ambiente de teste.",

        connections: [
            {
                target: "praca-02",
                label: "Ir para o próximo ponto",

                position: {
                    x: 0,
                    y: 0,
                    z: -5
                }
            }
        ]
    },

    "praca-02": {
        id: "praca-02",
        name: "Praça de Teste 02",

        panorama: "assets/images/panoramas/teste-06.jpg",

        period: "Uma nova perspectiva da cidade",

        description: "Segundo ambiente de teste.",

        connections: [
            {
                target: "praca-01",
                label: "Voltar",

                position: {
                    x: 0,
                    y: 0,
                    z: -5
                }
            }
        ]
    }
};