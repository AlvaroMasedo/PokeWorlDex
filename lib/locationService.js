// locationService.js
/**
 * Servicio de negocio para operaciones relacionadas con localizaciones
 * Centraliza toda la lógica de obtención y procesamiento de datos de rutas y ciudades
 */

import { fetchLocation } from './pokeApiService.js';

/**
 * Obtiene datos de una localización
 */
export async function getLocationData(locationSlug) {
    try {
        return await fetchLocation(locationSlug);
    } catch (e) {
        console.error(`Error fetching location ${locationSlug}:`, e);
        return null;
    }
}

/**
 * Obtiene los encuentros de Pokémon en una localización específica
 */
export async function getLocationEncounters(locationSlug, regionSlug, gameVersions = []) {
    try {
        const locationData = await getLocationData(locationSlug);
        if (!locationData) return {};

        const encounters = {};
        const WEAK_TO_SELF = ["ghost", "dragon"];

        for (const area of locationData.areas || []) {
            const areaRes = await fetch(area.url);
            if (!areaRes.ok) continue;
            const areaData = await areaRes.json();

            for (const enc of areaData.pokemon_encounters || []) {
                const pokemonName = enc.pokemon.name;
                const pokemonUrl = enc.pokemon.url;
                const pokemonId = Number(pokemonUrl.split("/").filter(Boolean).pop());

                for (const versionDetail of enc.version_details || []) {
                    const versionName = versionDetail.version.name;
                    const skipVersionFilter = ["galar", "paldea", "alola"].includes(regionSlug);

                    if (!skipVersionFilter && gameVersions.length > 0 && !gameVersions.includes(versionName)) {
                        continue;
                    }

                    for (const method of versionDetail.encounter_details || []) {
                        const methodName = method.method.name;

                        const allowedMethods = [
                            "walk",
                            "grass-spots",
                            "long-grass",
                            "horde",
                            "red-flowers",
                            "yellow-flowers",
                            "white-flowers",
                            "purple-flowers",
                            "old-rod",
                            "good-rod",
                            "super-rod",
                            "surf",
                            "seaweed",
                            "dive",
                            "dark-grass",
                        ];

                        if (!allowedMethods.includes(methodName)) continue;

                        if (!encounters[methodName]) {
                            encounters[methodName] = new Set();
                        }
                        encounters[methodName].add(JSON.stringify({ name: pokemonName, id: pokemonId }));
                    }
                }
            }
        }

        // Convertir Sets a arrays
        const encountersArray = {};
        for (const [method, pokemonSet] of Object.entries(encounters)) {
            encountersArray[method] = Array.from(pokemonSet).map((p) => JSON.parse(p));
        }

        const hasNoEncounters = Object.keys(encountersArray).length === 0;
        const isGalarOrPaldea = ["galar", "paldea"].includes(regionSlug);

        return {
            encounters: encountersArray,
            noEncountersData: hasNoEncounters && isGalarOrPaldea,
        };
    } catch (e) {
        console.error(`Error fetching location encounters for ${locationSlug}:`, e);
        return {};
    }
}

/**
 * Traduce el nombre de una localización a español
 */
export function formatLocationName(locationSlug, apiEsName, apiEnName, customTranslator) {
    // Intenta traducción personalizada
    if (customTranslator) {
        const customName = customTranslator(locationSlug);
        if (customName) return customName;
    }

    // Rutas: forzar "Ruta N"
    const routeMatch = locationSlug.match(/route-(\d+)/);
    if (routeMatch) return `Ruta ${routeMatch[1]}`;

    // Usa nombre en español si existe
    if (apiEsName) return apiEsName;

    // Fallback a inglés o slug formateado
    if (apiEnName) return apiEnName;
    return locationSlug.replaceAll("-", " ");
}
