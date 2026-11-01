const panorama01 = new URL(
    "../../assets/images/panoramas/teste-01.jpg",
    import.meta.url
).href;
const panorama06 = new URL(
    "../../assets/images/panoramas/teste-06.jpg",
    import.meta.url
).href;

export const locations = {
    "praca-01": {
        id: "praca-01",
        name: "Praça de Teste 01",

        panorama: panorama01,

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

        panorama: panorama06,

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

function isValidPosition(position) {
    return position
        && Number.isFinite(position.x)
        && Number.isFinite(position.y)
        && Number.isFinite(position.z);
}

export function validateLocations(data = locations) {
    const errors = [];

    Object.entries(data).forEach(([key, location]) => {
        if (location.id !== key) errors.push(`ID divergente: ${key}`);
        if (!location.name || !location.panorama || !location.period || !location.description) {
            errors.push(`Campos obrigatórios ausentes: ${key}`);
        }

        (location.connections ?? []).forEach((connection) => {
            if (!data[connection.target]) errors.push(`Destino inexistente: ${key} -> ${connection.target}`);
            if (!connection.label || !isValidPosition(connection.position)) {
                errors.push(`Conexão inválida: ${key} -> ${connection.target}`);
            }
        });
    });

    if (errors.length) {
        console.error("Dados de localidades inválidos:", errors);
    }

    return errors;
}

validateLocations();