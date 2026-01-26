// pokemonService.js
/**
 * Servicio de negocio para operaciones relacionadas con Pokémon
 * Centraliza toda la lógica de obtención y procesamiento de datos de Pokémon
 */

import { fetchPokemon } from './pokeApiService.js';

/**
 * Obtiene datos completos de un Pokémon por ID
 */
export async function getPokemonData(id) {
    try {
        return await fetchPokemon(id);
    } catch (e) {
        console.error(`Error fetching pokemon ${id}:`, e);
        return null;
    }
}

/**
 * Obtiene la descripción en español de un Pokémon
 */
export async function getPokemonDescription(pokemonId) {
    try {
        const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        if (!resSpecies.ok) throw new Error(`Error fetching species: HTTP ${resSpecies.status}`);

        const species = await resSpecies.json();
        const entryEs = species.flavor_text_entries.find((e) => e.language.name === "es");

        if (entryEs) {
            return entryEs.flavor_text.replace(/\f|\n/g, " ");
        }

        return "Descripción no disponible";
    } catch (e) {
        console.error(`Error fetching description for pokemon ${pokemonId}:`, e);
        return "Error al cargar descripción";
    }
}

/**
 * Obtiene la cadena evolutiva de un Pokémon
 */
export async function getPokemonEvolutionChain(pokemonId) {
    try {
        const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        if (!resSpecies.ok) throw new Error(`Error fetching species: HTTP ${resSpecies.status}`);

        const species = await resSpecies.json();

        const resEvo = await fetch(species.evolution_chain.url);
        if (!resEvo.ok) throw new Error(`Error fetching evolution chain: HTTP ${resEvo.status}`);

        const evoData = await resEvo.json();

        const evoArray = [];
        let current = evoData.chain;

        while (current) {
            const speciesId = current.species.url.split("/").filter(Boolean).pop();

            evoArray.push({
                id: speciesId,
                name: current.species.name,
            });

            current = current.evolves_to[0];
        }

        return evoArray;
    } catch (e) {
        console.error(`Error fetching evolution chain for pokemon ${pokemonId}:`, e);
        return [];
    }
}

/**
 * Obtiene múltiples Pokémon en paralelo
 */
export async function getMultiplePokemonData(ids) {
    try {
        return Promise.all(ids.map((id) => getPokemonData(id)));
    } catch (e) {
        console.error("Error fetching multiple pokemon:", e);
        return [];
    }
}

/**
 * Obtiene datos completos de un Pokémon (datos + descripción + evoluciones)
 */
export async function getPokemonFullData(pokemonId) {
    try {
        const [pokemonData, description, evolutionChain] = await Promise.all([
            getPokemonData(pokemonId),
            getPokemonDescription(pokemonId),
            getPokemonEvolutionChain(pokemonId),
        ]);

        return {
            pokemon: pokemonData,
            description,
            evolutionChain,
        };
    } catch (e) {
        console.error(`Error fetching full pokemon data for ${pokemonId}:`, e);
        return {
            pokemon: null,
            description: "",
            evolutionChain: [],
        };
    }
}
