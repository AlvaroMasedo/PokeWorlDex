// tiposInteractivo.jsx
const { useEffect, useState } = React;

// Importar constantes y servicios
const TYPE_NAMES_ES = {
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

// Tipos que son débiles a sí mismos
const WEAK_TO_SELF = ["ghost", "dragon"];

/* =========================
   Servicios
========================= */

async function fetchAllTypes() {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/type/");
        const data = await res.json();
        return data.results.map((t) => t.name).sort();
    } catch (e) {
        console.error("Error fetching types:", e);
        return [];
    }
}

async function calculateTypeEffectiveness(typeNames) {
    const effectiveness = {
        x4: [],
        x2: [],
        x1: [],
        "x0.5": [],
        "x0.25": [],
        x0: [],
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
                    if (WEAK_TO_SELF.includes(selectedType)) {
                        multiplier *= 2;
                    } else {
                        multiplier *= 0.5;
                    }
                } else if (damageRelations.double_damage_to.some((t) => t.name === selectedType)) {
                    multiplier *= 2;
                } else if (damageRelations.half_damage_to.some((t) => t.name === selectedType)) {
                    multiplier *= 0.5;
                } else if (damageRelations.no_damage_to.some((t) => t.name === selectedType)) {
                    multiplier *= 0;
                }
            }

            if (multiplier === 4) {
                effectiveness.x4.push(typeData.name);
            } else if (multiplier === 2) {
                effectiveness.x2.push(typeData.name);
            } else if (multiplier === 1) {
                effectiveness.x1.push(typeData.name);
            } else if (multiplier === 0.5) {
                effectiveness["x0.5"].push(typeData.name);
            } else if (multiplier === 0.25) {
                effectiveness["x0.25"].push(typeData.name);
            } else if (multiplier === 0) {
                effectiveness.x0.push(typeData.name);
            }
        }

        return effectiveness;
    } catch (e) {
        console.error("Error fetching type effectiveness:", e);
        return effectiveness;
    }
}

/* =========================
   Componentes
========================= */

function TypeSelector({ allTypes, selectedTypes, onTypeToggle }) {
    return (
        <div className="tipo-selector">
            {allTypes.map((type) => (
                <button
                    key={type}
                    className={`tipo-button ${selectedTypes.includes(type) ? "selected" : ""}`}
                    style={{
                        backgroundColor: selectedTypes.includes(type) ? TYPE_COLORS[type] : "#f0f0f0",
                        color: selectedTypes.includes(type) ? "#fff" : "#333",
                        borderColor: TYPE_COLORS[type],
                    }}
                    onClick={() => onTypeToggle(type)}
                    disabled={selectedTypes.length === 2 && !selectedTypes.includes(type)}
                >
                    {TYPE_NAMES_ES[type] || type}
                </button>
            ))}
        </div>
    );
}

