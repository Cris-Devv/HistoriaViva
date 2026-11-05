import { locations } from "../data/locations.js";

const informationIconUrl = new URL("../../assets/images/panoramas/Information_icon.svg.webp", import.meta.url).href;

if (!AFRAME.components["face-camera"]) {
    AFRAME.registerComponent("face-camera", {
        tick() {
            const camera = this.el.sceneEl?.camera;
            if (camera) this.el.object3D.lookAt(camera.getWorldPosition(new THREE.Vector3()));
        }
    });
}

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
        const hotspot = document.createElement("a-entity");
        hotspot.className = "info-hotspot";
        setPosition(hotspot, infoHotspot.position);
        hotspot.setAttribute("face-camera", "");
        hotspot.setAttribute("raycastable", "");
        hotspot.setAttribute("aria-label", `Informações: ${infoHotspot.title}`);
        hotspot.setAttribute("tabindex", "0");
        const marker = document.createElement("a-plane");
        marker.className = "info-hotspot-marker";
        marker.setAttribute("width", "0.62");
        marker.setAttribute("height", "0.62");
        marker.setAttribute("material", `src: ${informationIconUrl}; transparent: true; alphaTest: 0.1; side: double`);
        hotspot.appendChild(marker);
        const hitTarget = document.createElement("a-plane");
        hitTarget.className = "info-hotspot-hit";
        hitTarget.setAttribute("width", "0.9");
        hitTarget.setAttribute("height", "0.9");
        hitTarget.setAttribute("position", "0 0 -0.01");
        hitTarget.setAttribute("material", "transparent: true; opacity: 0; side: double");
        hotspot.appendChild(hitTarget);
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