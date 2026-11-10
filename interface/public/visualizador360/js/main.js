import {
    loadLocation,
    navigateBack,
    navigateFirst,
    navigateForward
} from "./streetview/navigation.js";
import { locations } from "./data/locations.js";
import { initializeUi, updateUi } from "./ui.js";
import { initializePopups } from "./popups.js";

if (new URLSearchParams(window.location.search).has("embedded")) {
    document.body.classList.add("is-embedded");
}

document.addEventListener("DOMContentLoaded", () => {
    initializePopups();
    initializeUi({
        onSelect: (locationId) => loadLocation(locationId),
        onBack: navigateBack,
        onForward: navigateForward,
        onFirst: navigateFirst
    });

    document.addEventListener("locationchange", (event) => {
        updateUi({
            ...event.detail,
            onSelect: (locationId) => loadLocation(locationId)
        });
    });
    document.addEventListener("panoramaerror", () => {
        document.querySelector("#panorama-status").textContent =
            "Não foi possível carregar este panorama. Tente novamente.";
    });
    document.addEventListener("panoramaloading", () => {
        document.querySelector("#panorama-status").textContent = "Carregando panorama...";
    });
    document.addEventListener("panoramaloaded", () => {
        document.querySelector("#panorama-status").textContent = "";
    });
    loadLocation(Object.keys(locations)[0]);
});