function SelectedTypesList({ selectedTypes, onRemove, onClear }) {
    return (
        <div className="selected-types">
            <h3>Tipos seleccionados:</h3>
            <div className="selected-list">
                {selectedTypes.map((type) => (
                    <div key={type} className="selected-item" style={{ backgroundColor: TYPE_COLORS[type] }}>
                        <span>{TYPE_NAMES_ES[type]}</span>
                        <button className="remove-btn" onClick={() => onRemove(type)}>
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            <button className="clear-btn" onClick={onClear}>
                Limpiar selección
            </button>
        </div>
    );
}

function EffectivenessGrid({ effectiveness }) {
    const cards = [
        { key: "x4", emoji: "✓✓", label: "x4 (Muy débil a)", className: "x4" },
        { key: "x2", emoji: "✓", label: "x2 (Débil a)", className: "x2" },
        { key: "x1", emoji: "=", label: "x1 (Neutral)", className: "x1" },
        { key: "x0.5", emoji: "←", label: "x0.5 (Resistencia)", className: "x05" },
        { key: "x0.25", emoji: "←←", label: "x0.25 (Gran resistencia)", className: "x025" },
        { key: "x0", emoji: "∅", label: "x0 (Inmunidad)", className: "x0" },
    ];

    return (
        <div className="effectiveness-grid">
            {cards.map(
                (card) =>
                    effectiveness[card.key].length > 0 && (
                        <div key={card.key} className={`effectiveness-card ${card.className}`}>
                            <h3>
                                {card.emoji} {card.label}
                            </h3>
                            <div className="type-list">
                                {effectiveness[card.key].map((type) => (
                                    <span
                                        key={type}
                                        className="type-badge"
                                        style={{ backgroundColor: TYPE_COLORS[type] }}
                                    >
                                        {TYPE_NAMES_ES[type] || type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )
            )}
        </div>
    );
}

function TiposInteractivo() {
    const [allTypes, setAllTypes] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [effectiveness, setEffectiveness] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTypes = async () => {
            const types = await fetchAllTypes();
            setAllTypes(types);
        };
        loadTypes();
    }, []);

    useEffect(() => {
        if (selectedTypes.length === 0) {
            setEffectiveness(null);
            return;
        }

        const calculate = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await calculateTypeEffectiveness(selectedTypes);
                setEffectiveness(result);
            } catch (e) {
                setError("Error al calcular la efectividad");
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        calculate();
    }, [selectedTypes]);

    const handleTypeToggle = (type) => {
        setSelectedTypes((prev) => {
            if (prev.includes(type)) {
                return prev.filter((t) => t !== type);
            } else if (prev.length < 2) {
                return [...prev, type];
            }
            return prev;
        });
    };

    const handleClear = () => {
        setSelectedTypes([]);
        setEffectiveness(null);
    };

    return (
        <div className="tipos-container">
            <div className="tipos-header">
                <h1>Tabla Interactiva de Tipos</h1>
                <p>Selecciona uno o dos tipos de Pokémon para ver sus debilidades y fortalezas</p>
            </div>

            <div className="selector-section">
                <h2>Selecciona los tipos</h2>
                <TypeSelector allTypes={allTypes} selectedTypes={selectedTypes} onTypeToggle={handleTypeToggle} />

                {selectedTypes.length > 0 && (
                    <SelectedTypesList
                        selectedTypes={selectedTypes}
                        onRemove={handleTypeToggle}
                        onClear={handleClear}
                    />
                )}
            </div>

            {loading && <div className="loading">Cargando información de tipos...</div>}
            {error && <div className="error">{error}</div>}

            {effectiveness && selectedTypes.length > 0 && (
                <div className="effectiveness-section">
                    <h2>Análisis de Efectividad</h2>
                    <EffectivenessGrid effectiveness={effectiveness} />

                    <div className="legend">
                        <h3>¿Cómo leer esta tabla?</h3>
                        <ul>
                            <li>
                                <strong>x4:</strong> Ataques de estos tipos causan 4x de daño (muy débil)
                            </li>
                            <li>
                                <strong>x2:</strong> Ataques de estos tipos causan el doble de daño (débil)
                            </li>
                            <li>
                                <strong>x1:</strong> Ataques de estos tipos causan daño normal
                            </li>
                            <li>
                                <strong>x0.5:</strong> Ataques de estos tipos causan la mitad de daño (resistencia)
                            </li>
                            <li>
                                <strong>x0.25:</strong> Ataques de estos tipos causan 1/4 de daño (gran resistencia)
                            </li>
                            <li>
                                <strong>x0:</strong> Ataques de estos tipos no causan daño (inmunidad completa)
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {!effectiveness && selectedTypes.length === 0 && !loading && (
                <div className="empty-state">
                    <p>Selecciona uno o dos tipos para ver su análisis de efectividad</p>
                </div>
            )}
        </div>
    );
}

// Renderizar componente
const container = document.getElementById("tipos-container");
if (container) {
    ReactDOM.createRoot(container).render(<TiposInteractivo />);
}
