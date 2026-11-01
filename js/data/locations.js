export const locations = {
    "praca-01": {
        id: "praca-01",
        name: "Praça de Teste 01",

        panorama: "assets/images/panoramas/teste-01.jpg",

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