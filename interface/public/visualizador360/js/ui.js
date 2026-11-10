import { locations } from "./data/locations.js";

const elements = {
    name: document.querySelector("#location-name"),
    period: document.querySelector("#location-period"),
    description: document.querySelector("#location-description"),
    list: document.querySelector("#locations-list"),
    panel: document.querySelector("#locations-panel"),
    toggle: document.querySelector("#locations-toggle"),
    close: document.querySelector("#locations-close"),
    back: document.querySelector("#navigation-back"),
    first: document.querySelector("#navigation-first"),
    forward: document.querySelector("#navigation-forward")
};

function renderLocations(currentId, onSelect) {
    elements.list.replaceChildren();

    Object.values(locations).forEach((location) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "location-option";
        button.textContent = location.name;
        button.setAttribute("aria-label", `Selecionar ${location.name}`);
        button.setAttribute("aria-pressed", String(location.id === currentId));
        button.classList.toggle("is-active", location.id === currentId);
        button.addEventListener("click", () => {
            onSelect(location.id);
            closeMenu();
        });
        elements.list.appendChild(button);
    });
}

function setDisabled(button, disabled) {
    button.disabled = disabled;
    button.setAttribute("aria-disabled", String(disabled));
}

export function initializeUi({ onSelect, onBack, onForward, onFirst }) {
    elements.toggle.addEventListener("click", () => {
        if (elements.panel.classList.contains("is-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    elements.close.addEventListener("click", closeMenu);
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && elements.panel.classList.contains("is-open")) {
            closeMenu();
        }
    });
    elements.back.addEventListener("click", onBack);
    elements.forward.addEventListener("click", onForward);
    elements.first.addEventListener("click", onFirst);
    closeMenu({ restoreFocus: false });
    renderLocations("", onSelect);
}

export function updateUi({ location, history, onSelect }) {
    elements.name.textContent = location.name;
    elements.period.textContent = location.period;
    elements.description.textContent = location.description;
    renderLocations(location.id, onSelect);
    setDisabled(elements.back, !history.canGoBack);
    setDisabled(elements.forward, !history.canGoForward);
    setDisabled(elements.first, !history.canGoBack && location.id === Object.keys(locations)[0]);
}

function openMenu() {
    elements.panel.classList.add("is-open");
    elements.panel.removeAttribute("inert");
    elements.panel.setAttribute("aria-hidden", "false");
    elements.toggle.setAttribute("aria-expanded", "true");
    elements.close.focus();
}

function closeMenu({ restoreFocus = true } = {}) {
    elements.panel.classList.remove("is-open");
    elements.panel.setAttribute("inert", "");
    elements.panel.setAttribute("aria-hidden", "true");
    elements.toggle.setAttribute("aria-expanded", "false");
    if (restoreFocus) elements.toggle.focus();
}
