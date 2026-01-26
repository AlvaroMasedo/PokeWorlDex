window.PokemonTemplate = function PokemonTemplate() {
  const [pokemon, setPokemon] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [evolution, setEvolution] = React.useState([]);

  //fetch pokemons
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

  //fetch descripciones pokemon
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    (async () => {
      // Pokémon básico
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);

      // Species (descripciones)
      const resSpecies = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const species = await resSpecies.json();

      const entryEs = species.flavor_text_entries.find(
        e => e.language.name === "es"
      );

      if (entryEs) {
        setDescription(
          entryEs.flavor_text.replace(/\f|\n/g, " ")
        );
      }
    })();
  }, []);

  //fetch cadena evolutiva
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    (async () => {
      // Pokemon
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);

      // Species
      const resSpecies = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const species = await resSpecies.json();

      // Descripcion en español
      const entryEs = species.flavor_text_entries.find(
        e => e.language.name === "es"
      );
      if (entryEs) {
        setDescription(entryEs.flavor_text.replace(/\f|\n/g, " "));
      }

      // 🔥 Cadena evolutiva
      const resEvo = await fetch(species.evolution_chain.url);
      const evoData = await resEvo.json();

      const evoArray = [];
      let current = evoData.chain;

      while (current) {
        // current.species.url = "https://pokeapi.co/api/v2/pokemon-species/1/"
        const speciesId = current.species.url.split("/").filter(Boolean).pop();

        evoArray.push({
          id: speciesId,
          name: current.species.name,
        });

        current = current.evolves_to[0];
      }

      setEvolution(evoArray);
    })();
  }, []);

  if (!pokemon) {
    return <p>Cargando Pokémon...</p>;
  }
  return (
    <div className="divPoke">
      <div className="divPokeDesc">
        <div className="pokeImageSection">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="poke"
          />
          <div className="types">
            {pokemon.types.map(t => (
              <p key={t.type.name} className={t.type.name}>
                {window.translateTypes([t.type.name])[0]}
              </p>
            ))}
          </div>
        </div>
        <div className="pokeText">
          <div className="pokeTitle">
            <span className="pokeId">#{pokemon.id}</span>
            <h1 className="pokeName">{pokemon.name}</h1>
          </div>

          <p>{description}</p>

          {evolution.length > 1 && (
            <div className="evolution">
              <h3>Cadena evolutiva</h3>
              <div className="evoList">
                {evolution.map(e => (
                  <img
                    key={e.id}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${e.id}.png`}
                    alt={e.name}
                    title={e.name}
                    className="evoImg"
                    onClick={() => { window.location.href = `pokemon.html?id=${e.id}`; }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <button className="btnPoke" onClick={() => window.history.back()}>
        Volver
      </button>
    </div>
  );
};

const root = document.getElementById("pokemon-root");
ReactDOM.createRoot(root).render(<window.PokemonTemplate />);