// regionTemplate.jsx
const { useEffect, useMemo, useState } = React;

/* =========================
   Config / Diccionarios
========================= */

const REGION_NAME_ES_OVERRIDE = { unova: "Teselia" };

const REGION_PROFESSOR_IMAGE = {
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

const REGION_PROFESSOR = {
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

const REGION_STARTERS = {
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

/* Traducción de métodos de encuentro */
const ENCOUNTER_METHOD_NAMES = {
    "walk": "Caminando",
    "old-rod": "Caña Vieja",
    "good-rod": "Caña Buena",
    "super-rod": "Caña Excelente",
    "surf": "Surf",
    "fish": "Pescando",
    "headbutt": "Cabezazo",
    "gift": "Regalo",
    "egg": "Huevo",
    "roaming": "Errante",
    "gift-egg": "Regalo (Huevo)",
    "stationary": "Estacionario",
    "static": "Estático",
    "trade": "Intercambio",
    "breeding": "Crianza",
    "dark-grass": "Hierba Oscura",
    "grass": "Hierba",
    "tall-grass": "Hierba Alta",
    "cave": "Cueva",
    "surfing": "Surfear",
    "rock-smash": "Golpe Roca",
    "horde": "Horda",
    "bush": "Arbusto",
    "water-surface": "Superficie del Agua",
    "ripple": "Agitación del Agua",
    "shaking-grass": "Hierba Agitada",
    "shaking-spots": "Manchas que Tiemblan",
    "nest": "Nido",
    "nests": "Nidos",
    "safari-zone": "Safari",
    "max-raid-battle": "Incursión Dynamax",
    "symbol-gift": "Regalo Especial",
};

/* =========================
   Helpers (UI)
========================= */

function getRegionDisplayName(regionData, regionSlug) {
    if (REGION_NAME_ES_OVERRIDE[regionSlug]) return REGION_NAME_ES_OVERRIDE[regionSlug];
    const esName = regionData?.names?.find((n) => n.language.name === "es")?.name;
    return esName || regionData?.name || regionSlug;
}

function getRegionDescription(regionSlug) {
    switch (regionSlug) {
        case "kanto":
            return "Kanto es la región original del mundo Pokémon y el punto de partida de muchas aventuras. Se caracteriza por su geografía equilibrada, con ciudades conectadas por rutas sencillas, cuevas naturales y una clara separación entre zonas urbanas y salvajes. Su estructura sentó las bases del viaje Pokémon clásico, combinando exploración, combates y progreso constante a lo largo del territorio.";
        case "johto":
            return "Johto es una región con una profunda conexión con la historia y las tradiciones del mundo Pokémon. Destaca por la presencia de edificios antiguos, leyendas transmitidas a lo largo del tiempo y una fuerte relación entre la naturaleza y la cultura local. Sus paisajes rurales, templos y ciudades históricas crean una atmósfera más tranquila y reflexiva que otras regiones.";
        case "hoenn":
            return "Hoenn es una región muy diversa desde el punto de vista natural, con un gran protagonismo del mar y las rutas acuáticas. Islas, playas, volcanes y selvas forman parte de un territorio dinámico que obliga a adaptarse constantemente al entorno. La convivencia entre tierra y océano es uno de los elementos centrales que definen la identidad de esta región.";
        case "sinnoh":
            return "Sinnoh es una región marcada por su terreno montañoso y su clima frío, con extensas rutas nevadas y elevaciones que dividen el mapa en diferentes zonas. Posee una mitología muy rica, estrechamente ligada al origen del mundo Pokémon y a antiguas creencias. La exploración en Sinnoh suele ser más exigente, reforzando su carácter épico y legendario.";
        case "unova":
            return "Teselia es una región inspirada en grandes áreas metropolitanas y en la vida urbana moderna. Presenta una clara mezcla entre naturaleza y ciudad, con grandes núcleos urbanos, puentes, rascacielos y zonas industriales. A diferencia de otras regiones, Teselia apuesta por una sensación de renovación y cambio, ofreciendo una visión más contemporánea del mundo Pokémon.";
        case "kalos":
            return "Kalos es una región conocida por su elegancia, estética cuidada y fuerte influencia cultural. La arquitectura, el arte y la moda tienen un papel destacado en sus ciudades, que contrastan con amplios espacios naturales y rutas abiertas. Kalos transmite una sensación de sofisticación y modernidad, manteniendo al mismo tiempo el espíritu de exploración.";
        case "alola":
            return "Alola está formada por un conjunto de islas tropicales con una identidad cultural muy marcada. La región se distingue por su relación cercana con el entorno natural y por una forma de vida más relajada. Cada isla tiene sus propias características, lo que aporta variedad y personalidad al conjunto del archipiélago.";
        case "galar":
            return "Galar es una región con un fuerte carácter industrial y deportivo, donde las grandes ciudades conviven con extensas áreas rurales. Su territorio está atravesado por vías de transporte modernas y zonas urbanas densas, reflejando una sociedad estructurada en torno al progreso y la tradición. El contraste entre campo y ciudad es uno de sus rasgos más destacados.";
        case "paldea":
            return "Paldea es una región extensa y abierta que destaca por su libertad de exploración y diversidad geográfica. Montañas, llanuras, desiertos y costas forman parte de un territorio variado que invita a recorrerlo sin un camino estrictamente lineal. La región refleja una mezcla de culturas y paisajes, ofreciendo una experiencia amplia y flexible dentro del mundo Pokémon.";
        default:
            return "Descripción no disponible para esta región.";
    }
}

function getRegionProfessor(regionSlug) {
    return REGION_PROFESSOR[regionSlug] || "Desconocido";
}

function getRegionStarters(regionSlug) {
    return REGION_STARTERS[regionSlug] || [];
}

function translateEncounterMethod(methodName) {
    return ENCOUNTER_METHOD_NAMES[methodName] || methodName.charAt(0).toUpperCase() + methodName.slice(1).replaceAll("-", " ");
}

/* =========================
   Helpers (API)
========================= */

// 1) Región
async function fetchRegion(regionSlug) {
    const res = await fetch(`https://pokeapi.co/api/v2/region/${regionSlug}`);
    if (!res.ok) throw new Error(`Error región (${regionSlug}): HTTP ${res.status}`);
    return res.json();
}

// 2) Juegos (version_groups -> versions)
async function fetchRegionGameSlugs(regionSlug) {
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
}

// 3) Starters: imagen oficial
async function fetchStarterImages(regionSlug) {
    const starters = getRegionStarters(regionSlug);

    const results = await Promise.all(
        starters.map(async (name) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            if (!res.ok) throw new Error(`No se pudo cargar starter ${name}: HTTP ${res.status}`);
            const data = await res.json();

            return {
                name: data.name,
                id: data.id,
                image: data.sprites.other["official-artwork"].front_default,
            };
        })
    );

    return results;
}

// Puntos de interés: SOLO rutas + ciudades/pueblos/“áreas importantes”
// - Traduce usando window.getLocationNameES (tu diccionario + fallback)
// - Si no existe window.getLocationNameES, usa ES/EN de la API o slug formateado
async function fetchRoutesAndCities(regionData, regionSlug) {
    // Palabras para descartar “no-ciudades” cuando no hay patrón claro
    const NON_TOWN_KEYWORDS = [
        "cave", "forest", "woods", "mine", "mount", "mt", "tower", "sea", "desert",
        "lake", "river", "beach", "bay", "island", "tunnel", "trail", "ruins",
        "power-plant", "safari", "dojo"
    ];

    // Paldea: muchas “zonas” no son rutas ni cities/towns
    // (provincia/area/mesagoza etc). Si tienes diccionario, mejor, pero esto ayuda.
    const PALDEA_ALLOW = ["province", "area"];

    // Galar: muchas ciudades no llevan City/Town
    const GALAR_TOWNS_ALLOW = [
        "postwick", "wedgehurst", "motostoke", "turffield", "hulbury",
        "hammerlocke", "stow-on-side", "ballonlea", "circhester",
        "spikemuth", "wyndon"
    ];

    // 1) Traducimos cada location a un nombre “final”
    const translated = await Promise.all(
        regionData.locations.map(async (loc) => {

            const routeMatch = loc.name.match(/route-(\d+)/);
            if (routeMatch) {
                return {
                    slug: loc.name,
                    name: `Ruta ${routeMatch[1]}`,
                };
            }
            const fallback = loc.name.replaceAll("-", " ");

            const res = await fetch(loc.url);
            if (!res.ok) return { slug: loc.name, name: fallback };

            const data = await res.json();

            const apiEsName = data.names?.find((n) => n.language.name === "es")?.name;
            const apiEnName = data.names?.find((n) => n.language.name === "en")?.name;

            const name = window.getLocationNameES
                ? window.getLocationNameES({
                    regionSlug,
                    locationSlug: loc.name,
                    apiEsName,
                    apiEnName,
                })
                : (apiEsName || apiEnName || fallback);

            return { slug: loc.name, name };
        })
    );

    // 2) Filtrar SOLO lo que queremos (rutas + ciudades/pueblos + paldea areas)
    const filtered = translated.filter((x) => {
        const slug = x.slug.toLowerCase();
        const n = x.name.toLowerCase();

        // Rutas (ES/EN + slug)
        const isRoute =
            n.includes("ruta ") ||
            n.includes("route ") ||
            slug.includes("route") ||
            slug.includes("sea-route");

        // Ciudades/pueblos por palabra (ES/EN)
        const isTownByWord =
            n.includes("ciudad ") ||
            n.includes("pueblo ") ||
            n.includes("villa ") ||
            n.includes(" city") ||
            n.includes(" town") ||
            n.includes(" village");

        // Galar towns (allowlist)
        const isGalarTown =
            regionSlug === "galar" &&
            GALAR_TOWNS_ALLOW.some((t) => slug === t || n === t);

        // Paldea zones (province/area)
        const isPaldeaZone =
            regionSlug === "paldea" &&
            PALDEA_ALLOW.some((k) => slug.includes(k) || n.includes(k));

        // Evitar cuevas/bosques etc si estamos detectando “town”
        const looksLikeNonTown = NON_TOWN_KEYWORDS.some((k) => slug.includes(k) || n.includes(k));

        if (isRoute) return true;
        if (isGalarTown) return true;
        if (isPaldeaZone) return true;

        // Si parece ciudad/pueblo pero no es cueva/mina/etc
        if (isTownByWord && !looksLikeNonTown) return true;

        return false;
    });

    // 3) Ordenar
    filtered.sort((a, b) => a.name.localeCompare(b.name, "es"));

    // 🔥 Eliminar duplicados por nombre visible (Ciudad Hauoli, etc.)
    const uniqueByName = [];
    const seenNames = new Set();

    for (const item of filtered) {
        const key = item.name.toLowerCase();
        if (!seenNames.has(key)) {
            seenNames.add(key);
            uniqueByName.push(item);
        }
    }

    return uniqueByName;
}

// Obtener detalles de una localización (encuentros, etc)
async function fetchLocationDetails(locationSlug, regionSlug, gameVersions) {
    try {
        const locationRes = await fetch(`https://pokeapi.co/api/v2/location/${locationSlug}`);
        if (!locationRes.ok) throw new Error(`No se encontró localización: ${locationSlug}`);
        const locationData = await locationRes.json();

        // Casos especiales (regiones sin datos en PokeAPI)
        if (["galar", "paldea"].includes(regionSlug)) {
            return {
                name: locationData.names?.find(n => n.language.name === "es")?.name || locationSlug,
                noEncountersData: true,
                encounters: {}
            };
        }

        // Obtener área de la localización
        const areaUrl = locationData.areas && locationData.areas.length > 0 
            ? locationData.areas[0].url 
            : null;

        if (!areaUrl) {
            return {
                name: locationData.names?.find(n => n.language.name === "es")?.name || locationSlug,
                encounters: {}
            };
        }

        const areaRes = await fetch(areaUrl);
        if (!areaRes.ok) throw new Error(`No se encontró área: ${areaUrl}`);
        const areaData = await areaRes.json();

        // Procesar encuentros por método
        const encountersMap = {};

        if (areaData.pokemon_encounters && Array.isArray(areaData.pokemon_encounters)) {
            for (const enc of areaData.pokemon_encounters) {
                const pokemonRes = await fetch(enc.pokemon.url);
                if (!pokemonRes.ok) continue;
                const pokemonData = await pokemonRes.json();

                const pokemonInfo = {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    sprite: pokemonData.sprites.front_default
                };

                for (const detail of enc.version_details) {
                    if (!gameVersions.includes(detail.version.name)) continue;

                    for (const method of detail.encounter_details) {
                        const methodName = method.method.name.replaceAll("-", " ");
                        
                        if (!encountersMap[methodName]) {
                            encountersMap[methodName] = [];
                        }

                        if (!encountersMap[methodName].some(p => p.id === pokemonInfo.id)) {
                            encountersMap[methodName].push(pokemonInfo);
                        }
                    }
                }
            }
        }

        return {
            name: locationData.names?.find(n => n.language.name === "es")?.name || locationSlug,
            encounters: encountersMap
        };
    } catch (e) {
        console.error("Error cargando localización:", e);
        return null;
    }
}

/* =========================
   Component
========================= */

function Region() {
    const regionSlug = useMemo(() => {
        const urlParams = new URLSearchParams(window.location.search);
        return (urlParams.get("region") || "kanto").toLowerCase();
    }, []);

    // Datos base
    const [regionData, setRegionData] = useState(null);
    const [loadingRegion, setLoadingRegion] = useState(true);
    const [errorRegion, setErrorRegion] = useState(null);

    // Juegos
    const [games, setGames] = useState([]);
    const [loadingGames, setLoadingGames] = useState(true);

    // Starters
    const [starters, setStarters] = useState([]);
    const [loadingStarters, setLoadingStarters] = useState(true);

    // Puntos de interés (rutas+ciudades)
    const [interestPoints, setInterestPoints] = useState({ routes: [], cities: [] });
    const [loadingPoints, setLoadingPoints] = useState(true);

    // Localización seleccionada
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    // Versiones de juegos (slugs sin traducir para filtrar encuentros)
    const [gameVersions, setGameVersions] = useState([]);

    // Ref para scroll automático
    const infoSectionRef = React.useRef(null);

    // 1) Cargar región
    useEffect(() => {
        const run = async () => {
            try {
                setLoadingRegion(true);
                setErrorRegion(null);
                const data = await fetchRegion(regionSlug);
                setRegionData(data);
            } catch (e) {
                setErrorRegion(e.message);
                setRegionData(null);
            } finally {
                setLoadingRegion(false);
            }
        };

        run();
    }, [regionSlug]);

    // 2) Cargar puntos de interés (solo rutas+ciudades) cuando hay regionData
    useEffect(() => {
        if (!regionData) return;

        const run = async () => {
            try {
                setLoadingPoints(true);
                const points = await fetchRoutesAndCities(regionData, regionSlug);
                
                // Separar rutas de ciudades/pueblos
                const routes = points.filter(p => 
                    p.name.toLowerCase().includes('ruta') || 
                    p.name.toLowerCase().includes('route') ||
                    p.slug.toLowerCase().includes('route')
                ).sort((a, b) => {
                    // Extraer números de las rutas
                    const numA = parseInt(a.name.match(/\d+/)?.[0] || '0');
                    const numB = parseInt(b.name.match(/\d+/)?.[0] || '0');
                    return numA - numB;
                });
                
                const cities = points.filter(p => 
                    !p.name.toLowerCase().includes('ruta') && 
                    !p.name.toLowerCase().includes('route') &&
                    !p.slug.toLowerCase().includes('route')
                );
                
                setInterestPoints({ routes, cities });
            } catch (e) {
                console.error(e);
                setInterestPoints({ routes: [], cities: [] });
            } finally {
                setLoadingPoints(false);
            }
        };

        run();
    }, [regionData, regionSlug]);


    // 3) Cargar juegos
    useEffect(() => {
        const run = async () => {
            try {
                setLoadingGames(true);
                const slugs = await fetchRegionGameSlugs(regionSlug);

                // Guardar los slugs sin traducir para filtrar encuentros
                setGameVersions(slugs);

                // Traducción si existe tu librería global
                const translated = window.translateGameNames ? window.translateGameNames(slugs) : slugs;
                setGames(translated);
            } catch (e) {
                console.error(e);
                setGames([]);
                setGameVersions([]);
            } finally {
                setLoadingGames(false);
            }
        };

        run();
    }, [regionSlug]);

    // 4) Cargar starters
    useEffect(() => {
        const run = async () => {
            try {
                setLoadingStarters(true);
                const arr = await fetchStarterImages(regionSlug);
                setStarters(arr);
            } catch (e) {
                console.error(e);
                setStarters([]);
            } finally {
                setLoadingStarters(false);
            }
        };

        run();
    }, [regionSlug]);

    // Manejar click en una localización
    const handleLocationClick = async (locationSlug, locationName) => {
        setLoadingLocation(true);
        const details = await fetchLocationDetails(locationSlug, regionSlug, gameVersions);
        if (details) {
            setSelectedLocation({ slug: locationSlug, ...details });
            // Scroll automático a la sección de abajo
            setTimeout(() => {
                infoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
        setLoadingLocation(false);
    };

    if (loadingRegion) return <div>Cargando...</div>;
    if (errorRegion) return <div>Error: {errorRegion}</div>;
    if (!regionData) return <div>No se encontró información para la región especificada.</div>;

    const displayName = getRegionDisplayName(regionData, regionSlug);
    const description = getRegionDescription(regionSlug);

    const bgUrl = `../../resources/img/regionsBackground/${regionSlug.charAt(0).toUpperCase() + regionSlug.slice(1)}.webp`;

    return (
        <main>
            <div className="parent" style={{ backgroundImage: `url('${bgUrl}')` }}>
                <nav>
                    <h3>Rutas y Cuevas</h3>
                    {loadingPoints ? (
                        <p>Cargando rutas...</p>
                    ) : (
                        <ul className="interest-list">
                            {interestPoints.routes.map((p) => (
                                <li key={p.slug}>
                                    <button 
                                        onClick={() => handleLocationClick(p.slug, p.name)} 
                                        className="button"
                                    >
                                        {p.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <h3 className="nav-subtitle">Ciudades y Pueblos</h3>
                    {loadingPoints ? (
                        <p>Cargando ciudades...</p>
                    ) : (
                        <ul className="interest-list">
                            {interestPoints.cities.map((p) => (
                                <li key={p.slug}>
                                    <button 
                                        onClick={() => handleLocationClick(p.slug, p.name)} 
                                        className="button"
                                    >
                                        {p.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </nav>

                <div className="section-region">
                    <h1>{displayName.toUpperCase()}</h1>
                    <p className="text">{description}</p>

                    <h3>Videojuegos de la Saga</h3>
                    {loadingGames ? (
                        <p>Cargando juegos...</p>
                    ) : (
                        <div className="games-container">
                            {games.map((game) => (
                                <div key={game} className="game-item">
                                    {game}
                                </div>
                            ))}
                        </div>
                    )}

                    <h3>Profesor Pokémon</h3>
                    <div className="professor-section">
                        <div className="professor-image-wrapper">
                            <img 
                                src={`../../resources/img/professors/${REGION_PROFESSOR_IMAGE[regionSlug]}.webp`} 
                                alt={getRegionProfessor(regionSlug)}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                        <div className="professor-info">
                            <h4>
                                {getRegionProfessor(regionSlug)}
                            </h4>
                            <p>Profesor de la región</p>
                        </div>
                    </div>
                    <h3>Pokémon Iniciales</h3>
                    {loadingStarters ? (
                        <p>Cargando iniciales...</p>
                    ) : (
                        <div className="starters">
                            {starters.map((p) => (
                                <a key={p.name} href={`pokemon.html?id=${p.id}`} className="starter-card">
                                    <img src={p.image} alt={p.name} />
                                    <p>{p.name}</p>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="info" ref={infoSectionRef}>
                {loadingLocation ? (
                    <p>Cargando información de la localización...</p>
                ) : selectedLocation ? (
                    <div>
                        <h2>{selectedLocation.name} - {displayName}</h2>

                        {selectedLocation.noEncountersData ? (
                            <div className="alert-box">
                                <h3>ℹ️ Datos de Pokémon no disponibles</h3>
                                <p>
                                    Lamentablemente, la PokeAPI no proporciona datos de encuentros de Pokémon para <strong>{displayName}</strong>. 
                                    Esta es una limitación de la API, ya que {displayName} es una región más reciente con una estructura de juego diferente.
                                </p>
                                <p>
                                    Para mostrar los Pokémon de esta región, sería necesario usar una fuente de datos alternativa como Bulbapedia o una base de datos especializada en juegos de Pokémon modernos.
                                </p>
                            </div>
                        ) : Object.keys(selectedLocation.encounters).length > 0 ? (
                            <div className="encounters-section">
                                <h3>Pokémon Salvajes que Aparecen</h3>
                                {Object.entries(selectedLocation.encounters).map(([method, pokemons]) => (
                                    <div key={method} className="encounter-method">
                                        <h4 className="method-header">
                                            {translateEncounterMethod(method)}
                                        </h4>
                                        <div className="pokemon-grid">
                                            {pokemons.map((pokemon) => (
                                                <a
                                                    key={pokemon.id}
                                                    href={`pokemon.html?id=${pokemon.id}`}
                                                    className="pokemon-card"
                                                >
                                                    <img
                                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                                                        alt={pokemon.name}
                                                    />
                                                    <p>{pokemon.name}</p>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No hay información de Pokémon salvajes para esta localización.</p>
                        )}
                    </div>
                ) : (
                    <div className="info-empty-state">
                        <h2>Selecciona una localización</h2>
                        <p>
                            Haz clic en una ruta, ciudad o pueblo para ver información detallada sobre los Pokémon salvajes que aparecen.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}

const regionTemplateRoot = document.getElementById("region-template");
ReactDOM.createRoot(regionTemplateRoot).render(<Region />);
