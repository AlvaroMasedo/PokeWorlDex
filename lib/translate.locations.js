/* =========================
   Diccionari manual de traduccions de localitzacions
   regió → locationSlug → nom ES
========================= */

const LOCATION_ES_OVERRIDES = {
    // -------- KANTO --------
    kanto: {
        "pallet-town": "Pueblo Paleta",
        "viridian-city": "Ciudad Verde",
        "pewter-city": "Ciudad Plateada",
        "cerulean-city": "Ciudad Celeste",
        "vermilion-city": "Ciudad Carmín",
        "lavender-town": "Pueblo Lavanda",
        "celadon-city": "Ciudad Azulona",
        "fuchsia-city": "Ciudad Fucsia",
        "saffron-city": "Ciudad Azafrán",
        "cinnabar-island": "Isla Canela",
        "indigo-plateau": "Meseta Añil",

        "kanto-sea-route-19": "Ruta 19 (Mar)",
        "kanto-sea-route-20": "Ruta 20 (Mar)",
        "kanto-sea-route-21": "Ruta 21 (Mar)",
    },

    // -------- JOHTO --------
    johto: {
        "new-bark-town": "Pueblo Primavera",
        "cherrygrove-city": "Ciudad Cerezo",
        "violet-city": "Ciudad Malva",
        "azalea-town": "Pueblo Azalea",
        "goldenrod-city": "Ciudad Trigal",
        "ecruteak-city": "Ciudad Iris",
        "olivine-city": "Ciudad Olivo",
        "cianwood-city": "Ciudad Orquídea",
        "blackthorn-city": "Ciudad Endrino",
        "mahogany-town": "Pueblo Caoba",

        "johto-sea-route-40": "Ruta 40 (Mar)",
        "johto-sea-route-41": "Ruta 41 (Mar)",
    },

    // -------- SINNOH --------
    sinnoh: {
        "twinleaf-town": "Pueblo Hojaverde",
        "sandgem-town": "Pueblo Arena",
        "jubilife-city": "Ciudad Jubileo",
        "oreburgh-city": "Ciudad Pirita",
        "eterna-city": "Ciudad Vetusta",
        "hearthome-city": "Ciudad Corazón",
        "canalave-city": "Ciudad Canal",
        "snowpoint-city": "Ciudad Puntaneva",
        "celestic-town": "Pueblo Caelestis",
        "floaroma-town": "Pueblo Aromaflor",
        "pastoria-city": "Ciudad Pradera",
        "solaceon-town": "Pueblo Sosiego",
        "veilstone-city": "Ciudad Rocavelo",
        "sunyshore-city": "Ciudad Marina",

        "sinnoh-sea-route-220": "Ruta 220 (Mar)",
        "sinnoh-sea-route-223": "Ruta 223 (Mar)",
        "sinnoh-sea-route-226": "Ruta 226 (Mar)",
        "sinnoh-sea-route-230": "Ruta 230 (Mar)",
    },

    // -------- UNOVA / TESELIA --------
    unova: {
        "anville-town": "Pueblo Porcelana",
        "aspertia-city": "Ciudad Engobe",
        "black-city": "Ciudad Negra",
        "castelia-city": "Ciudad Porcelana",
        "driftveil-city": "Ciudad Loza",
        "nimbasa-city": "Ciudad Mayólica",
        "striaton-city": "Ciudad Gres",
        "nuvema-town": "Pueblo Arcilla",
        "accumula-town": "Pueblo Engobe",

        "floccesy-town": "Pueblo Engobe",
        "humilau-city": "Ciudad Caolín",
        "icirrus-city": "Ciudad Caolín",
        "lacunosa-town": "Pueblo Ladrillo",
        "lentimas-town": "Pueblo Lenticel",
        "mistralton-city": "Ciudad Teja",
        "nacrene-city": "Ciudad Loza",
        "opelucid-city": "Ciudad Fayenza",
        "undella-town": "Pueblo Arenisca",
        "virbank-city": "Ciudad Hormigón",
        "route-gate": "Puerta de la Ruta",
    },

    // -------- ALOLA --------
    alola: {
        "hauoli-city": "Ciudad Hauoli",
        "malie-city": "Ciudad Malíe",
        "kantai-city": "Ciudad Kantai",
        "lillie-town": "Pueblo Lilii",
        "ohana-town": "Pueblo Ohana",
        "po-town": "Pueblo Po",

        "seafolk-village": "Pueblo Ohana",
        "vast-poni-canyon": "Cañón de Poni",
        "resolution-cave": "Gruta Desenlace",
        "unema-cave": "Gruta Unemar",

       
    },

        // -------- GALAR --------
        galar: {
            "postwick": "Pueblo Yarda",
            "wedgehurst": "Pueblo Par",
            "motostoke": "Ciudad Pistón",
            "hammerlocke": "Ciudad Artejo",
            "stow-on-side": "Ciudad Artejo Lateral",
            "ballonlea": "Ciudad Pilé",
            "circhester": "Pueblo Auriga",
            "spikemuth": "Pueblo Crampón",
            "wyndon": "Ciudad Puntera",
            "hulbury": "Pueblo Amura",
            "turffield": "Pueblo Hoyuelo",

      
        },

        // -------- PALDEA --------
        paldea: {
            
        },
    };

    /* =========================
       Helpers
    ========================= */

    function humanizeSlug(slug) {
        return slug
        .replaceAll("-", " ")
    .replace(/\b(\w)/g, (c) => c.toUpperCase());
}

/**
 * Retorna el nom en espanyol d'una localització donada
 */
function getLocationNameES({
    regionSlug,
    locationSlug,
    apiEsName,
    apiEnName,
}) {
    const regionMap = LOCATION_ES_OVERRIDES[regionSlug];
    if (regionMap && regionMap[locationSlug]) {
        return regionMap[locationSlug];
    }

    if (apiEsName) return apiEsName;

    if (apiEnName) return apiEnName;

    return humanizeSlug(locationSlug);
}

/* =========================
   Llibreria pública
========================= */

window.getLocationNameES = getLocationNameES;
