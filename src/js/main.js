import {
    loadLocation,
    navigateBack,
    navigateFirst,
    navigateForward
} from "./streetview/navigation.js";
import { locations } from "./data/locations.js";
import { initializeUi, updateUi } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
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
    loadLocation(Object.keys(locations)[0]);
});