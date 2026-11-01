import { locations } from "../data/locations.js";
import { renderHotspots } from "./hotspots.js";
import {
    getHistoryState,
    goBack,
    goForward,
    startHistory,
    visitLocation
} from "./history.js";

const sky = document.querySelector("#panorama-sky");
const navigationContainer = document.querySelector("#navigation-points");
let currentLocationId = null;
let hasStarted = false;

sky.addEventListener("materialtextureerror", () => {
    console.error("Não foi possível carregar o panorama:", sky.getAttribute("src"));
    document.dispatchEvent(new CustomEvent("panoramaerror"));
});

export function loadLocation(locationId, { recordHistory = true } = {}) {

    const location = locations[locationId];

    if (!location) {
        console.error("Localização não encontrada:", locationId);
        return false;
    }

    if (recordHistory) {
        if (!hasStarted) {
            startHistory(locationId);
            hasStarted = true;
        } else {
            visitLocation(locationId);
        }
    }

    currentLocationId = locationId;
    sky.setAttribute("src", location.panorama);
    renderHotspots(location, navigationContainer, (target) => loadLocation(target));
    document.dispatchEvent(new CustomEvent("locationchange", {
        detail: { location, history: getHistoryState() }
    }));
    return true;
}

export function navigateBack() {
    const locationId = goBack();
    return locationId ? loadLocation(locationId, { recordHistory: false }) : false;
}

export function navigateForward() {
    const locationId = goForward();
    return locationId ? loadLocation(locationId, { recordHistory: false }) : false;
}

export function navigateFirst() {
    const firstLocationId = Object.keys(locations)[0];
    return currentLocationId === firstLocationId
        ? false
        : loadLocation(firstLocationId);
}