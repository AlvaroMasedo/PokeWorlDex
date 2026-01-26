/**
 * Manejador centralizado de errores
 * Proporciona consistencia en el tratamiento de errores en toda la aplicación
 */

// Tipos de error personalizados
export class PokemonDataError extends Error {
    constructor(message, code = "POKEMON_ERROR") {
        super(message);
        this.name = "PokemonDataError";
        this.code = code;
    }
}

export class RegionDataError extends Error {
    constructor(message, code = "REGION_ERROR") {
        super(message);
        this.name = "RegionDataError";
        this.code = code;
    }
}

export class LocationDataError extends Error {
    constructor(message, code = "LOCATION_ERROR") {
        super(message);
        this.name = "LocationDataError";
        this.code = code;
    }
}

export class ApiError extends Error {
    constructor(message, statusCode = null, code = "API_ERROR") {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.code = code;
    }
}

/**
 * Obtiene un mensaje de error legible en español
 */
export function getErrorMessage(error, context = "") {
    // Errores conocidos con mensajes específicos
    const errorMessages = {
        "failed-to-fetch": "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
        "json-error": "Error al procesar los datos del servidor.",
        "404": "No se encontraron datos para esta solicitud.",
        "500": "Error en el servidor. Por favor intenta más tarde.",
        "NO_ENCOUNTERS": `No hay datos de encuentros disponibles en esta región. (Limitación de PokeAPI)`,
    };

    // Si es un error personalizado
    if (error instanceof Error) {
        if (error.code && errorMessages[error.code]) {
            return errorMessages[error.code];
        }
        if (errorMessages[error.message]) {
            return errorMessages[error.message];
        }
        return error.message || "Ocurrió un error desconocido";
    }

    // Fallback
    return `Error al cargar ${context || "los datos"}. Por favor intenta de nuevo.`;
}

/**
 * Log seguro de errores
 */
export function logError(error, context = "") {
    console.error(`[${context || "App"}] Error:`, {
        name: error?.name,
        message: error?.message,
        code: error?.code,
        stack: error?.stack,
    });
}

/**
 * Valida la respuesta de una API
 */
export function validateApiResponse(response, context = "") {
    if (!response) {
        throw new ApiError(`Respuesta vacía desde API`, null, "EMPTY_RESPONSE");
    }

    if (response.error) {
        throw new ApiError(`Error en API: ${response.error}`, null, "API_ERROR");
    }

    if (response.detail) {
        throw new ApiError(`Error en API: ${response.detail}`, 404, "NOT_FOUND");
    }

    return response;
}

/**
 * Maneja el caso específico de ausencia de datos de encuentros
 */
export function handleNoEncountersData(regionSlug) {
    const noDataRegions = ["galar", "paldea"];

    if (noDataRegions.includes(regionSlug)) {
        return {
            noEncountersData: true,
            message: `La región ${regionSlug.charAt(0).toUpperCase() + regionSlug.slice(1)} no tiene datos de encuentros disponibles en PokeAPI.`,
        };
    }

    return null;
}

/**
 * Crea una respuesta de error estandarizada
 */
export function createErrorResponse(error, context = "") {
    return {
        success: false,
        error: getErrorMessage(error, context),
        details: {
            name: error?.name,
            code: error?.code,
            statusCode: error?.statusCode,
        },
    };
}

/**
 * Crea una respuesta de éxito estandarizada
 */
export function createSuccessResponse(data, metadata = {}) {
    return {
        success: true,
        data,
        metadata,
    };
}

/**
 * Retry logic para fallos de red
 */
export async function retryFetch(url, options = {}, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new ApiError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status,
                    "HTTP_ERROR"
                );
            }
            return response;
        } catch (error) {
            if (i === retries - 1) {
                throw new ApiError(
                    `Failed after ${retries} retries: ${error.message}`,
                    null,
                    "FETCH_ERROR"
                );
            }
            // Espera antes de reintentar (exponential backoff)
            await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
        }
    }
}
