import { loadLocation } from "./streetview/navigation.js";

// Inicia o Street View no primeiro ambiente
document.addEventListener("DOMContentLoaded", () => {

    loadLocation("praca-01");

});