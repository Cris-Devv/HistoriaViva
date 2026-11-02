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
        ],

        infoHotspots: [
            {
                id: "estrutura-exemplo",
                title: "Estrutura de exemplo",
                description: "Conteúdo demonstrativo para testar os hotspots informativos. Substitua este texto por uma descrição baseada em fonte antes de publicar.",
                position: {
                    x: 2,
                    y: 1.5,
                    z: -4
                },
                audio: "assets/audio/audio-teste.mp3"
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
        ],

        infoHotspots: []
    }
};

function isValidPosition(position) {
    return position
        && Number.isFinite(position.x)
        && Number.isFinite(position.y)
        && Number.isFinite(position.z);
}

function isValidAudioPath(audio) {
    if (typeof audio !== "string" || !audio.trim()) return false;

    try {
        const base = typeof document === "undefined" ? "http://localhost/" : document.baseURI;
        const url = new URL(audio, base);
        const isExternal = url.protocol === "http:" || url.protocol === "https:";
        const isLocalAudio = /^(?:\.\/)?assets\/audio\//.test(audio);
        return isExternal || isLocalAudio;
    } catch {
        return false;
    }
}

export function validateLocations(data = locations) {
    const errors = [];

    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return ["As localidades devem ser um objeto."];
    }

    Object.entries(data).forEach(([key, location]) => {
        if (!location || typeof location !== "object") {
            errors.push(`Localidade inválida: ${key}`);
            return;
        }
        if (typeof location.id !== "string" || location.id !== key) errors.push(`ID divergente: ${key}`);
        if ([location.name, location.panorama, location.period, location.description]
            .some((value) => typeof value !== "string" || !value.trim())) {
            errors.push(`Campos obrigatórios ausentes: ${key}`);
        }
        if (typeof location.panorama !== "string" || !location.panorama.trim()) {
            errors.push(`Panorama inválido: ${key}`);
        }
        if (location.connections !== undefined && !Array.isArray(location.connections)) {
            errors.push(`Conexões inválidas: ${key}`);
        }
        if (location.infoHotspots !== undefined && !Array.isArray(location.infoHotspots)) {
            errors.push(`Hotspots informativos inválidos: ${key}`);
        }

        (Array.isArray(location.connections) ? location.connections : []).forEach((connection) => {
            if (!connection || typeof connection !== "object") {
                errors.push(`Conexão inválida: ${key}`);
                return;
            }
            if (typeof connection.target !== "string" || !data[connection.target]) errors.push(`Destino inexistente: ${key} -> ${connection.target}`);
            if (typeof connection.label !== "string" || !connection.label.trim() || !isValidPosition(connection.position)) {
                errors.push(`Conexão inválida: ${key} -> ${connection.target}`);
            }
        });

        const infoHotspotIds = new Set();
        (Array.isArray(location.infoHotspots) ? location.infoHotspots : []).forEach((hotspot) => {
            if (!hotspot || typeof hotspot !== "object") {
                errors.push(`Hotspot informativo inválido: ${key}`);
                return;
            }
            if (typeof hotspot.id !== "string" || !hotspot.id.trim() || infoHotspotIds.has(hotspot.id)) {
                errors.push(`Hotspot informativo duplicado ou sem ID: ${key}`);
            }
            infoHotspotIds.add(hotspot.id);
            if (typeof hotspot.title !== "string" || !hotspot.title.trim()
                || typeof hotspot.description !== "string" || !hotspot.description.trim()
                || !isValidPosition(hotspot.position)) {
                errors.push(`Hotspot informativo inválido: ${key} -> ${hotspot.id}`);
            }
            if (hotspot.audio !== undefined && hotspot.audio !== null
                && !isValidAudioPath(hotspot.audio)) {
                errors.push(`Áudio inválido: ${key} -> ${hotspot.id}`);
            }
        });
    });

    if (errors.length) {
        console.error("Dados de localidades inválidos:", errors);
    }

    return errors;
}

validateLocations();