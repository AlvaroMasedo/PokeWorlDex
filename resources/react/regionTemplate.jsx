// regionTemplate.jsx
const { useEffect, useState } = React;

// Overrides de noms de regions en español
const REGION_NAME_ES_OVERRIDE = {
    unova: "Teselia",
};

// Funció reutilitzable, retorna el nom a mostrar segons dades i slug
function getRegionDisplayName(regionData, regionSlug) {
    // Override manual
    if (REGION_NAME_ES_OVERRIDE[regionSlug]) return REGION_NAME_ES_OVERRIDE[regionSlug];

    // Si la API té nom en español, usar-lo
    const esName = regionData?.names?.find((n) => n.language.name === "es")?.name;
    if (esName) return esName;

    // Fallback
    return regionData?.name || regionSlug;
}

// Funció per obtenir descripcions de regions en espanyol
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

// Funció obtenir nom del joc segons la regió
async function getGameNameByRegion(regionSlug) {
    const response = await fetch(`https://pokeapi.co/api/v2/region/${regionSlug}`);
    if (!response.ok) throw new Error("Error al obtener datos de la región");

    const regionData = await response.json();

    const versionGroups = await Promise.all(
        regionData.version_groups.map(async (vg) => {
            const vgResponse = await fetch(vg.url);
            if (!vgResponse.ok) throw new Error("Error al obtener datos del grupo de versiones");
            return vgResponse.json();
        })
    );

    const gamesSet = new Set();
    versionGroups.forEach((vg) => {
        (vg.versions || []).forEach((version) => {
            gamesSet.add(version.name);
        });
    });

    return Array.from(gamesSet);
}

function Region() {
    const urlParams = new URLSearchParams(window.location.search);
    const regionSlug = (urlParams.get("region") || "kanto").toLowerCase();

    const [regionData, setRegionData] = useState(null);
    const [games, setGames] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // cargar región
    useEffect(() => {
        const fetchRegion = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`https://pokeapi.co/api/v2/region/${regionSlug}`);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();
                setRegionData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRegion();
    }, [regionSlug]);

    // cargar juegos + traducir
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const slugs = await getGameNameByRegion(regionSlug);

                // window.translateGameNames debe existir (carga el script antes)
                const translated = window.translateGameNames ? window.translateGameNames(slugs) : slugs;

                setGames(translated);
            } catch (e) {
                console.error(e);
                setGames([]);
            }
        };
        fetchGames();
    }, [regionSlug]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!regionData) return <div>No se encontró información para la región especificada.</div>;

    const displayName = getRegionDisplayName(regionData, regionSlug);
    const description = getRegionDescription(regionSlug);

    return (
        <main>
            <div className="parent">
                <nav>
                    <h3>Puntos de interés</h3>
                    <div>
                        <div>
                            <img
                                className="punts-interes"
                                src="../../resources/img/maps/KantoMap.webp"
                                alt="Kanto region map"
                            />
                            <a href="mapa.html?region=kanto" className="button">Kanto</a>
                        </div>

                        <div>
                            <img
                                className="punts-interes"
                                src="../../resources/img/maps/JohtoMap.webp"
                                alt="Johto region map"
                            />
                            <a href="mapa.html?region=johto" className="button">Johto</a>
                        </div>
                    </div>
                </nav>

                <div className="section-region">
                    <h1>{displayName.toUpperCase()}</h1>
                    <p className="text">{description}</p>
                    <h3>Videojuegos de la Saga</h3>
                    <ul>
                        {games.map((game) => (
                            <li key={game}>{game}</li>
                        ))}
                    </ul>
                    <h3>Profesor Pokémon</h3>
                    <h3>Pokédex Nacional</h3>
                </div>
            </div>

            <div className="info">
                <h2>Pueblo paleta</h2>
                <p>Información sobre Pueblo Paleta.</p>
            </div>
        </main>
    );
}

const regionTemplateRoot = document.getElementById("region-template");
ReactDOM.createRoot(regionTemplateRoot).render(<Region />);
