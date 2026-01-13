const REGIONS = {
  kanto:  { label: "Kanto",  from: 1,   to: 151 },
  johto:  { label: "Johto",  from: 152, to: 251 },
  hoenn:  { label: "Hoenn",  from: 252, to: 386 },
  sinnoh: { label: "Sinnoh", from: 387, to: 493 },
  teselia:{ label: "Teselia",from: 494, to: 649 },
  kalos:  { label: "Kalos",  from: 650, to: 721 },
  alola:  { label: "Alola",  from: 722, to: 809 },
  galar:  { label: "Galar",  from: 810, to: 898 },
  paldea: { label: "Paldea", from: 899, to: 1025 },
};

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

  return (
    <div>
      {/* Botones de región dentro de React */}
      <div className="subheader">
        {Object.entries(REGIONS).map(([key, info]) => (
          <button
            key={key}
            className={"RegBtn" + (region === key ? " active" : "")}
            onClick={() => setRegion(key)}
          >
            {info.label}
          </button>
        ))}
      </div>

      <h1 className="dexTitle">{REGIONS[region].label} Pokédex</h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando...</p>
      ) : (
        <div className="parentGrid">
          {pokemon.map((p) => (
            <div className="cuadrat" key={p.id}>
              <img className="imgPoke" src={p.image} alt={p.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const root = document.getElementById("kanto-root");
ReactDOM.createRoot(root).render(<window.Pokedex />);
