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
        "driftveil-city": "Ciudad Fayenza",
        "aspertia-city": "Ciudad Engobe",
        "virbank-city": "Ciudad Hormigón",
        "icirrus-city": "Ciudad Teja",
        "mistralton-city": "Ciudad Loza",
        "castelia-city": "Ciudad Porcelana",
        "striaton-city": "Ciudad Gres",
        "humilau-city": "Ciudad Marga",
        "nacrene-city": "Ciudad Esmalte",
        "opelucid-city": "Ciudad Caolín",
        "black-city": "Ciudad Negra",
        "anville-town": "Pueblo Biscuit",
        "nuvema-town": "Pueblo Arcilla",
        "floccesy-town": "Pueblo Ocre",
        "undella-town": "Pueblo Arenisca",
        "accumula-town": "Pueblo Terracota",
        "lentimas-town": "Pueblo Chamota",
        "lacunosa-town": "Pueblo Ladrillo",
        "nimbasa-city": "Ciudad Mayólica",

    },

    // -------- ALOLA --------
    alola: {
        "hauoli-city": "Ciudad Hauoli",
        "malie-city": "Ciudad Malíe",

    },

    // -------- GALAR --------
    galar: {
        "ballonlea": "Pueblo Pilé",
        "circhester": "Pueblo Auriga",
        "hammerlocke": "Ciudad Artejo",
        "hulbury": "Pueblo Amura",
        "motostoke": "Ciudad Pistón",
        "postwick": "Pueblo Yarda",
        "spikemuth": "Pueblo Crampón",
        "stow-on-side": "Pueblo Ladera",
        "turffield": "Pueblo Hoyuelo",
        "wedgehurst": "Pueblo Par",
        "wyndon": "Ciudad Puntera",

        "route-8": "Ruta 8 (Mar)",
    },

    // -------- PALDEA --------
    paldea: {
        "alfornada": "Pueblo Alforno",
        "area-zero": "Área Cero",
        "artazon": "Pueblo Altamía",
        "cascarrafa": "Ciudad Cántara",
        "cortondo": "Pueblo Pirotín",
        "cabo-poco": "Pueblo Cahíz",

        "paldea-east-province-area-one": "Área 1 del este",
        "paldea-east-province-area-two": "Área 2 del este",
        "paldea-east-province-area-three": "Área 3 del este",

        "levincia": "Ciudad Leudal",
        "los-platos": "Pueblo Ataifor",
        "medali": "Pueblo Mestura",
        "mesagoza": "Ciudad Meseta",
        "montenevera": "Pueblo Hozkailu",

        "mossui-town": "Villa Versui",

        "paldea-north-province-area-one": "Área 1 del norte",
        "paldea-north-province-area-two": "Área 2 del norte",
        "paldea-north-province-area-three": "Área 3 del norte",

        "porto-marinada": "Pueblo Marinada",

        "paldea-south-province-area-one": "Área 1 del sur",
        "paldea-south-province-area-two": "Área 2 del sur",
        "paldea-south-province-area-three": "Área 3 del sur",
        "paldea-south-province-area-four": "Área 4 del sur",
        "paldea-south-province-area-five": "Área 5 del sur",
        "paldea-south-province-area-six": "Área 6 del sur",
        "paldea-west-province-area-one": "Área 1 del oeste",
        "paldea-west-province-area-two": "Área 2 del oeste",
        "paldea-west-province-area-three": "Área 3 del oeste",

        "zapapico": "Pueblo Veta"
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
