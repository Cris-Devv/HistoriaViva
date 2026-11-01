import { locations } from "../data/locations.js";

export function renderHotspots(location, container, onSelect) {
    container.replaceChildren();

    (location.connections ?? []).forEach((connection) => {
        if (!locations[connection.target]) {
            console.error("Destino de hotspot não encontrado:", connection.target);
            return;
        }

        const hotspot = document.createElement("a-sphere");
        hotspot.className = "hotspot";
        hotspot.setAttribute(
            "position",
            `${connection.position.x} ${connection.position.y} ${connection.position.z}`
        );
        hotspot.setAttribute("radius", "0.25");
        hotspot.setAttribute("material", "color: #ffd166; shader: standard");
        hotspot.setAttribute("geometry", "primitive: sphere; radius: 0.35");
        hotspot.setAttribute("raycastable", "");
        hotspot.setAttribute("aria-label", connection.label);
        hotspot.addEventListener("click", () => onSelect(connection.target));
        container.appendChild(hotspot);
    });
}