const elements = {
    popup: document.querySelector("#info-popup"),
    close: document.querySelector("#info-popup-close"),
    title: document.querySelector("#info-popup-title"),
    description: document.querySelector("#info-popup-description"),
    audio: document.querySelector("#info-popup-audio"),
    audioToggle: document.querySelector("#info-popup-audio-toggle"),
    audioStop: document.querySelector("#info-popup-audio-stop"),
    audioLabel: document.querySelector("#info-popup-audio-label"),
    audioStatus: document.querySelector("#info-popup-audio-status")
};
const backgroundElements = [
    document.querySelector(".site-header"),
    document.querySelector("#locations-panel"),
    document.querySelector("a-scene"),
    document.querySelector("#information-list"),
    document.querySelector(".experience-bar"),
    document.querySelector(".instructions")
].filter(Boolean);

let activeAudio = null;
let lastFocusedElement = null;
let audioGeneration = 0;
const previousInertState = new Map();

function stopAudio() {
    if (!activeAudio) return;
    activeAudio.pause();
    activeAudio.currentTime = 0;
}

function setAudioStatus(message) {
    elements.audioStatus.textContent = message;
}

function setAudioButton(isPlaying) {
    elements.audioToggle.querySelector("span").textContent = isPlaying ? "❚❚" : "▶";
    elements.audioLabel.textContent = isPlaying ? "Pausar narração" : "Ouvir narração";
    elements.audioToggle.setAttribute("aria-label", isPlaying ? "Pausar narração" : "Reproduzir narração");
}

function clearAudio() {
    stopAudio();
    elements.audio.hidden = true;
    setAudioButton(false);
    setAudioStatus("");
}

function setBackgroundInert(isInert) {
    backgroundElements.forEach((element) => {
        if (isInert) {
            previousInertState.set(element, element.hasAttribute("inert"));
            element.setAttribute("inert", "");
        } else if (previousInertState.get(element)) {
            element.setAttribute("inert", "");
        } else {
            element.removeAttribute("inert");
        }
    });
    if (!isInert) previousInertState.clear();
}

function handleAudioToggle() {
    if (!activeAudio) return;

    if (activeAudio.paused) {
        const audio = activeAudio;
        const generation = audioGeneration;
        audio.play()
            .then(() => {
                if (activeAudio === audio && generation === audioGeneration
                    && !elements.popup.hidden && !audio.paused) {
                    setAudioButton(true);
                }
            })
            .catch((error) => {
                if (activeAudio !== audio || generation !== audioGeneration
                    || elements.popup.hidden || audio.paused) return;
                console.error("Não foi possível reproduzir a narração:", error);
                setAudioStatus("Não foi possível reproduzir esta narração.");
            });
    } else {
        activeAudio.pause();
        setAudioButton(false);
    }
}

function trapFocus(event) {
    if (event.key !== "Tab" || elements.popup.hidden) return;
    const focusable = [...elements.popup.querySelectorAll("button:not([disabled])")];
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

export function openPopup(hotspot, opener = document.activeElement) {
    const focusTarget = opener;
    closePopup({ restoreFocus: false });
    lastFocusedElement = focusTarget;
    elements.title.textContent = hotspot.title;
    elements.description.textContent = hotspot.description;

    if (hotspot.audio) {
        const audio = new Audio(hotspot.audio);
        activeAudio = audio;
        const generation = ++audioGeneration;
        audio.addEventListener("ended", () => {
            if (activeAudio === audio && generation === audioGeneration) setAudioButton(false);
        });
        audio.addEventListener("error", () => {
            if (activeAudio !== audio || generation !== audioGeneration || elements.popup.hidden) return;
            console.error("Não foi possível carregar a narração:", hotspot.audio);
            setAudioStatus("Não foi possível carregar esta narração.");
            setAudioButton(false);
        });
        elements.audio.hidden = false;
    } else {
        clearAudio();
    }

    elements.popup.hidden = false;
    elements.popup.setAttribute("aria-hidden", "false");
    setBackgroundInert(true);
    if (typeof elements.popup.showModal === "function") {
        elements.popup.showModal();
    }
    elements.close.focus();
}

export function closePopup({ restoreFocus = true } = {}) {
    if (!elements.popup || (elements.popup.hidden && !elements.popup.open)) {
        clearAudio();
        return;
    }

    clearAudio();
    activeAudio = null;
    audioGeneration++;
    setBackgroundInert(false);
    if (elements.popup.open) elements.popup.close();
    elements.popup.hidden = true;
    elements.popup.setAttribute("aria-hidden", "true");
    if (restoreFocus) {
        const focusTarget = lastFocusedElement?.isConnected
            && typeof lastFocusedElement.focus === "function"
            ? lastFocusedElement
            : document.querySelector("#locations-toggle");
        focusTarget?.focus();
    }
    lastFocusedElement = null;
}

export function initializePopups() {
    elements.close.addEventListener("click", closePopup);
    elements.audioToggle.addEventListener("click", handleAudioToggle);
    elements.audioStop.addEventListener("click", () => {
        stopAudio();
        setAudioButton(false);
        setAudioStatus("");
    });
    elements.popup.addEventListener("cancel", (event) => {
        event.preventDefault();
        closePopup();
    });
    document.addEventListener("infohotspotselect", (event) => openPopup(event.detail.hotspot, event.detail.opener));
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !elements.popup.hidden) closePopup();
        trapFocus(event);
    });
}
