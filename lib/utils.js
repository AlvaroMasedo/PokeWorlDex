/**
 * Utilidades generales para la aplicación
 * Funciones reutilizables que evitan duplicación en toda la app
 */

/**
 * Formatea el nombre de un Pokémon o ubicación
 * Ej: "bulbasaur" -> "Bulbasaur", "flower-forest" -> "Flower Forest"
 */
export function formatName(name) {
    if (!name) return "";
    return name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

/**
 * Obtiene el ID de un Pokémon desde una URL de PokeAPI
 * Ej: "https://pokeapi.co/api/v2/pokemon/1/" -> "1"
 */
export function extractIdFromUrl(url) {
    if (!url) return null;
    return url.split("/").filter(Boolean).pop();
}

/**
 * Obtiene el ID de una especificación desde una URL
 */
export function extractSpeciesIdFromUrl(url) {
    if (!url) return null;
    return parseInt(url.split("/").filter(Boolean).pop());
}

/**
 * Formatea el índice nacional de un Pokémon
 * Ej: 1 -> "#001"
 */
export function formatPokemonIndex(id) {
    return `#${String(id).padStart(3, "0")}`;
}

/**
 * Obtiene la altura en formato legible
 * Ej: 10 (decímetros) -> "1.0m"
 */
export function formatHeight(decimeters) {
    if (!decimeters) return "N/A";
    const meters = decimeters / 10;
    return `${meters.toFixed(1)}m`;
}

/**
 * Obtiene el peso en formato legible
 * Ej: 60 (hectogramos) -> "6.0kg"
 */
export function formatWeight(hectograms) {
    if (!hectograms) return "N/A";
    const kg = hectograms / 10;
    return `${kg.toFixed(1)}kg`;
}

/**
 * Limpia el texto reemplazando caracteres especiales
 */
export function cleanText(text) {
    if (!text) return "";
    return text.replace(/\f/g, " ").replace(/\n/g, " ").trim();
}

/**
 * Obtiene la URL de imagen de un Pokémon
 */
export function getPokemonImageUrl(pokemonId) {
    if (!pokemonId) return null;
    // Intenta la imagen oficial primero
    const officialUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/pokemon/other/official-artwork/${pokemonId}.png`;
    return officialUrl;
}

/**
 * Obtiene la URL de la imagen del profesor
 */
export function getProfessorImageUrl(professorKey) {
    if (!professorKey) return null;
    return `/resources/img/professors/${professorKey}.png`;
}

/**
 * Obtiene la URL de fondo de región
 */
export function getRegionBackgroundUrl(regionSlug) {
    if (!regionSlug) return null;
    return `/resources/img/regionsBackground/${regionSlug}.jpg`;
}

/**
 * Crea un debounce para funciones
 * Útil para búsquedas y filtros en tiempo real
 */
export function debounce(fn, delay = 300) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

/**
 * Crea un throttle para funciones
 */
export function throttle(fn, limit = 300) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Valida si un Pokémon tiene datos válidos
 */
export function isValidPokemon(pokemon) {
    return pokemon && pokemon.id && pokemon.name && pokemon.types;
}

/**
 * Compara dos arrays de tipos
 */
export function areTypeArraysEqual(types1, types2) {
    if (!types1 || !types2) return false;
    if (types1.length !== types2.length) return false;
    return types1.every((type, index) => type.type.name === types2[index].type.name);
}

/**
 * Obtiene índice de un slot de tipo
 * Ej: si el primer tipo es "fire", devuelve 0
 */
export function getTypeSlotIndex(pokemonTypes, typeName) {
    return pokemonTypes.findIndex((t) => t.type.name === typeName);
}
