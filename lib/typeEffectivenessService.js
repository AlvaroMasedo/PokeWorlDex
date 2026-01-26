// typeEffectivenessService.js
/**
 * Servicio para cálculos de efectividad de tipos
 * Centraliza toda la lógica relacionada con relaciones de daño entre tipos
 */

/**
 * Tipos que son débiles a sí mismos
 */
const WEAK_TO_SELF = ["ghost", "dragon"];

/**
 * Calcula la efectividad de un ataque contra un tipo (o dos tipos)
 * @param {string[]} typeNames - Array con 1 o 2 nombres de tipos
 * @returns {Promise<Object>} Objeto con arrays agrupados por multiplicador
 */
export async function calculateTypeEffectiveness(typeNames) {
    const effectiveness = {
        "x4": [],
        "x2": [],
        "x1": [],
        "x0.5": [],
        "x0.25": [],
        "x0": [],
    };

    try {
        const allTypes = await fetch("https://pokeapi.co/api/v2/type/").then((r) =>
            r.json().then((data) => data.results)
        );

        for (const typeOption of allTypes) {
            const typeData = await fetch(typeOption.url).then((r) => r.json());
            
            let multiplier = 1;

            for (const selectedType of typeNames) {
                const damageRelations = typeData.damage_relations;

                if (selectedType === typeData.name) {
                    // Casos especiales: Fantasma y Dragón son débiles a sí mismos
                    if (WEAK_TO_SELF.includes(selectedType)) {
                        multiplier *= 2;
                    } else {
                        // El resto de tipos son resistentes a sí mismos
                        multiplier *= 0.5;
                    }
                } else if (
                    damageRelations.double_damage_to.some((t) => t.name === selectedType)
                ) {
                    multiplier *= 2;
                } else if (
                    damageRelations.half_damage_to.some((t) => t.name === selectedType)
                ) {
                    multiplier *= 0.5;
                } else if (
                    damageRelations.no_damage_to.some((t) => t.name === selectedType)
                ) {
                    multiplier *= 0;
                }
            }

            // Agrupar por multiplicador
            groupByMultiplier(effectiveness, multiplier, typeData.name);
        }

        return effectiveness;
    } catch (e) {
        console.error("Error fetching type effectiveness:", e);
        return effectiveness;
    }
}

/**
 * Agrupa un tipo por su multiplicador
 */
function groupByMultiplier(effectiveness, multiplier, typeName) {
    if (multiplier === 4) {
        effectiveness["x4"].push(typeName);
    } else if (multiplier === 2) {
        effectiveness["x2"].push(typeName);
    } else if (multiplier === 1) {
        effectiveness["x1"].push(typeName);
    } else if (multiplier === 0.5) {
        effectiveness["x0.5"].push(typeName);
    } else if (multiplier === 0.25) {
        effectiveness["x0.25"].push(typeName);
    } else if (multiplier === 0) {
        effectiveness["x0"].push(typeName);
    }
}

/**
 * Traduce un nombre de tipo a español
 */
export function getTypeNameES(typeName, typeNamesMap) {
    return typeNamesMap[typeName] || typeName;
}

/**
 * Obtiene el color de un tipo
 */
export function getTypeColor(typeName, typeColorsMap) {
    return typeColorsMap[typeName] || "#999999";
}
