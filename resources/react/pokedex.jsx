// pokedex.jsx

/* =========================
   Constantes compartidas
========================= */

const REGIONS = {
    kanto: { label: "Kanto", from: 1, to: 151 },
    johto: { label: "Johto", from: 152, to: 251 },
    hoenn: { label: "Hoenn", from: 252, to: 386 },
    sinnoh: { label: "Sinnoh", from: 387, to: 493 },
    teselia: { label: "Teselia", from: 494, to: 649 },
    kalos: { label: "Kalos", from: 650, to: 721 },
    alola: { label: "Alola", from: 722, to: 809 },
    galar: { label: "Galar", from: 810, to: 898 },
    paldea: { label: "Paldea", from: 899, to: 1025 },
};

const TYPE_COLORS = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
};

const TYPE_TRANSLATIONS = {
    normal: "Normal",
    fire: "Fuego",
    water: "Agua",
    electric: "Eléctrico",
    grass: "Planta",
    ice: "Hielo",
    fighting: "Lucha",
    poison: "Veneno",
    ground: "Tierra",
    flying: "Volador",
    psychic: "Psíquico",
    bug: "Bicho",
    rock: "Roca",
    ghost: "Fantasma",
    dragon: "Dragón",
    dark: "Siniestro",
    steel: "Acero",
    fairy: "Hada",
};

/* =========================
   Componentes
========================= */

function RegionButtons({ currentRegion, regions, onRegionChange }) {
    return (
        <div className="subheader">
            {Object.entries(regions).map(([key, info]) => (
                <button
                    key={key}
                    className={`RegBtn ${currentRegion === key ? "active" : ""}`}
                    onClick={() => onRegionChange(key)}
                >
                    {info.label}
                </button>
            ))}
        </div>
    );
}

function PokemonCard({ pokemon, onCardClick }) {
    return (
        <div
            className="cuadrat"
            onClick={() => onCardClick(pokemon.id)}
        >
            <div className="pokeImageWrapper">
                <img className="imgPoke" src={pokemon.image} alt={pokemon.name} />
            </div>
            <div className="pokeInfo">
                <div className="pokeDexNum">#{String(pokemon.id).padStart(3, "0")}</div>
                <h2 className="pokeName">{pokemon.name}</h2>
                <div className="pokeTypes">
                    {pokemon.types.map((type) => (
                        <span
                            key={type}
                            className="pokeType"
                            style={{ backgroundColor: TYPE_COLORS[type] || "#999" }}
                        >
                            {TYPE_TRANSLATIONS[type] || type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function PokemonGrid({ pokemon, loading, onCardClick }) {
    if (loading) {
        return <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#5b8fc7" }}>Cargando Pokémon...</p>;
    }

    return (
        <div className="parentGrid">
            {pokemon.map((p) => (
                <PokemonCard key={p.id} pokemon={p} onCardClick={onCardClick} />
            ))}
        </div>
    );
}

/* =========================
   Componente principal
========================= */

window.Pokedex = function Pokedex() {
    const [region, setRegion] = React.useState("kanto");
    const [pokemon, setPokemon] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const { from, to } = REGIONS[region];

        let cancelled = false;
        (async () => {
            setLoading(true);
            try {
                const ids = Array.from({ length: to - from + 1 }, (_, i) => from + i);

                const results = await Promise.all(
                    ids.map(async (id) => {
                        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                        const data = await res.json();
                        return {
                            id,
                            name: data.name,
                            image: data.sprites.other["official-artwork"].front_default,
                            types: data.types.map((t) => t.type.name),
                        };
                    })
                );

                if (!cancelled) setPokemon(results);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [region]);

    const handleCardClick = (pokemonId) => {
        window.location.href = `pokemon.html?id=${pokemonId}`;
    };

    return (
        <div>
            <RegionButtons currentRegion={region} regions={REGIONS} onRegionChange={setRegion} />
            <h1 className="dexTitle">{REGIONS[region].label} Pokédex</h1>
            <PokemonGrid pokemon={pokemon} loading={loading} onCardClick={handleCardClick} />
        </div>
    );
};

const root = document.getElementById("kanto-root");
ReactDOM.createRoot(root).render(<window.Pokedex />);
