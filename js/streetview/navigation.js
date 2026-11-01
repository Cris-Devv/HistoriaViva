import { locations } from "../data/locations.js";

const sky = document.querySelector("#panorama-sky");
const navigationContainer = document.querySelector(
    "#navigation-points"
);

// Carrega uma localização
export function loadLocation(locationId) {

    const location = locations[locationId];

    if (!location) {
        console.error("Localização não encontrada:", locationId);
        return;
    }

    // Atualiza o panorama
    sky.setAttribute("src", location.panorama);

    // Atualiza os pontos de navegação
    renderNavigation(location);

    console.log("Localização atual:", location.name);
}


// Cria os pontos de navegação
function renderNavigation(location) {

    navigationContainer.innerHTML = "";

    location.connections.forEach(connection => {

        const hotspot = document.createElement("a-sphere");

        hotspot.setAttribute("class", "hotspot");

        hotspot.setAttribute(
            "position",
            `${connection.position.x}
             ${connection.position.y}
             ${connection.position.z}`
        );

        hotspot.setAttribute("radius", "0.25");

        hotspot.setAttribute(
            "material",
            "color: #FFD700; shader: standard"
        );

        // Evento de clique
        hotspot.addEventListener("click", () => {
            loadLocation(connection.target);
        });

        navigationContainer.appendChild(hotspot);

    });
}