// regionData.js
/**
 * Datos estáticos de regiones
 * Centraliza toda la información sobre profesores, starters, descripciones, etc.
 */

export const REGION_PROFESSOR_IMAGE = {
    kanto: "oak",
    johto: "elm",
    hoenn: "abedul",
    sinnoh: "serbal",
    unova: "encina",
    kalos: "cipres",
    alola: "kukui",
    galar: "magnnolia",
    paldea: "turoada",
};

export const REGION_PROFESSOR = {
    kanto: "Profesor Oak",
    johto: "Profesor Elm",
    hoenn: "Profesor Abedul",
    sinnoh: "Profesor Serbal",
    unova: "Profesora Encina",
    kalos: "Profesor Ciprés",
    alola: "Profesor Kukui",
    galar: "Profesora Magnolia",
    paldea: "Profesora Sada / Profesor Turo",
};

export const REGION_STARTERS = {
    kanto: ["bulbasaur", "charmander", "squirtle", "pikachu"],
    johto: ["chikorita", "cyndaquil", "totodile"],
    hoenn: ["treecko", "torchic", "mudkip"],
    sinnoh: ["turtwig", "chimchar", "piplup"],
    unova: ["snivy", "tepig", "oshawott"],
    kalos: ["chespin", "fennekin", "froakie"],
    alola: ["rowlet", "litten", "popplio"],
    galar: ["grookey", "scorbunny", "sobble"],
    paldea: ["sprigatito", "fuecoco", "quaxly"],
};

export const REGION_NAME_ES_OVERRIDE = {
    unova: "Teselia",
};

export const REGION_DESCRIPTIONS = {
    kanto:
        "Kanto es la región original del mundo Pokémon y el punto de partida de muchas aventuras. Se caracteriza por su geografía equilibrada, con ciudades conectadas por rutas sencillas, cuevas naturales y una clara separación entre zonas urbanas y salvajes. Su estructura sentó las bases del viaje Pokémon clásico, combinando exploración, combates y progreso constante a lo largo del territorio.",
    johto:
        "Johto es una región con una profunda conexión con la historia y las tradiciones del mundo Pokémon. Destaca por la presencia de edificios antiguos, leyendas transmitidas a lo largo del tiempo y una fuerte relación entre la naturaleza y la cultura local. Sus paisajes rurales, templos y ciudades históricas crean una atmósfera más tranquila y reflexiva que otras regiones.",
    hoenn:
        "Hoenn es una región muy diversa desde el punto de vista natural, con un gran protagonismo del mar y las rutas acuáticas. Islas, playas, volcanes y selvas forman parte de un territorio dinámico que obliga a adaptarse constantemente al entorno. La convivencia entre tierra y océano es uno de los elementos centrales que definen la identidad de esta región.",
    sinnoh:
        "Sinnoh es una región marcada por su terreno montañoso y su clima frío, con extensas rutas nevadas y elevaciones que dividen el mapa en diferentes zonas. Posee una mitología muy rica, estrechamente ligada al origen del mundo Pokémon y a antiguas creencias. La exploración en Sinnoh suele ser más exigente, reforzando su carácter épico y legendario.",
    unova:
        "Teselia es una región inspirada en grandes áreas metropolitanas y en la vida urbana moderna. Presenta una clara mezcla entre naturaleza y ciudad, con grandes núcleos urbanos, puentes, rascacielos y zonas industriales. A diferencia de otras regiones, Teselia apuesta por una sensación de renovación y cambio, ofreciendo una visión más contemporánea del mundo Pokémon.",
    kalos:
        "Kalos es una región conocida por su elegancia, estética cuidada y fuerte influencia cultural. La arquitectura, el arte y la moda tienen un papel destacado en sus ciudades, que contrastan con amplios espacios naturales y rutas abiertas. Kalos transmite una sensación de sofisticación y modernidad, manteniendo al mismo tiempo el espíritu de exploración.",
    alola:
        "Alola está formada por un conjunto de islas tropicales con una identidad cultural muy marcada. La región se distingue por su relación cercana con el entorno natural y por una forma de vida más relajada. Cada isla tiene sus propias características, lo que aporta variedad y personalidad al conjunto del archipiélago.",
    galar:
        "Galar es una región con un fuerte carácter industrial y deportivo, donde las grandes ciudades conviven con extensas áreas rurales. Su territorio está atravesado por vías de transporte modernas y zonas urbanas densas, reflejando una sociedad estructurada en torno al progreso y la tradición. El contraste entre campo y ciudad es uno de sus rasgos más destacados.",
    paldea:
        "Paldea es una región extensa y abierta que destaca por su libertad de exploración y diversidad geográfica. Montañas, llanuras, desiertos y costas forman parte de un territorio variado que invita a recorrerlo sin un camino estrictamente lineal. La región refleja una mezcla de culturas y paisajes, ofreciendo una experiencia amplia y flexible dentro del mundo Pokémon.",
};

export const REGION_DEX_RANGE = {
    kanto: [1, 151],
    johto: [152, 251],
    hoenn: [252, 386],
    sinnoh: [387, 493],
    unova: [494, 649],
    kalos: [650, 721],
    alola: [722, 809],
    galar: [810, 905],
    paldea: [906, 1017],
};

export const PALDEA_TOWNS_ALLOW = [
    "mesagoza",
    "los-platos",
    "cortondo",
    "artazon",
    "levincia",
    "zapapico",
    "medali",
    "cascarrafa",
    "porto-marinada",
    "alfornada",
    "montenevera",
    "pokemon-league-building",
    "cabo-poco",
];

export const GALAR_TOWNS_ALLOW = [
    "postwick",
    "wedgehurst",
    "motostoke",
    "turffield",
    "hulbury",
    "hammerlocke",
    "stow-on-side",
    "ballonlea",
    "circhester",
    "spikemuth",
    "wyndon",
];

export const PALDEA_ALLOW = ["province", "area"];

export const NON_TOWN_KEYWORDS = [
    "cave",
    "forest",
    "woods",
    "mine",
    "mount",
    "mt",
    "tower",
    "sea",
    "desert",
    "lake",
    "river",
    "beach",
    "bay",
    "island",
    "tunnel",
    "trail",
    "ruins",
    "power-plant",
    "safari",
    "dojo",
];

/**
 * Obtiene el nombre mostrable de una región
 */
export function getRegionDisplayName(regionData, regionSlug) {
    if (REGION_NAME_ES_OVERRIDE[regionSlug]) return REGION_NAME_ES_OVERRIDE[regionSlug];
    const esName = regionData?.names?.find((n) => n.language.name === "es")?.name;
    return esName || regionData?.name || regionSlug;
}

/**
 * Obtiene la descripción de una región
 */
export function getRegionDescription(regionSlug) {
    return REGION_DESCRIPTIONS[regionSlug] || "Descripción no disponible para esta región.";
}

/**
 * Obtiene el profesor de una región
 */
export function getRegionProfessor(regionSlug) {
    return REGION_PROFESSOR[regionSlug] || "Desconocido";
}

/**
 * Obtiene los starters de una región
 */
export function getRegionStarters(regionSlug) {
    return REGION_STARTERS[regionSlug] || [];
}

/**
 * Obtiene la imagen del profesor de una región
 */
export function getRegionProfessorImage(regionSlug) {
    return REGION_PROFESSOR_IMAGE[regionSlug] || "unknown";
}
