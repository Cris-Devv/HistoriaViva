import { locations } from "../data/locations.js";

function setPosition(element, position) {
    element.setAttribute("position", `${position.x} ${position.y} ${position.z}`);
}

export function renderHotspots(location, container, onSelect) {
    container.replaceChildren();

    (location.connections ?? []).forEach((connection) => {
        if (!locations[connection.target]) {
            console.error("Destino de hotspot não encontrado:", connection.target);
            return;
        }

        const hotspot = document.createElement("a-sphere");
        hotspot.className = "hotspot";
        setPosition(hotspot, connection.position);
        hotspot.setAttribute("radius", "0.25");
        hotspot.setAttribute("material", "color: #ffd166; shader: standard");
        hotspot.setAttribute("geometry", "primitive: sphere; radius: 0.35");
        hotspot.setAttribute("raycastable", "");
        hotspot.setAttribute("aria-label", connection.label);
        hotspot.setAttribute("tabindex", "0");
        hotspot.addEventListener("click", () => onSelect(connection.target));
        hotspot.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(connection.target);
            }
        });
        container.appendChild(hotspot);
    });
}

export function renderInfoHotspots(location, container, onSelect) {
    const list = document.querySelector("#information-list");
    container.replaceChildren();
    if (list) {
        list.replaceChildren();
        list.hidden = !(location.infoHotspots ?? []).length;
    }

    (location.infoHotspots ?? []).forEach((infoHotspot) => {
        const hotspot = document.createElement("a-sphere");
        hotspot.className = "info-hotspot";
        setPosition(hotspot, infoHotspot.position);
        hotspot.setAttribute("radius", "0.2");
        hotspot.setAttribute("material", "color: #8edbc7; shader: standard");
        hotspot.setAttribute("geometry", "primitive: sphere; radius: 0.28");
        hotspot.setAttribute("raycastable", "");
        hotspot.setAttribute("aria-label", `Informações: ${infoHotspot.title}`);
        hotspot.setAttribute("tabindex", "0");
        const marker = document.createElement("a-text");
        marker.setAttribute("value", "i");
        marker.setAttribute("align", "center");
        marker.setAttribute("color", "#123b52");
        marker.setAttribute("position", "0 0 0.3");
        marker.setAttribute("scale", "1.5 1.5 1.5");
        marker.setAttribute("side", "double");
        hotspot.appendChild(marker);
        hotspot.addEventListener("click", () => onSelect(infoHotspot, hotspot));
        hotspot.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(infoHotspot, hotspot);
            }
        });
        container.appendChild(hotspot);
        if (list) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "information-option";
            button.textContent = infoHotspot.title;
            button.setAttribute("aria-label", `Abrir informações: ${infoHotspot.title}`);
            button.addEventListener("click", () => onSelect(infoHotspot, button));
            list.appendChild(button);
        }
    });
}