// pokeApiService.js
/**
 * Servicio centralizado para todas las llamadas a la PokeAPI
 * Maneja la lógica de fetch y cacheo de datos
 */

const API_BASE = "https://pokeapi.co/api/v2";
const cache = new Map();

/**
 * Realiza una llamada fetch con caché
 */
async function fetchWithCache(url) {
    if (cache.has(url)) {
        return cache.get(url);
    }

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        cache.set(url, data);
        return data;
    } catch (e) {
        console.error(`Error fetching ${url}:`, e);
        throw e;
    }
}

/**
 * Obtiene todos los tipos disponibles
 */
export async function fetchAllTypes() {
    try {
        const data = await fetchWithCache(`${API_BASE}/type/`);
        return data.results.map((t) => t.name).sort();
    } catch (e) {
        console.error("Error fetching types:", e);
        return [];
    }
}

/**
 * Obtiene datos de un Pokémon específico
 */
export async function fetchPokemon(id) {
    try {
        return await fetchWithCache(`${API_BASE}/pokemon/${id}`);
    } catch (e) {
        console.error(`Error fetching pokemon ${id}:`, e);
        return null;
    }
}

/**
 * Obtiene datos de una región
 */
export async function fetchRegion(regionSlug) {
    try {
        return await fetchWithCache(`${API_BASE}/region/${regionSlug}`);
    } catch (e) {
        console.error(`Error fetching region ${regionSlug}:`, e);
        return null;
    }
}

/**
 * Obtiene datos de una localización
 */
export async function fetchLocation(locationSlug) {
    try {
        return await fetchWithCache(`${API_BASE}/location/${locationSlug}`);
    } catch (e) {
        console.error(`Error fetching location ${locationSlug}:`, e);
        return null;
    }
}

/**
 * Obtiene datos de un tipo específico
 */
export async function fetchType(typeName) {
    try {
        return await fetchWithCache(`${API_BASE}/type/${typeName}`);
    } catch (e) {
        console.error(`Error fetching type ${typeName}:`, e);
        return null;
    }
}

/**
 * Obtiene múltiples Pokémon en paralelo
 */
export async function fetchMultiplePokemon(ids) {
    return Promise.all(ids.map((id) => fetchPokemon(id)));
}

/**
 * Limpia el caché
 */
export function clearCache() {
    cache.clear();
}
