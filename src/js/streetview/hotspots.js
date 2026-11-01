export function renderHotspots(location, container, onSelect) {
    container.replaceChildren();

    location.connections.forEach((connection) => {
        const hotspot = document.createElement("a-sphere");
        hotspot.className = "hotspot";
        hotspot.setAttribute(
            "position",
            `${connection.position.x} ${connection.position.y} ${connection.position.z}`
        );
        hotspot.setAttribute("radius", "0.25");
        hotspot.setAttribute("material", "color: #ffd166; shader: standard");
        hotspot.setAttribute("aria-label", connection.label);
        hotspot.addEventListener("click", () => onSelect(connection.target));
        container.appendChild(hotspot);
    });
}