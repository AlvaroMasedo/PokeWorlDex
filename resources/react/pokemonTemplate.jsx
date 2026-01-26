window.PokemonTemplate = function PokemonTemplate() {
  const [pokemon, setPokemon] = React.useState(null);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    (async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);
    })();
  }, []);

  if (!pokemon) {
    return <p>Cargando Pokémon...</p>;
  }

  return (
    <div className="divPoke">
      <h1 style={{ textTransform: "capitalize" }}>
        #{pokemon.id} {pokemon.name}
      </h1>

      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        style={{ width: "300px" }}
        className="poke"
      />

        <p>
            <strong>Tipos:</strong>{" "}
            {window.translateTypes(
            pokemon.types.map(t => t.type.name)
            ).join(", ")}
        </p>

      <button className="btnPoke" onClick={() => window.history.back()}>
        Volver
      </button>
    </div>
  );
};

const root = document.getElementById("pokemon-root");
ReactDOM.createRoot(root).render(<window.PokemonTemplate />);
