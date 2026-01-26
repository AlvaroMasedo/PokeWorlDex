// regionService.js
/**
 * Servicio de negocio para operaciones relacionadas con regiones
 * Centraliza toda la lógica de obtención y procesamiento de datos de regiones
 */

import { fetchRegion } from './pokeApiService.js';

/**
 * Obtiene los slugs de juegos asociados a una región
 */
export async function getRegionGameVersions(regionSlug) {
    try {
        const regionData = await fetchRegion(regionSlug);

        const versionGroups = await Promise.all(
            regionData.version_groups.map(async (vg) => {
                const vgRes = await fetch(vg.url);
                if (!vgRes.ok) throw new Error(`Error version_group ${vg.name}: HTTP ${vgRes.status}`);
                return vgRes.json();
            })
        );

        const gamesSet = new Set();
        versionGroups.forEach((vg) => {
            (vg.versions || []).forEach((v) => gamesSet.add(v.name));
        });

        return Array.from(gamesSet);
    } catch (e) {
        console.error("Error fetching region game versions:", e);
        return [];
    }
}

/**
 * Obtiene las ubicaciones de una región
 */
export async function getRegionLocations(regionSlug) {
    try {
        const regionData = await fetchRegion(regionSlug);
        return regionData.locations || [];
    } catch (e) {
        console.error("Error fetching region locations:", e);
        return [];
    }
}

/**
 * Obtiene datos básicos de una región
 */
export async function getRegionData(regionSlug) {
    try {
        return await fetchRegion(regionSlug);
    } catch (e) {
        console.error("Error fetching region data:", e);
        return null;
    }
}
