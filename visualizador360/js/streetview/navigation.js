import { locations } from "../data/locations.js";
import { renderHotspots, renderInfoHotspots } from "./hotspots.js";
import { closePopup } from "../popups.js";
import {
    getHistoryState,
    goBack,
    goForward,
    startHistory,
    visitLocation
} from "./history.js";

const sky = document.querySelector("#panorama-sky");
const navigationContainer = document.querySelector("#navigation-points");
const informationContainer = document.querySelector("#information-points");
let currentLocationId = null;
let hasStarted = false;
let activePanorama = null;
let panoramaState = "idle";

function dispatchPanoramaEvent(type, locationId) {
    if (type === "panoramaerror" && panoramaState === "error") return;
    if (type === "panoramaloaded" && panoramaState === "loaded") return;

    panoramaState = type === "panoramaerror" ? "error" : "loaded";
    document.dispatchEvent(new CustomEvent(type, {
        detail: { locationId }
    }));
}

sky.addEventListener("materialtextureloaded", () => {
    if (sky.getAttribute("src") !== activePanorama) return;
    dispatchPanoramaEvent("panoramaloaded", currentLocationId);
});

sky.addEventListener("materialtextureerror", () => {
    if (sky.getAttribute("src") !== activePanorama) return;
    console.error("Não foi possível carregar o panorama:", activePanorama);
    dispatchPanoramaEvent("panoramaerror", currentLocationId);
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
    closePopup({ restoreFocus: false });
    activePanorama = location.panorama;
    panoramaState = "loading";
    document.dispatchEvent(new CustomEvent("panoramaloading", {
        detail: { locationId }
    }));
    sky.setAttribute("src", location.panorama);
    renderHotspots(location, navigationContainer, (target) => loadLocation(target));
    renderInfoHotspots(location, informationContainer, (infoHotspot, opener) => {
        document.dispatchEvent(new CustomEvent("infohotspotselect", {
            detail: { hotspot: infoHotspot, opener }
        }));
    });
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