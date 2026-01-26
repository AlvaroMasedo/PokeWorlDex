// PokemonCard.jsx
/**
 * Componente reutilizable para mostrar tarjetas de Pokémon
 * Se usa en la Pokédex y otras vistas que muestren Pokémon
 */

function PokemonCard({ pokemon, typeColor, typeNameES, onClick }) {
    const handleClick = () => {
        if (onClick) {
            onClick(pokemon.id);
        }
    };

    return (
        <div className="cuadrat" onClick={handleClick} style={{ cursor: onClick ? "pointer" : "default" }}>
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
                            style={{ backgroundColor: typeColor(type) || "#999" }}
                        >
                            {typeNameES(type) || type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
